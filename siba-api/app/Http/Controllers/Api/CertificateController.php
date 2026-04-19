<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Enrollment;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CertificateController extends Controller
{
    /**
     * Get all certificates (Admin or User)
     */
    public function index(Request $request)
    {
        $query = Certificate::with(['course', 'user']);

        // If not admin, only show own
        if ($request->user()->role !== 'ADMIN') {
            $query->where('user_id', $request->user()->id);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('certificate_no', 'like', "%{$search}%")
                  ->orWhereHas('user', function($uq) use ($search) {
                      $uq->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $certificates = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'certificates' => $certificates
        ]);
    }

    /**
     * Public verification API
     */
    public function verify($certificate_no)
    {
        $certificate = Certificate::where('certificate_no', $certificate_no)
            ->with(['user:id,name', 'course:id,title'])
            ->first();

        if (!$certificate) {
            return response()->json(['status' => 'not_found'], 404);
        }

        if ($certificate->status === 'revoked') {
            return response()->json(['status' => 'revoked', 'certificate' => $certificate], 200);
        }

        return response()->json([
            'status' => 'verified',
            'certificate' => $certificate
        ]);
    }

    /**
     * Admin: Manually issue a certificate
     */
    public function store(Request $request)
    {
        if ($request->user()->role !== 'ADMIN') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
            'issue_date' => 'nullable|date',
            'certificate_no' => 'nullable|string|unique:certificates,certificate_no',
        ]);

        $certNo = $validated['certificate_no'] ?? ('SIBA-' . date('Y') . '-' . strtoupper(Str::random(8)));
        
        $certificate = Certificate::create([
            'id' => 'cert_' . Str::lower(Str::random(24)),
            'certificate_no' => $certNo,
            'verification_hash' => hash('sha256', $certNo . Str::random(10)),
            'user_id' => $validated['user_id'],
            'course_id' => $validated['course_id'],
            'issue_date' => $validated['issue_date'] ?? now(),
            'status' => 'issued',
        ]);

        // Create notification for student
        Notification::create([
            'id' => 'notif_' . Str::lower(Str::random(24)),
            'user_id' => $validated['user_id'],
            'type' => 'CERTIFICATE_ISSUED',
            'title' => 'Certificate Issued!',
            'message' => "An administrator has issued your certificate.",
            'read' => false,
        ]);

        return response()->json([
            'success' => true,
            'certificate' => $certificate->load(['user', 'course'])
        ], 201);
    }

    /**
     * Claim a certificate for a completed course
     */
    public function claim(Request $request)
    {
        $validated = $request->validate([
            'enrollment_id' => 'required|string',
        ]);

        $enrollment = Enrollment::where('id', $validated['enrollment_id'])
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        if ($enrollment->progress < 100) {
            return response()->json(['error' => 'You must complete the course before claiming a certificate.'], 400);
        }

        $existing = Certificate::where('user_id', $request->user()->id)
            ->where('course_id', $enrollment->course_id)
            ->first();

        if ($existing) {
            return response()->json(['error' => 'Certificate already claimed.'], 400);
        }

        $certNo = 'SIBA-' . date('Y') . '-' . strtoupper(Str::random(8));
        
        $certificate = Certificate::create([
            'id' => 'cert_' . Str::lower(Str::random(24)),
            'certificate_no' => $certNo,
            'verification_hash' => hash('sha256', $certNo . Str::random(10)),
            'user_id' => $request->user()->id,
            'course_id' => $enrollment->course_id,
            'issue_date' => now(),
            'status' => 'issued',
        ]);

        // Create notification
        Notification::create([
            'id' => 'notif_' . Str::lower(Str::random(24)),
            'user_id' => $request->user()->id,
            'type' => 'CERTIFICATE_ISSUED',
            'title' => 'Certificate Issued!',
            'message' => "Congratulations! Your certificate for {$enrollment->course->title} has been issued.",
            'read' => false,
        ]);

        return response()->json([
            'success' => true,
            'certificate' => $certificate
        ]);
    }

    /**
     * Admin: Revoke a certificate
     */
    public function revoke(Request $request, $id)
    {
        if ($request->user()->role !== 'ADMIN') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $certificate = Certificate::findOrFail($id);
        $certificate->update(['status' => 'revoked']);

        return response()->json(['success' => true, 'message' => 'Certificate revoked successfully.']);
    }

    /**
     * Admin: Reissue/Unrevoke a certificate
     */
    public function reissue(Request $request, $id)
    {
        if ($request->user()->role !== 'ADMIN') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $certificate = Certificate::findOrFail($id);
        $certificate->update(['status' => 'issued']);

        return response()->json(['success' => true, 'message' => 'Certificate reissued successfully.']);
    }
}
