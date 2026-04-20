<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->mapWithKeys(function ($item) {
            $value = $item->value;
            if ($item->type === 'image' && $value) {
                $value = url(Storage::url($value));
            }
            return [$item->key => $value];
        });

        return response()->json($settings);
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'settings' => 'required|array',
        ]);

        foreach ($request->settings as $key => $value) {
            $setting = Setting::where('key', $key)->first();
            if ($setting) {
                if ($setting->type === 'image' && $request->hasFile("settings.$key")) {
                    if ($setting->value) {
                        Storage::disk('public')->delete($setting->value);
                    }
                    $path = $request->file("settings.$key")->store('settings', 'public');
                    $setting->value = $path;
                } else {
                    $setting->value = $value;
                }
                $setting->save();
            }
        }

        return response()->json(['success' => true, 'message' => 'Settings updated successfully']);
    }

    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $setting = Setting::where('key', 'site_logo')->first();
        if ($setting->value) {
            Storage::disk('public')->delete($setting->value);
        }

        $path = $request->file('logo')->store('settings', 'public');
        $setting->value = $path;
        $setting->save();

        return response()->json([
            'success' => true,
            'url' => url(Storage::url($path))
        ]);
    }
}
