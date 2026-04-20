<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class MentorController extends Controller
{
    /**
     * GET /api/mentors - Public list of mentors
     */
    public function index()
    {
        $mentors = User::where('role', 'MENTOR')
            ->where('is_active', true)
            ->select('id', 'name', 'avatar', 'bio', 'phone', 'skills', 'level')
            ->get()
            ->map(function($mentor) {
                return [
                    'id' => $mentor->id,
                    'name' => $mentor->name,
                    'role' => (is_array($mentor->skills) && count($mentor->skills) > 0) 
                        ? $mentor->skills[0] 
                        : $mentor->level . " Operator",
                    'image' => $mentor->avatar ?? '/images/mentors/default.jpg',
                    'expertise' => $mentor->skills ?? [],
                    'bio' => $mentor->bio,
                    'links' => [
                        'whatsapp' => $mentor->phone
                    ]
                ];
            });

        return response()->json($mentors);
    }
}
