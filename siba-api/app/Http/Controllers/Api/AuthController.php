<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
        return response()->json($request->user());
    }
}
