<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BusinessPlan;
use App\Models\BusinessEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BusinessController extends Controller
{
    /**
     * Get the user's business plan and connected entries
     */
    public function index(Request $request)
    {
        $plan = BusinessPlan::where('user_id', $request->user()->id)
            ->with(['entries' => function ($query) {
                $query->orderBy('created_at', 'desc');
            }])
            ->first();

        return response()->json(['plan' => $plan]);
    }

    /**
     * Create a new business plan
     */
    public function storePlan(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'stage' => 'string',
        ]);

        $existing = BusinessPlan::where('user_id', $request->user()->id)->first();
        if ($existing) {
            return response()->json(['error' => 'You already have a business plan. Update the existing one.'], 400);
        }

        $plan = BusinessPlan::create([
            'id' => 'c' . Str::lower(Str::random(24)),
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'stage' => 'IDEA',
            'revenue' => 0,
            'user_id' => $request->user()->id,
        ]);

        return response()->json(['success' => true, 'plan' => $plan]);
    }

    /**
     * Add a progress entry to the plan
     */
    public function storeEntry(Request $request)
    {
        $validated = $request->validate([
            'business_plan_id' => 'required|string',
            'title' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'revenue' => 'numeric',
            'stage' => 'string'
        ]);

        $plan = BusinessPlan::where('id', $validated['business_plan_id'])
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $entry = BusinessEntry::create([
            'id' => 'c' . Str::lower(Str::random(24)),
            'title' => $validated['title'],
            'notes' => $validated['notes'] ?? null,
            'revenue' => $validated['revenue'] ?? 0,
            'business_plan_id' => $plan->id,
        ]);

        // Accumulate revenue and update stage
        $plan->revenue += $entry->revenue;
        // If the user specifies a new stage mapping (e.g. they evolved to EXECUTION)
        if (!empty($validated['stage']) && $validated['stage'] !== $plan->stage) {
            $plan->stage = $validated['stage'];
        }
        $plan->save();

        return response()->json(['success' => true, 'entry' => $entry]);
    }
}
