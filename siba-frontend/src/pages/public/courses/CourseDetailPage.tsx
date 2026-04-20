import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, ArrowLeft } from "lucide-react";
import api from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';


export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course', slug],
    queryFn: async () => {
      const response = await api.get(`/api/courses/${slug}`);
      return response.data;
    }
  });

  const enrollMutation = useMutation({
    mutationFn: async (courseId: string) => {
      const response = await api.post('/api/enrollments', { course_id: courseId });
      return response.data;
    },
    onSuccess: () => {
      navigate(`/dashboard/student/learn/${course.slug}`);
    },
    onError: (err: any) => {
      if (err.response?.status === 409) {
        // Already enrolled
        navigate(`/dashboard/student/learn/${course.slug}`);
      } else {
        alert("Enrollment failed. Please try again.");
      }
    }
  });

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    enrollMutation.mutate(course.id);
  };

  if (isLoading) return <div className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden flex items-center justify-center">Loading course...</div>;
  if (error || !course) return <div className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden flex items-center justify-center">Course not found.</div>;

  return (
    <div className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[var(--bg-primary)]">
      <div className="mesh-bg" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link to="/courses" className="inline-flex items-center text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> back to catalog
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="secondary">{course.category?.name || 'Uncategorized'}</Badge>
            <Badge variant="outline" className="text-brand-500 border-brand-500/20">{course.level}</Badge>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            {course.title}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl">
             {course.description}
          </p>

          <div className="flex items-center gap-6 text-sm text-[var(--text-muted)] mb-8">
            <span className="flex items-center gap-2"><Users className="w-4 h-4" /> {course.enrollments_count} enrolled</span>
            <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> {course.modules?.length || 0} modules</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Self-paced</span>
          </div>

          <div className="p-6 rounded-2xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur border border-[var(--border-secondary)] flex flex-col sm:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                   {course.trainer?.name?.charAt(0) || 'T'}
                </div>
                <div>
                   <p className="text-sm text-[var(--text-muted)]">Instructed by</p>
                   <p className="font-semibold text-[var(--text-primary)]">{course.trainer?.name}</p>
                </div>
             </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-1">Status</p>
                  <p className="text-base font-bold text-[var(--brand-500)] uppercase">Open Enrollment</p>
                </div>
                <Button 
                   size="lg" 
                   className="px-8 shadow-brand"
                   onClick={handleEnroll}
                   disabled={enrollMutation.isPending}
                >
                  {enrollMutation.isPending ? "Starting..." : "Start Learning Now"}
                </Button>
             </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 px-6 lg:px-12 bg-[var(--bg-secondary)] backdrop-blur relative z-10 border-t border-[var(--border-secondary)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">Course Curriculum</h2>
          <div className="space-y-4">
            {course.modules?.map((module: any, idx: number) => (
              <div key={module.id} className="p-6 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                      Module {idx + 1}: {module.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">{module.type}</p>
                  </div>
                  <Badge variant="secondary">{module.lessons?.length || 0} Lessons</Badge>
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t border-[var(--border-secondary)]">
                   {module.lessons?.map((lesson: any, lIdx: number) => (
                     <div key={lesson.id} className="flex items-center text-sm text-[var(--text-secondary)]">
                        <div className="w-6 text-center text-[var(--text-muted)]">{lIdx + 1}.</div>
                        <div className="flex-1 ml-2">{lesson.title}</div>
                        <div className="text-[var(--text-muted)]">{lesson.duration ? `${lesson.duration} mins` : ''}</div>
                     </div>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
