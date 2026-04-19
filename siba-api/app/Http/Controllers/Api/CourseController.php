<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Category;
use App\Models\Module;
use App\Models\Lesson;
use App\Models\Concerns\HasCuid;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    /**
     * GET /api/courses — Public catalog with categories
     * Replaces: prisma.course.findMany({ where: { published: true }, ... })
     */
    public function index()
    {
        $categories = Category::withCount('courses')->get();

        $courses = Course::where('published', true)
            ->with(['trainer:id,name', 'category:id,name,color'])
            ->withCount(['enrollments', 'modules'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'courses' => $courses,
            'categories' => $categories,
        ]);
    }

    /**
     * GET /api/courses/{slug} — Single course detail
     * Replaces: prisma.course.findUnique({ where: { slug }, ... })
     */
    public function show(string $slug)
    {
        $course = Course::where('slug', $slug)
            ->with([
                'trainer:id,name,avatar,bio',
                'category:id,name,color',
                'modules.lessons:id,title,duration,order,module_id',
                'modules.quizzes:id,title,module_id',
                'modules.tasks:id,title,type,module_id',
            ])
            ->withCount(['enrollments'])
            ->firstOrFail();

        return response()->json($course);
    }

    /**
     * POST /api/courses — Create new course (Admin/Trainer)
     * Replaces: actions/courses.ts → createCourse()
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'level' => 'string|in:BEGINNER,INTERMEDIATE,ADVANCED,EXPERT',
            'price' => 'numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $slug = Str::slug($validated['title']);
        if (Course::where('slug', $slug)->exists()) {
            $slug = $slug . '-' . time();
        }

        $course = Course::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'description' => $validated['description'],
            'level' => $validated['level'] ?? 'BEGINNER',
            'price' => $validated['price'] ?? 0,
            'category_id' => $validated['category_id'] ?? null,
            'trainer_id' => ($request->user()->role === 'ADMIN' && $request->has('trainer_id')) 
                ? $request->trainer_id 
                : $request->user()->id,
        ]);

        return response()->json(['success' => true, 'course' => $course], 201);
    }

    /**
     * PUT /api/courses/{course} — Update course
     * Replaces: actions/courses.ts → updateCourse()
     */
    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'level' => 'string|in:BEGINNER,INTERMEDIATE,ADVANCED,EXPERT',
            'price' => 'numeric|min:0',
            'published' => 'boolean',
        ]);

        $course->update($validated);

        return response()->json(['success' => true, 'course' => $course->fresh()]);
    }

    /**
     * DELETE /api/courses/{course} — Delete course (Admin only)
     * Replaces: actions/courses.ts → deleteCourse()
     */
    public function destroy(Course $course)
    {
        $course->delete();
        return response()->json(['success' => true]);
    }

    /**
     * POST /api/courses/{course}/toggle-publish
     * Replaces: actions/courses.ts → togglePublishCourse()
     */
    public function togglePublish(Course $course)
    {
        $course->update(['published' => !$course->published]);
        return response()->json(['success' => true, 'published' => $course->published]);
    }

    /**
     * POST /api/courses/{course}/modules
     * Replaces: actions/courses.ts → createModule()
     */
    public function createModule(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'string|in:ORIENTATION,CORE,PRACTICAL,EVALUATION,CERTIFICATION',
        ]);

        $lastOrder = Module::where('course_id', $course->id)->max('order') ?? 0;

        $module = Module::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'type' => $validated['type'] ?? 'CORE',
            'order' => $lastOrder + 1,
            'course_id' => $course->id,
        ]);

        return response()->json(['success' => true, 'module' => $module], 201);
    }

    public function updateModule(Request $request, Module $module)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'type' => 'string|in:ORIENTATION,CORE,PRACTICAL,EVALUATION,CERTIFICATION',
        ]);

        $module->update($validated);
        return response()->json(['success' => true, 'module' => $module]);
    }

    public function deleteModule(Module $module)
    {
        $module->delete();
        return response()->json(['success' => true]);
    }

    public function reorderModules(Request $request, Course $course)
    {
        $request->validate(['module_ids' => 'required|array']);
        foreach ($request->module_ids as $index => $id) {
            Module::where('id', $id)->update(['order' => $index + 1]);
        }
        return response()->json(['success' => true]);
    }

    public function updateLesson(Request $request, Lesson $lesson)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'content' => 'string',
            'video_url' => 'nullable|string',
            'duration' => 'nullable|integer',
        ]);

        $lesson->update($validated);
        return response()->json(['success' => true, 'lesson' => $lesson]);
    }

    public function deleteLesson(Lesson $lesson)
    {
        $lesson->delete();
        return response()->json(['success' => true]);
    }

    public function reorderLessons(Request $request, Module $module)
    {
        $request->validate(['lesson_ids' => 'required|array']);
        foreach ($request->lesson_ids as $index => $id) {
            Lesson::where('id', $id)->update(['order' => $index + 1]);
        }
        return response()->json(['success' => true]);
    }

    /**
     * POST /api/modules/{module}/lessons
     * Replaces: actions/courses.ts → createLesson()
     */
    public function createLesson(Request $request, Module $module)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'video_url' => 'nullable|string',
            'duration' => 'nullable|integer',
        ]);

        $lastOrder = Lesson::where('module_id', $module->id)->max('order') ?? 0;

        $lesson = Lesson::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'video_url' => $validated['video_url'] ?? null,
            'duration' => $validated['duration'] ?? null,
            'order' => $lastOrder + 1,
            'module_id' => $module->id,
        ]);

        return response()->json(['success' => true, 'lesson' => $lesson], 201);
    }

    /**
     * POST /api/categories — Create category (Admin)
     * Replaces: actions/courses.ts → createCategory()
     */
    public function createCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $category = Category::create([
            ...$validated,
        ]);

        return response()->json(['success' => true, 'category' => $category], 201);
    }
    /**
     * QUIZ MANAGEMENT
     */
    public function storeQuiz(Request $request, Module $module)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'questions' => 'required|array',
            'passing_score' => 'integer|min:0|max:100',
            'time_limit' => 'integer|min:0', // in minutes
        ]);

        $quiz = \App\Models\Quiz::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'questions' => $validated['questions'],
            'passing_score' => $validated['passing_score'] ?? 80,
            'time_limit' => $validated['time_limit'] ?? 0,
            'module_id' => $module->id,
        ]);

        return response()->json(['success' => true, 'quiz' => $quiz], 201);
    }

    public function updateQuiz(Request $request, \App\Models\Quiz $quiz)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'questions' => 'array',
            'passing_score' => 'integer|min:0|max:100',
            'time_limit' => 'integer|min:0',
        ]);

        $quiz->update($validated);
        return response()->json(['success' => true, 'quiz' => $quiz]);
    }

    public function deleteQuiz(\App\Models\Quiz $quiz)
    {
        $quiz->delete();
        return response()->json(['success' => true]);
    }
}
