<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Course;
use App\Models\Module;
use App\Models\Lesson;
use App\Models\Enrollment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    private function cuid(): string
    {
        return 'c' . Str::lower(Str::random(24));
    }

    public function run(): void
    {
        // ─── USERS ──────────────────────────────────────────────
        $admin = User::create([
            'id' => $this->cuid(),
            'name' => 'Admin User',
            'email' => 'admin@siba.academy',
            'password' => 'password',
            'role' => 'ADMIN',
            'level' => 'EXPERT',
        ]);

        $trainer1 = User::create([
            'id' => $this->cuid(),
            'name' => 'Sarah Ahmed',
            'email' => 'sarah@siba.academy',
            'password' => 'password',
            'role' => 'TRAINER',
            'bio' => 'Full-stack developer with 8 years of experience in web technologies.',
            'level' => 'EXPERT',
        ]);

        $trainer2 = User::create([
            'id' => $this->cuid(),
            'name' => 'Karim Hassan',
            'email' => 'karim@siba.academy',
            'password' => 'password',
            'role' => 'TRAINER',
            'bio' => 'Digital marketing strategist specializing in growth hacking and SEO.',
            'level' => 'ADVANCED',
        ]);

        $student1 = User::create([
            'id' => $this->cuid(),
            'name' => 'Nadia Khan',
            'email' => 'nadia@student.siba.academy',
            'password' => 'password',
            'role' => 'STUDENT',
        ]);

        $student2 = User::create([
            'id' => $this->cuid(),
            'name' => 'Farhan Ali',
            'email' => 'farhan@student.siba.academy',
            'password' => 'password',
            'role' => 'STUDENT',
        ]);

        $mentor = User::create([
            'id' => $this->cuid(),
            'name' => 'Dr. Ayesha Malik',
            'email' => 'ayesha@siba.academy',
            'password' => 'password',
            'role' => 'MENTOR',
            'bio' => 'PhD in Computer Science, 15 years mentoring startup founders.',
            'level' => 'EXPERT',
        ]);

        // ─── CATEGORIES ─────────────────────────────────────────
        $catDev = Category::create(['id' => $this->cuid(), 'name' => 'Web Development', 'icon' => 'Code', 'color' => '#6366f1']);
        $catBiz = Category::create(['id' => $this->cuid(), 'name' => 'Business', 'icon' => 'Briefcase', 'color' => '#10b981']);
        $catMkt = Category::create(['id' => $this->cuid(), 'name' => 'Digital Marketing', 'icon' => 'TrendingUp', 'color' => '#f59e0b']);
        $catAI  = Category::create(['id' => $this->cuid(), 'name' => 'AI & Machine Learning', 'icon' => 'Brain', 'color' => '#8b5cf6']);

        // ─── COURSES ────────────────────────────────────────────
        $course1 = Course::create([
            'id' => $this->cuid(),
            'title' => 'Full-Stack Web Development Bootcamp',
            'slug' => 'full-stack-web-development-bootcamp',
            'description' => 'Master modern web development from HTML/CSS to React, Node.js, and databases. Build real-world projects and launch your career.',
            'price' => 299.99,
            'level' => 'BEGINNER',
            'published' => true,
            'featured' => true,
            'trainer_id' => $trainer1->id,
            'category_id' => $catDev->id,
        ]);

        $course2 = Course::create([
            'id' => $this->cuid(),
            'title' => 'Digital Marketing Mastery',
            'slug' => 'digital-marketing-mastery',
            'description' => 'Learn SEO, social media marketing, paid advertising, and content strategy to grow any business online.',
            'price' => 199.99,
            'level' => 'INTERMEDIATE',
            'published' => true,
            'featured' => true,
            'trainer_id' => $trainer2->id,
            'category_id' => $catMkt->id,
        ]);

        $course3 = Course::create([
            'id' => $this->cuid(),
            'title' => 'AI-Powered Business Automation',
            'slug' => 'ai-powered-business-automation',
            'description' => 'Harness the power of AI tools to automate workflows, analyze data, and make smarter business decisions.',
            'price' => 0,
            'level' => 'ADVANCED',
            'published' => true,
            'featured' => false,
            'trainer_id' => $trainer1->id,
            'category_id' => $catAI->id,
        ]);

        $course4 = Course::create([
            'id' => $this->cuid(),
            'title' => 'Startup Launch Blueprint',
            'slug' => 'startup-launch-blueprint',
            'description' => 'From idea validation to first revenue: a step-by-step guide to launching your startup in 90 days.',
            'price' => 149.99,
            'level' => 'BEGINNER',
            'published' => true,
            'featured' => false,
            'trainer_id' => $trainer2->id,
            'category_id' => $catBiz->id,
        ]);

        // ─── MODULES & LESSONS ──────────────────────────────────
        $courses = [$course1, $course2, $course3, $course4];
        $moduleNames = [
            ['Getting Started', 'Core Fundamentals', 'Hands-On Projects', 'Final Assessment'],
            ['Marketing Foundations', 'SEO Deep Dive', 'Social Media Strategy', 'Paid Ads Mastery'],
            ['AI Landscape Overview', 'Prompt Engineering', 'Workflow Automation', 'Building AI Agents'],
            ['Idea Validation', 'Business Model Canvas', 'MVP Development', 'Go-To-Market Strategy'],
        ];

        foreach ($courses as $ci => $course) {
            foreach ($moduleNames[$ci] as $mi => $moduleName) {
                $module = Module::create([
                    'id' => $this->cuid(),
                    'title' => $moduleName,
                    'description' => "Module " . ($mi + 1) . " of {$course->title}",
                    'order' => $mi + 1,
                    'type' => $mi === 0 ? 'ORIENTATION' : ($mi === 3 ? 'EVALUATION' : 'CORE'),
                    'course_id' => $course->id,
                ]);

                // Create 3 lessons per module
                for ($li = 1; $li <= 3; $li++) {
                    Lesson::create([
                        'id' => $this->cuid(),
                        'title' => "{$moduleName} — Part {$li}",
                        'content' => "<h2>{$moduleName} — Part {$li}</h2><p>This lesson covers the key concepts of {$moduleName}. Follow along with the examples and complete the exercises at the end.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
                        'duration' => rand(10, 45),
                        'order' => $li,
                        'module_id' => $module->id,
                    ]);
                }
            }
        }

        // ─── ENROLLMENTS ────────────────────────────────────────
        Enrollment::create([
            'id' => $this->cuid(),
            'user_id' => $student1->id,
            'course_id' => $course1->id,
            'status' => 'ACTIVE',
            'progress' => 45.0,
        ]);

        Enrollment::create([
            'id' => $this->cuid(),
            'user_id' => $student1->id,
            'course_id' => $course3->id,
            'status' => 'ACTIVE',
            'progress' => 10.0,
        ]);

        Enrollment::create([
            'id' => $this->cuid(),
            'user_id' => $student2->id,
            'course_id' => $course2->id,
            'status' => 'COMPLETED',
            'progress' => 100.0,
        ]);

        Enrollment::create([
            'id' => $this->cuid(),
            'user_id' => $student2->id,
            'course_id' => $course4->id,
            'status' => 'ACTIVE',
            'progress' => 72.5,
        ]);

        $this->command->info('✅ Seeded: 6 users, 4 categories, 4 courses, 16 modules, 48 lessons, 4 enrollments');
    }
}
