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
            'name' => 'Md. Ismail Hossain Sherazi',
            'email' => 'admin@siba.academy',
            'password' => 'password',
            'role' => 'ADMIN',
            'level' => 'EXPERT',
        ]);

        $trainer = User::create([
            'id' => $this->cuid(),
            'name' => 'Modern Business Development Architects',
            'email' => 'ismail@siba.academy',
            'password' => 'password',
            'role' => 'TRAINER',
            'bio' => 'Founder and Owner, SIBA Academy. Architecting radical transformations in business through automation.',
            'level' => 'EXPERT',
        ]);

        // ─── MENTORS ───────────────────────────────────────────
        $mentorsData = [
            [
                'name' => 'Nobin Bonik',
                'email' => 'nobin@siba.academy',
                'role' => 'MENTOR',
                'avatar' => '/images/mentors/nobin.jpg',
                'bio' => 'The mastermind behind brand soul and rapid growth trajectory. Nobin architectures brand identity and rapid growth trajectories with surgical precision.',
                'phone' => '8801846044470',
                'skills' => ["Brand Strategy Architect", "Business Architect", "Performance Marketing & Growth Lead"],
                'level' => 'EXPERT',
            ],
            [
                'name' => 'Shahanewas Shawon',
                'email' => 'shawon@siba.academy',
                'role' => 'MENTOR',
                'avatar' => '/images/mentors/shahanewas.jpg',
                'bio' => 'Architecting the invisible systems that power modern enterprise. Shahanewas builds high-performance digital foundations and seamless automated workflows.',
                'phone' => '8801770921384',
                'skills' => ["Digital Infrastructure Specialist", "Software and Technical Architect", "Automation Design"],
                'level' => 'EXPERT',
            ],
            [
                'name' => 'Rasel Ahmed',
                'email' => 'rasel@siba.academy',
                'role' => 'MENTOR',
                'avatar' => '/images/mentors/rasel.jpg',
                'bio' => 'Transforming raw numbers into strategic power. Rasel specializes in financial realism and surgical data precision for sustainable scaling.',
                'phone' => '8801841011224',
                'skills' => ["Economics Specialist", "Financial Realist", "Data Analytics & Tracking Scientist"],
                'level' => 'EXPERT',
            ],
            [
                'name' => 'Rumel Ahmmed',
                'email' => 'rumel@siba.academy',
                'role' => 'MENTOR',
                'avatar' => '/images/mentors/rumel.jpg',
                'bio' => 'Driving sustainable revenue through deep analysis and elite retention frameworks. Rumel builds sustainable revenue engines by capturing and keeping growth.',
                'phone' => '8801955240211',
                'skills' => ["Business Development", "Business Analysis", "Sales & Retention Strategist"],
                'level' => 'EXPERT',
            ],
            [
                'name' => 'S.M. Faiaz Tamim',
                'email' => 'tamim@siba.academy',
                'role' => 'MENTOR',
                'avatar' => '/images/mentors/tamim.jpg',
                'bio' => 'Bridging technical complexity with operational clarity. Faiaz specializes in real-world demonstrations and feedback loops.',
                'phone' => '8801952387346',
                'skills' => ["Operations & Automation Expert", "Technical Demonstrator", "Feedback Specialist"],
                'level' => 'EXPERT',
            ],
            [
                'name' => 'Mushfiqur Rahman',
                'email' => 'mushfiq@siba.academy',
                'role' => 'MENTOR',
                'avatar' => '/images/mentors/mushfiq.jpg',
                'bio' => 'Navigating the complex landscape of business automation. Mushfiq specializes in situational orientation and deep_case study analysis.',
                'phone' => '8801929324580',
                'skills' => ["Operations & Automation Expert", "Context & Orientation Guide", "Case Study Analyst"],
                'level' => 'EXPERT',
            ],
        ];

        foreach ($mentorsData as $m) {
            User::create([
                'id' => $this->cuid(),
                'name' => $m['name'],
                'email' => $m['email'],
                'password' => 'password',
                'role' => 'MENTOR',
                'avatar' => $m['avatar'],
                'bio' => $m['bio'],
                'phone' => $m['phone'],
                'skills' => $m['skills'],
                'level' => $m['level'],
            ]);
        }

        // ─── CATEGORIES ─────────────────────────────────────────
        $catBiz = Category::create(['id' => $this->cuid(), 'name' => 'Business Strategy', 'icon' => 'Briefcase', 'color' => '#10b981']);
        $catAuto = Category::create(['id' => $this->cuid(), 'name' => 'Automation', 'icon' => 'Zap', 'color' => '#6366f1']);

        // ─── NEW COURSES DATA ──────────────────────────────────
        $coursesData = [
            [
                'title' => 'The Modern Business Blueprint: From Local Shop to Digital Empire',
                'slug' => 'modern-business-blueprint',
                'description' => 'Transform a messy, manual business into a structured, automated, and scalable digital empire. Designed for product-based business owners and entrepreneurs.',
                'cat' => $catBiz,
                'featured' => true,
                'modules' => [
                    [
                        'title' => 'Module 1: Brand Architecture',
                        'description' => 'Focuses on creating the "soul" of the business by defining Mission, Vision, Values, and identifying ICP and UVP.',
                        'lessons' => ['Defining Mission, Vision, and Values', 'Identifying Your Ideal Customer Persona (ICP)', 'Crafting a Unique Value Proposition (UVP)']
                    ],
                    [
                        'title' => 'Module 2: Digital Foundation',
                        'description' => 'Covers setting up a central digital hub, including website development and social media assets.',
                        'lessons' => ['E-commerce Platform Selection (Shopify vs WooCommerce)', 'Social Media Asset Optimization', 'Payment & Logistics Integration']
                    ],
                    [
                        'title' => 'Module 3: Intelligent Operations',
                        'description' => 'Teaches students how to move away from manual work using POS and inventory management software.',
                        'lessons' => ['POS and Inventory Management Systems', 'Automating Order Workflows', 'Real-time Financial Tracking']
                    ],
                    [
                        'title' => 'Module 4: Digital Tracking Arsenal',
                        'description' => 'Instruction on setting up Meta Pixel, Google Analytics 4 (GA4), and Microsoft Clarity.',
                        'lessons' => ['Setting up Meta Pixel & Conversions API', 'Google Analytics 4 (GA4) Implementation', 'Analyzing User Behavior with Microsoft Clarity']
                    ],
                    [
                        'title' => 'Module 5: Digital Marketing Engine',
                        'description' => 'A masterclass on Meta and Google Ads, focusing on campaign objectives and retargeting.',
                        'lessons' => ['Meta Ads Strategy & Retargeting', 'Google Search & Shopping Ads', 'SEO Fundamentals for E-commerce']
                    ],
                    [
                        'title' => 'Module 6: Sales and Customer Relationship Strategy',
                        'description' => 'Focuses on Sales Funnels, CRM, and loyalty programs to maximize Customer Lifetime Value (CLV).',
                        'lessons' => ['Designing High-Conversion Sales Funnels', 'CRM Implementation & Management', 'Building Loyalty Programs for CLV']
                    ],
                ]
            ],
            [
                'title' => 'Smart Business Automation & Digital Tools Training',
                'slug' => 'smart-business-automation',
                'description' => 'Master the art of automating repetitive tasks and leveraging cutting-edge digital tools to skyrocket your operational efficiency.',
                'cat' => $catAuto,
                'featured' => false,
                'modules' => [
                    [
                        'title' => 'Module 1: The Automation Mindset',
                        'description' => 'Transitioning from manual hustle to high-performance automated systems.',
                        'lessons' => ['Identifying Bottlenecks', 'Logic Gate Fundamentals', 'Designing Your First Workflow']
                    ],
                    [
                        'title' => 'Module 2: Command Center Integration',
                        'description' => 'Setting up Notion, Slack, and ClickUp as your business operating system.',
                        'lessons' => ['Project Management Setup', 'Team Communication Architecture', 'Centralized Documentation']
                    ],
                    [
                        'title' => 'Module 3: Trigger & Action Symphony',
                        'description' => 'Orchestrating complex automations using Zapier, Make, and native platform integrations.',
                        'lessons' => ['Multichannel Lead Syncing', 'Automated Customer Notifications', 'Data Migration Pipelines']
                    ],
                    [
                        'title' => 'Module 4: Intelligence & Scaling',
                        'description' => 'Using AI and advanced analytics to monitor and optimize your automated flows.',
                        'lessons' => ['Automated KPI Reporting', 'Error Handling in Automations', 'Scaling Your Digital Infrastructure']
                    ],
                ]
            ],
            [
                'title' => 'Software Training Program',
                'slug' => 'software-training-program',
                'description' => 'An intensive guide on using specialized software and platforms to operate, manage, and scale a modern business enterprise.',
                'cat' => $catAuto,
                'featured' => false,
                'modules' => [
                    [
                        'title' => 'Module 1: Essential Business OS',
                        'description' => 'Core navigation and configuration of top-tier business management platforms.',
                        'lessons' => ['ERPs vs Specialty Software', 'Initial Setup & Licensing', 'User Permission Hierarchies']
                    ],
                    [
                        'title' => 'Module 2: The SaaS Stack Ecosystem',
                        'description' => 'Mastering the integration of accounting, CRM, and marketing softwares.',
                        'lessons' => ['Accounting Software (Xero/QuickBooks)', 'CRM Platform Mastery (HubSpot)', 'Marketing Hub Configuration']
                    ],
                    [
                        'title' => 'Module 3: Digital Asset Mastery',
                        'description' => 'Secure management of cloud infrastructures and collaborative work environments.',
                        'lessons' => ['Cloud Workspace Optimization', 'Collaborative Editing Workflows', 'Security & Access Protocols']
                    ],
                    [
                        'title' => 'Module 4: Enterprise Troubleshooting',
                        'description' => 'How to monitor, maintain, and fix software conflicts in a modern digital office.',
                        'lessons' => ['Software Health Monitoring', 'Handling API Disconnections', 'Platform Performance Optimization']
                    ],
                ]
            ]
        ];

        foreach ($coursesData as $cData) {
            $course = Course::create([
                'id' => $this->cuid(),
                'title' => $cData['title'],
                'slug' => $cData['slug'],
                'description' => $cData['description'],
                'price' => rand(49, 199),
                'level' => 'BEGINNER',
                'published' => true,
                'featured' => $cData['featured'],
                'trainer_id' => $trainer->id,
                'category_id' => $cData['cat']->id,
            ]);

            foreach ($cData['modules'] as $index => $data) {
                $module = Module::create([
                    'id' => $this->cuid(),
                    'title' => $data['title'],
                    'description' => $data['description'],
                    'order' => $index + 1,
                    'type' => 'CORE',
                    'course_id' => $course->id,
                ]);

                foreach ($data['lessons'] as $lIndex => $lessonTitle) {
                    Lesson::create([
                        'id' => $this->cuid(),
                        'title' => $lessonTitle,
                        'content' => "<h3>{$lessonTitle}</h3><p>Detailed instruction on {$lessonTitle} as part of the {$data['title']}. Mastery of this topic is essential for building your modern business architecture.</p>",
                        'duration' => rand(15, 60),
                        'order' => $lIndex + 1,
                        'module_id' => $module->id,
                    ]);
                }
            }
        }

        $this->command->info('✅ Successfully replaced all courses with the new curriculum.');
    }
}
