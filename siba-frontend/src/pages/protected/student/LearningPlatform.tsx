import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import api from '@/lib/axios';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, CheckCircle, Video, FileText, PlayCircle, 
  Menu, X, HelpCircle, ChevronRight, Award, RotateCcw
} from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Badge } from '@/components/ui/badge';

export default function LearningPlatform() {
  const { slug } = useParams<{ slug: string }>();
  const queryClient = useQueryClient();
  
  const [activeItem, setActiveItem] = useState<{ id: string, type: 'lesson' | 'quiz' } | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Quiz specific state
  const [quizState, setQuizState] = useState<'START' | 'IN_PROGRESS' | 'RESULT'>('START');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [lastResult, setLastResult] = useState<any>(null);

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

  const submitQuizMutation = useMutation({
    mutationFn: async (quizId: string) => {
      const response = await api.post(`/api/quizzes/${quizId}/submit`, {
        answers,
        enrollment_id: data.enrollment.id
      });
      return response.data;
    },
    onSuccess: (res) => {
      setLastResult(res);
      setQuizState('RESULT');
      queryClient.invalidateQueries({ queryKey: ['learning-path', slug] });
    }
  });

  if (isLoading) return <div className="min-h-[100dvh] flex items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)]">Loading Intelligence...</div>;
  if (!data?.course) return <div className="min-h-[100dvh] flex items-center justify-center">Access Denied</div>;

  const { course, progress } = data;
  
  // Resolve active item
  let activeContent: any = null;
  if (activeItem) {
    for (const mod of course.modules) {
      if (activeItem.type === 'lesson') {
        const found = mod.lessons.find((l: any) => l.id === activeItem.id);
        if (found) activeContent = { ...found, itemType: 'lesson' };
      } else {
        const found = mod.quizzes.find((q: any) => q.id === activeItem.id);
        if (found) activeContent = { ...found, itemType: 'quiz' };
      }
    }
  } else {
    // Default to first lesson
    if (course.modules?.[0]?.lessons?.[0]) {
      activeContent = { ...course.modules[0].lessons[0], itemType: 'lesson' };
    }
  }

  const isCompleted = (id: string, type: 'lesson' | 'quiz') => {
    if (type === 'lesson') return progress?.some((p: any) => p.lesson_id === id && p.completed);
    // For quiz, check if passed any attempt (this logic should be refined in backend but checking mock for now)
    return false; 
  };

  const handleQuizStart = () => {
    setQuizState('IN_PROGRESS');
    setCurrentQuestionIdx(0);
    setAnswers({});
  };

  const handleAnswerSelect = (optIdx: number) => {
    setAnswers({ ...answers, [currentQuestionIdx]: optIdx });
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Header */}
      <header className="h-16 border-b border-[var(--border-secondary)] bg-[var(--bg-secondary)] flex items-center px-4 shrink-0 relative z-50">
        <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} className="p-2 mr-2 lg:hidden">
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <Link to="/dashboard/student" className="mr-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-2">
           <ArrowLeft className="w-4 h-4" /> <span className="text-xs font-black uppercase tracking-tighter">Exit Lab</span>
        </Link>
        <div className="ml-4 pl-4 border-l border-[var(--border-secondary)] hidden md:block">
          <h1 className="font-bold text-sm truncate max-w-md">{course.title}</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 pt-16 transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:w-80 w-[85vw] bg-[var(--bg-secondary)] border-r border-[var(--border-secondary)] z-40 transition-transform flex flex-col`}>
           <div className="p-4 border-b border-[var(--border-secondary)]">
              <div className="flex items-center justify-between mb-2">
                 <h2 className="text-sm font-black uppercase tracking-widest text-[var(--text-muted)]">Course Map</h2>
              </div>
              <div className="h-2 w-full bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                 <div className="h-full bg-[var(--brand-500)]" style={{ width: `${data.enrollment.progress}%` }} />
              </div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-2 space-y-6">
              {course.modules.map((mod: any, mIdx: number) => (
                <div key={mod.id}>
                   <h3 className="px-2 py-2 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-50">Module {mIdx+1}: {mod.title}</h3>
                   <div className="space-y-1 mt-1">
                      {mod.lessons.map((lesson: any) => {
                         const completed = isCompleted(lesson.id, 'lesson');
                         const isActive = activeContent?.id === lesson.id && activeContent?.itemType === 'lesson';
                         return (
                           <button 
                             key={lesson.id} 
                             onClick={() => { setActiveItem({ id: lesson.id, type: 'lesson' }); setMobileSidebarOpen(false); }}
                             className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-3 transition-all ${isActive ? 'bg-[var(--brand-500)] text-white shadow-lg shadow-[var(--brand-500)]/20' : 'hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'}`}
                           >
                              {completed ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <PlayCircle className="w-4 h-4 opacity-50" />}
                              <span className="text-sm font-medium truncate flex-1">{lesson.title}</span>
                           </button>
                         )
                      })}
                      {mod.quizzes?.map((quiz: any) => {
                         const isActive = activeContent?.id === quiz.id && activeContent?.itemType === 'quiz';
                         return (
                            <button 
                              key={quiz.id} 
                              onClick={() => { setActiveItem({ id: quiz.id, type: 'quiz' }); setQuizState('START'); setMobileSidebarOpen(false); }}
                              className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-3 transition-all ${isActive ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'hover:bg-[var(--bg-tertiary)] text-purple-600/70'}`}
                            >
                               <HelpCircle className="w-4 h-4" />
                               <span className="text-sm font-medium truncate flex-1">{quiz.title}</span>
                            </button>
                         )
                      })}
                   </div>
                </div>
              ))}
           </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[var(--bg-primary)] p-4 md:p-8">
           <div className="max-w-4xl mx-auto w-full">
              {activeContent?.itemType === 'lesson' ? (
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                   <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
                      {activeContent.video_url ? (
                        <iframe 
                          src={activeContent.video_url} 
                          className="w-full h-full" 
                          allowFullScreen 
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white/20 gap-4">
                           <Video className="w-20 h-20" />
                           <p className="text-xs font-black uppercase tracking-widest">Procedural Asset Visualization</p>
                        </div>
                      )}
                   </div>
                   
                   <div className="bg-[var(--bg-secondary)] rounded-3xl p-8 border border-[var(--border-secondary)] shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                         <div>
                            <Badge variant="outline" className="mb-2 border-[var(--brand-500)]/30 text-[var(--brand-500)]">Lesson Part</Badge>
                            <h2 className="text-3xl font-bold">{activeContent.title}</h2>
                         </div>
                         <Button 
                           onClick={() => markCompletedMutation.mutate(activeContent.id)}
                           disabled={isCompleted(activeContent.id, 'lesson') || markCompletedMutation.isPending}
                           className="h-12 px-8 rounded-2xl gap-2 text-lg font-bold"
                         >
                            {isCompleted(activeContent.id, 'lesson') ? <><CheckCircle className="w-5 h-5" /> Completed</> : "Complete Lesson"}
                         </Button>
                      </div>
                      <div className="prose dark:prose-invert max-w-none text-[var(--text-secondary)] leading-relaxed">
                         {activeContent.content || 'Decrypting lesson data...'}
                      </div>
                   </div>
                </div>
              ) : activeContent?.itemType === 'quiz' ? (
                <div className="animate-in fade-in duration-500 min-h-[60vh] flex">
                   {quizState === 'START' && (
                     <div className="m-auto max-w-md w-full text-center space-y-6">
                        <div className="w-20 h-20 bg-purple-500/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                           <Award className="w-10 h-10 text-purple-600" />
                        </div>
                        <h2 className="text-3xl font-bold">{activeContent.title}</h2>
                        <p className="text-[var(--text-secondary)]">{activeContent.description || 'Test your knowledge on the concepts covered in this module.'}</p>
                        <div className="grid grid-cols-2 gap-4 text-left">
                           <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
                              <p className="text-[10px] font-black uppercase text-[var(--text-muted)] mb-1">Pass Score</p>
                              <p className="text-lg font-bold">{activeContent.passing_score}%</p>
                           </div>
                           <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
                              <p className="text-[10px] font-black uppercase text-[var(--text-muted)] mb-1">Time Limit</p>
                              <p className="text-lg font-bold">{activeContent.time_limit > 0 ? `${activeContent.time_limit}m` : 'Unlimited'}</p>
                           </div>
                        </div>
                        <Button onClick={handleQuizStart} className="w-full h-14 rounded-2xl text-lg font-bold bg-purple-600 hover:bg-purple-700">Initialize Assessment</Button>
                     </div>
                   )}

                   {quizState === 'IN_PROGRESS' && (
                     <div className="w-full max-w-2xl m-auto space-y-8">
                        <div className="flex items-center justify-between">
                           <span className="text-xs font-black uppercase tracking-widest text-purple-600">Question {currentQuestionIdx + 1} of {activeContent.questions.length}</span>
                           <div className="h-1.5 w-32 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                              <div className="h-full bg-purple-600" style={{ width: `${((currentQuestionIdx + 1) / activeContent.questions.length) * 100}%` }} />
                           </div>
                        </div>

                        <h3 className="text-2xl font-bold leading-tight">{activeContent.questions[currentQuestionIdx].text}</h3>
                        
                        <div className="grid grid-cols-1 gap-3">
                           {activeContent.questions[currentQuestionIdx].options.map((opt: string, i: number) => (
                              <button 
                                key={i}
                                onClick={() => handleAnswerSelect(i)}
                                className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${
                                  answers[currentQuestionIdx] === i 
                                    ? 'border-purple-600 bg-purple-500/5 text-purple-900 font-bold' 
                                    : 'border-[var(--border-secondary)] hover:border-purple-300 text-[var(--text-secondary)]'
                                }`}
                              >
                                 <span>{opt}</span>
                                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                    answers[currentQuestionIdx] === i ? 'border-purple-600 bg-purple-600' : 'border-[var(--border-secondary)] group-hover:border-purple-300'
                                 }`}>
                                    {answers[currentQuestionIdx] === i && <Check className="w-4 h-4 text-white" />}
                                 </div>
                              </button>
                           ))}
                        </div>

                        <div className="flex justify-between pt-4">
                           <Button variant="ghost" onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))} disabled={currentQuestionIdx === 0}>Previous</Button>
                           {currentQuestionIdx === activeContent.questions.length - 1 ? (
                              <Button 
                                onClick={() => submitQuizMutation.mutate(activeContent.id)} 
                                disabled={answers[currentQuestionIdx] === undefined || submitQuizMutation.isPending}
                                className="px-10 bg-purple-600 hover:bg-purple-700 h-12 rounded-xl font-bold"
                              >
                                 {submitQuizMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Finish Assessment'}
                              </Button>
                           ) : (
                              <Button 
                                onClick={() => setCurrentQuestionIdx(prev => prev + 1)} 
                                disabled={answers[currentQuestionIdx] === undefined}
                                className="px-10 h-12 rounded-xl gap-2 font-bold"
                              >
                                 Next <ChevronRight className="w-4 h-4" />
                              </Button>
                           )}
                        </div>
                     </div>
                   )}

                   {quizState === 'RESULT' && lastResult && (
                     <div className="m-auto max-w-md w-full text-center space-y-8 animate-in zoom-in-95 duration-500">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${lastResult.passed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                           {lastResult.passed ? <Award className="w-12 h-12" /> : <RotateCcw className="w-12 h-12" />}
                        </div>
                        <div>
                           <h2 className="text-4xl font-black mb-2">{lastResult.passed ? 'OPTIMIZED' : 'FAILED'}</h2>
                           <p className="text-[var(--text-muted)] font-bold uppercase tracking-widest text-[10px]">Your performance score: {lastResult.score}%</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
                           <p className="text-sm text-[var(--text-secondary)] mb-4">{lastResult.passed ? "Incredible intelligence shown. You've mastered this module's core logic." : "Protocol mismatch. Review the lessons and attempt the calibration once more."}</p>
                           <div className="flex gap-3">
                              <Button onClick={handleQuizStart} variant="outline" className="flex-1 rounded-xl">Retry Attempt</Button>
                              <Button onClick={() => setQuizState('START')} className="flex-1 rounded-xl">Review Specs</Button>
                           </div>
                        </div>
                     </div>
                   )}
                </div>
              ) : (
                <div className="h-[60vh] flex flex-col items-center justify-center text-center gap-4 opacity-50">
                   <div className="w-20 h-20 rounded-full border-4 border-dashed border-[var(--text-muted)] animate-spin-slow" />
                   <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">Awaiting Selection...</p>
                </div>
              )}
           </div>
        </main>
      </div>
    </div>
  );
}
