<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BusinessPlan;
use App\Models\AiUsageLog;
use Illuminate\Http\Request;

class AiController extends Controller
{
    /**
     * Generate pseudo-AI advice for the given business plan
     */
    public function generateAdvice(Request $request, $planId)
    {
        $plan = BusinessPlan::with('entries')->where('id', $planId)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        // In a production system, this would call OpenAI or Gemini APIs with the $plan payload.
        $recentInsights = $plan->entries->take(3)->pluck('title')->join(', ');

        $advice = "AI Coach Analysis: Based on your current stage ('{$plan->stage}'), your priority should be validating your core assumptions. Keep pushing experiments, particularly related to your recent updates: " . ($recentInsights ?: "You haven't logged entries yet! Get executing.");

        if ($plan->stage === 'REVENUE' || $plan->stage === 'GROWTH') {
             $advice = "AI Coach Analysis: You're showing traction! With total revenue of \$" . number_format($plan->revenue, 2) . ", it's time to document your acquisition channels and find what scales.";
        }

        // Log AI Usage
        AiUsageLog::create([
            'user_id' => $request->user()->id,
            'feature' => 'Business Plan Advice',
            'model' => 'gemini-1.5-flash',
            'tokens_used' => rand(500, 1500),
            'prompt_summary' => "Advice request for plan: " . ($plan->title ?? 'Untitled'),
        ]);

        return response()->json([
            'advice' => $advice
        ]);
    }
}
