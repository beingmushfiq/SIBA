import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Users, Layers, Search, ArrowRight } from "lucide-react";
import api from '@/lib/axios';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

const levelColors: Record<string, string> = {
  BEGINNER: "#10b981",
  INTERMEDIATE: "#f59e0b",
  ADVANCED: "#ef4444",
  EXPERT: "#8b5cf6",
};

export default function CatalogPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await api.get('/api/courses');
      return response.data;
    }
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading courses...</div>;
  }

  const courses = data?.courses || [];
  const categories = data?.categories || [];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="mesh-bg" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            Course <span className="gradient-text">Catalog</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
            Browse our collection of expert-led courses designed for real-world business skill development.
          </p>

          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-primary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] transition-colors"
            />
          </div>

          {categories.length > 0 && (
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Badge variant="default" className="cursor-pointer">All</Badge>
              {categories.map((cat: any) => (
                <Badge key={cat.id} variant="secondary" className="cursor-pointer hover:border-[var(--border-active)]">
                  {cat.name} ({cat.courses_count})
                </Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Course Grid */}
      <section className="pb-32 px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {courses.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No courses available yet</h3>
              <p className="text-sm text-[var(--text-muted)]">Check back soon — new courses are being added.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course: any, i: number) => (
                <Card key={course.id} className="flex flex-col animate-slide-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="h-44 rounded-t-xl bg-gradient-to-br from-[var(--brand-700)] to-[var(--brand-900)] flex items-center justify-center relative overflow-hidden">
                    <BookOpen className="w-14 h-14 text-white/20" />
                    <div className="absolute top-3 left-3">
                      {course.category && (
                        <Badge variant="secondary" className="pointer-events-none">{course.category.name}</Badge>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <div
                        className="px-2.5 py-1 rounded-full text-xs font-semibold text-white pointer-events-none"
                        style={{ backgroundColor: levelColors[course.level] || "#6366f1" }}
                      >
                        {course.level}
                      </div>
                    </div>
                  </div>

                  <CardContent className="flex-1 flex flex-col pt-4">
                    <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2 line-clamp-2">
                       <Link to={`/courses/${course.slug}`} className="hover:underline">{course.title}</Link>
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mb-4 line-clamp-2 flex-1">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> {course.enrollments_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5" /> {course.modules_count} modules
                      </span>
                      <span className="ml-auto font-semibold text-sm text-[var(--text-primary)]">
                        {course.price > 0 ? formatCurrency(course.price) : "Free"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border-secondary)]">
                      <span className="text-xs text-[var(--text-muted)]">by {course.trainer?.name}</span>
                      <Link to={`/courses/${course.slug}`}>
                        <Button size="sm" variant="secondary">
                          View details
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
