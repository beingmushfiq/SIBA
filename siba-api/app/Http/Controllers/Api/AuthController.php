<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * POST /api/register
     * Replaces: actions/auth.ts → registerUser()
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'string|in:STUDENT,TRAINER,MENTOR',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'], // Auto-hashed via cast
            'role' => $validated['role'] ?? 'STUDENT',
        ]);

        return response()->json(['success' => true, 'user' => $user], 201);
    }

    /**
     * POST /api/login
     * Replaces: actions/auth.ts → loginUser()
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (! $token = Auth::guard('api')->attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Invalid email or password'],
            ]);
        }

        $user = Auth::guard('api')->user();

        $redirectPath = match ($user->role) {
            'ADMIN' => '/dashboard/admin',
            'TRAINER' => '/dashboard/trainer',
            'MENTOR' => '/dashboard/mentor',
            default => '/dashboard/student',
        };

        return response()->json([
            'success' => true,
            'user' => $user,
            'token' => $token,
            'redirect' => $redirectPath,
        ]);
    }

    /**
     * POST /api/logout
     * Replaces: actions/auth.ts → logoutUser()
     */
    public function logout(Request $request)
    {
        Auth::guard('api')->logout();

        return response()->json(['success' => true]);
    }

    /**
     * GET /api/user — Get current authenticated user
     */
    public function user(Request $request)
    {
        $user = $request->user();
        if ($user->avatar) {
            $user->avatar_url = url(Storage::url($user->avatar));
        } else {
            $user->avatar_url = "https://api.dicebear.com/7.x/avataaars/svg?seed=" . $user->name;
        }
        return response()->json($user);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'phone' => 'nullable|string',
            'skills' => 'nullable|array',
            'level' => 'nullable|string|in:BEGINNER,INTERMEDIATE,ADVANCED,EXPERT',
        ]);

        $user->update($validated);

        return response()->json(['success' => true, 'user' => $user]);
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|max:2048',
        ]);

        $user = $request->user();

        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        $path = $request->file('avatar')->store('avatars', 'public');
        $user->avatar = $path;
        $user->save();

        return response()->json([
            'success' => true,
            'avatar_url' => url(Storage::url($path))
        ]);
    }
}
