import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import api from '@/lib/axios';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Video, FileText, PlayCircle, Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

export default function LearningPlatform() {
  const { slug } = useParams<{ slug: string }>();
  const queryClient = useQueryClient();
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['learning-path', slug],
    queryFn: async () => {
      const response = await api.get(`/api/student/enrollment/${slug}`);
      return response.data;
    }
  });

  const markCompletedMutation = useMutation({
    mutationFn: async (lessonId: string) => {
      await api.post('/api/progress/update', {
        enrollment_id: data.enrollment.id,
        lesson_id: lessonId
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learning-path', slug] });
    }
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)]">Loading learning path...</div>;
  if (!data?.course) return <div className="min-h-screen flex items-center justify-center">Error loading course</div>;

  const { course, progress } = data;
  
  // Find currently selected lesson
  let activeLesson = null;
  if (activeLessonId) {
    for (const module of course.modules) {
      const found = module.lessons.find((l: any) => l.id === activeLessonId);
      if (found) activeLesson = found;
    }
  } else if (course.modules?.length > 0 && course.modules[0].lessons?.length > 0) {
    activeLesson = course.modules[0].lessons[0];
  }

  const isCompleted = (lessonId: string) => {
    return progress?.some((p: any) => p.lesson_id === lessonId && p.completed);
  };

  const handleMarkComplete = () => {
    if (activeLesson) {
      markCompletedMutation.mutate(activeLesson.id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="h-14 sm:h-16 border-b border-[var(--border-secondary)] bg-[var(--bg-secondary)] flex items-center px-2 sm:px-4 shrink-0 relative z-50">
        <button 
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 mr-2 lg:hidden text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors border border-[var(--border-primary)]"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <Link to="/dashboard/student" className="mr-2 sm:mr-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center p-2">
          <ArrowLeft className="w-5 h-5 sm:mr-2" />
          <span className="hidden sm:inline text-sm font-bold tracking-widest uppercase text-[10px]">Back</span>
        </Link>
        <Logo className="scale-75 origin-left hidden md:flex" iconOnly={true} />
        <div className="ml-2 sm:ml-4 pl-2 sm:pl-4 border-l border-[var(--border-secondary)] hidden sm:block">
          <h1 className="font-semibold text-[var(--text-primary)] text-sm sm:text-base truncate max-w-[150px] md:max-w-md">{course.title}</h1>
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Curriculum Sidebar */}
        {mobileSidebarOpen && (
           <div 
             className="fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity" 
             onClick={() => setMobileSidebarOpen(false)}
           />
        )}
        <aside className={`fixed inset-y-0 left-0 pt-14 sm:pt-16 transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:w-80 w-[85vw] max-w-[320px] border-r border-[var(--border-secondary)] bg-[var(--bg-secondary)] flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out z-40 lg:z-10 shadow-2xl lg:shadow-none`}>
          <div className="p-4 border-b border-[var(--border-secondary)] sticky top-0 bg-[var(--bg-secondary)] z-10">
            <h2 className="font-bold text-[var(--text-primary)]">Curriculum</h2>
          </div>
          <div className="p-2 space-y-4">
            {course.modules.map((mod: any, mIdx: number) => (
              <div key={mod.id}>
                <div className="px-2 py-2 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Module {mIdx+1}: {mod.title}
                </div>
                <div className="space-y-1 mt-1">
                  {mod.lessons.map((lesson: any, lIdx: number) => {
                    const completed = isCompleted(lesson.id);
                    const isActive = (activeLessonId || activeLesson?.id) === lesson.id;
                    return (
                      <button 
                        key={lesson.id}
                        onClick={() => { setActiveLessonId(lesson.id); setMobileSidebarOpen(false); }}
                        className={`w-full text-left px-3 py-2.5 sm:py-3 lg:py-2.5 rounded-lg flex items-start gap-3 transition-colors touch-target ${
                          isActive ? 'bg-[var(--brand-500)] text-white' : 'hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                        }`}
                      >
                         <div className="mt-0.5 shrink-0">
                           {completed ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                           ) : (
                               lesson.type === 'VIDEO' ? <PlayCircle className="w-4 h-4 opacity-70" /> : <FileText className="w-4 h-4 opacity-70" />
                           )}
                         </div>
                         <div className="flex-1 text-sm font-medium line-clamp-2 leading-tight">
                           {lIdx+1}. {lesson.title}
                         </div>
                         {lesson.duration && (
                           <div className="text-[10px] text-[var(--text-muted)] shrink-0 font-mono mt-0.5">
                             {lesson.duration}m
                           </div>
                         )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Player / Content Viewer */}
        <main className="flex-1 bg-[var(--bg-secondary)] flex flex-col relative overflow-y-auto">
           {activeLesson ? (
              <div className="max-w-4xl w-full mx-auto p-4 md:p-8 flex flex-col items-center">
                 {/* Video Placeholder */}
                 <div className="w-full aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl relative group flex items-center justify-center">
                    {activeLesson.type === 'VIDEO' ? (
                      <>
                        <Video className="w-12 h-12 sm:w-16 sm:h-16 text-white/20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 sm:p-6">
                           <h2 className="text-white text-lg sm:text-xl font-bold">{activeLesson.title}</h2>
                        </div>
                      </>
                    ) : (
                      <>
                        <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-white/20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 sm:p-6">
                           <h2 className="text-white text-lg sm:text-xl font-bold">{activeLesson.title} (Reading)</h2>
                        </div>
                      </>
                    )}
                 </div>

                 <div className="w-full mt-4 sm:mt-8 bg-[var(--bg-primary)] p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-[var(--border-secondary)] shadow-sm">
                   <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                     <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">{activeLesson.title}</h3>
                     <Button 
                        onClick={handleMarkComplete} 
                        disabled={isCompleted(activeLesson.id) || markCompletedMutation.isPending}
                        variant={isCompleted(activeLesson.id) ? "outline" : "default"}
                        className="w-full sm:w-auto min-h-[44px]"
                     >
                       {isCompleted(activeLesson.id) ? "Completed" : "Mark as Complete"}
                     </Button>
                   </div>
                   <div className="mt-4 sm:mt-6 prose prose-sm sm:prose-base dark:prose-invert max-w-none text-[var(--text-secondary)]">
                      <p>{activeLesson.content || 'This lesson contains video content.'}</p>
                   </div>
                 </div>
             </div>
           ) : (
             <div className="m-auto text-center text-[var(--text-muted)]">
                 Select a lesson from the curriculum to begin.
             </div>
           )}
        </main>

      </div>
    </div>
  );
}
