import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import api from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, Plus, Edit2, Trash2, 
  ChevronUp, ChevronDown, Check, X, Loader2, Video, HelpCircle
} from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from '@/components/ui/dialog';

export default function CourseEditor() {
  const { slug } = useParams<{ slug: string }>();
  const queryClient = useQueryClient();

  // State for modules
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingModuleTitle, setEditingModuleTitle] = useState('');
  
  // State for lessons
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [activeModuleForLesson, setActiveModuleForLesson] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const [lessonForm, setLessonForm] = useState({ title: '', content: '', video_url: '', duration: 0 });

  // State for Quizzes
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [activeModuleForQuiz, setActiveModuleForQuiz] = useState<string | null>(null);
  const [editingQuiz, setEditingQuiz] = useState<any>(null);
  const [quizForm, setQuizForm] = useState({
    title: '',
    description: '',
    passing_score: 80,
    time_limit: 0,
    questions: [] as any[]
  });

  const { data: course, isLoading } = useQuery({
    queryKey: ['course-edit', slug],
    queryFn: async () => {
      const response = await api.get(`/api/courses/${slug}`);
      return response.data;
    }
  });

  // Mutations
  const addModuleMutation = useMutation({
    mutationFn: async (title: string) => api.post(`/api/courses/${course.id}/modules`, { title }),
    onSuccess: () => { setNewModuleTitle(''); queryClient.invalidateQueries({ queryKey: ['course-edit', slug] }); }
  });

  const updateModuleMutation = useMutation({
    mutationFn: async ({ id, title }: { id: string, title: string }) => api.patch(`/api/modules/${id}`, { title }),
    onSuccess: () => { setEditingModuleId(null); queryClient.invalidateQueries({ queryKey: ['course-edit', slug] }); }
  });

  const deleteModuleMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/api/modules/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course-edit', slug] })
  });

  const saveLessonMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingLesson) return api.patch(`/api/lessons/${editingLesson.id}`, data);
      return api.post(`/api/modules/${activeModuleForLesson}/lessons`, data);
    },
    onSuccess: () => {
      setLessonModalOpen(false);
      setEditingLesson(null);
      queryClient.invalidateQueries({ queryKey: ['course-edit', slug] });
    }
  });

  const deleteLessonMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/api/lessons/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course-edit', slug] })
  });

  // Quiz Mutations
  const saveQuizMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingQuiz) return api.patch(`/api/quizzes/${editingQuiz.id}`, data);
      return api.post(`/api/modules/${activeModuleForQuiz}/quizzes`, data);
    },
    onSuccess: () => {
      setQuizModalOpen(false);
      setEditingQuiz(null);
      queryClient.invalidateQueries({ queryKey: ['course-edit', slug] });
    }
  });

  const deleteQuizMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/api/quizzes/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course-edit', slug] })
  });

  const reorderMutation = useMutation({
    mutationFn: async ({ type, parentId, ids }: { type: 'module' | 'lesson', parentId: string, ids: string[] }) => {
      const endpoint = type === 'module' 
        ? `/api/courses/${parentId}/modules/reorder` 
        : `/api/modules/${parentId}/lessons/reorder`;
      return api.post(endpoint, { [`${type}_ids`]: ids });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course-edit', slug] })
  });

  const handleMove = (type: 'module' | 'lesson', parentId: string, index: number, direction: 'up' | 'down') => {
    let items = type === 'module' ? [...course.modules] : [...course.modules.find((m: any) => m.id === parentId).lessons];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    const [removed] = items.splice(index, 1);
    items.splice(newIndex, 0, removed);
    reorderMutation.mutate({ type, parentId, ids: items.map(i => i.id) });
  };

  const addQuestion = () => {
    setQuizForm({
      ...quizForm,
      questions: [...quizForm.questions, { text: '', options: ['', '', '', ''], correct: 0 }]
    });
  };

  const updateQuestion = (idx: number, field: string, value: any) => {
    const qs = [...quizForm.questions];
    qs[idx] = { ...qs[idx], [field]: value };
    setQuizForm({ ...quizForm, questions: qs });
  };

  const updateOption = (qIdx: number, oIdx: number, val: string) => {
    const qs = [...quizForm.questions];
    qs[qIdx].options[oIdx] = val;
    setQuizForm({ ...quizForm, questions: qs });
  };

  if (isLoading) return <div className="h-[60vh] flex flex-col items-center justify-center gap-4"><Loader2 className="w-12 h-12 text-[var(--brand-500)] animate-spin" /></div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <Link to="/dashboard/trainer" className="inline-flex items-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <div className="flex gap-2 mb-2">
               <Badge className="bg-[var(--brand-500)]/10 text-[var(--brand-500)] border-none">{course.level}</Badge>
               <Badge variant={course.published ? 'default' : 'outline'}>{course.published ? 'Published' : 'Draft'}</Badge>
            </div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] leading-tight">{course.title}</h1>
         </div>
      </div>

      <div className="space-y-6">
         <div className="flex items-center justify-between border-b border-[var(--border-secondary)] pb-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)] font-black uppercase tracking-tighter">Curriculum Editor</h2>
         </div>
         
         <div className="space-y-4">
            {course.modules?.map((mod: any, mIdx: number) => (
              <Card key={mod.id} className="border border-[var(--border-secondary)] shadow-sm overflow-hidden group">
                 <CardHeader className="bg-[var(--bg-secondary)] py-4 flex flex-row items-center gap-2">
                    <div className="flex flex-col">
                       <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleMove('module', course.id, mIdx, 'up')} disabled={mIdx === 0}><ChevronUp className="w-4 h-4" /></Button>
                       <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleMove('module', course.id, mIdx, 'down')} disabled={mIdx === (course.modules.length - 1)}><ChevronDown className="w-4 h-4" /></Button>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                       {editingModuleId === mod.id ? (
                         <div className="flex items-center gap-2">
                            <Input value={editingModuleTitle} onChange={e => setEditingModuleTitle(e.target.value)} className="h-9 py-0" autoFocus />
                            <Button size="icon" className="h-8 w-8" onClick={() => updateModuleMutation.mutate({ id: mod.id, title: editingModuleTitle })}><Check className="w-4 h-4" /></Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditingModuleId(null)}><X className="w-4 h-4" /></Button>
                         </div>
                       ) : (
                         <CardTitle className="text-lg truncate">Module {mIdx + 1}: {mod.title}</CardTitle>
                       )}
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500" onClick={() => { setEditingModuleId(mod.id); setEditingModuleTitle(mod.title); }}><Edit2 className="w-4 h-4" /></Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => confirm('Delete module?') && deleteModuleMutation.mutate(mod.id)}><Trash2 className="w-4 h-4" /></Button>
                       <div className="w-[1px] h-4 bg-[var(--border-secondary)] mx-1" />
                       <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => { setActiveModuleForLesson(mod.id); setEditingLesson(null); setLessonForm({ title: '', content: '', video_url: '', duration: 0 }); setLessonModalOpen(true); }}><Plus className="w-4 h-4" /> Lesson</Button>
                       <Button variant="outline" size="sm" className="h-8 gap-1 border-purple-500/30 text-purple-600 hover:bg-purple-50/10" onClick={() => { setActiveModuleForQuiz(mod.id); setEditingQuiz(null); setQuizForm({ title: '', description: '', passing_score: 80, time_limit: 0, questions: [] }); setQuizModalOpen(true); }}><HelpCircle className="w-4 h-4" /> Quiz</Button>
                    </div>
                 </CardHeader>
                 <CardContent className="p-0">
                    <ul className="divide-y divide-[var(--border-secondary)]">
                       {/* Lessons */}
                       {mod.lessons?.map((lesson: any, lIdx: number) => (
                          <li key={lesson.id} className="p-4 hover:bg-[var(--bg-secondary)] flex items-center gap-4 group/lesson">
                             <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                   <span className="text-sm font-medium text-[var(--text-primary)] truncate">{lIdx + 1}. {lesson.title}</span>
                                   {lesson.video_url && <Video className="w-3 h-3 text-[var(--brand-500)]" />}
                                </div>
                             </div>
                             <div className="flex items-center gap-1 opacity-0 group-hover/lesson:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingLesson(lesson); setLessonForm({ title: lesson.title, content: lesson.content, video_url: lesson.video_url || '', duration: lesson.duration || 0 }); setLessonModalOpen(true); }}><Edit2 className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => confirm('Delete lesson?') && deleteLessonMutation.mutate(lesson.id)}><Trash2 className="w-4 h-4" /></Button>
                             </div>
                          </li>
                       ))}
                       {/* Quizzes */}
                       {mod.quizzes?.map((quiz: any) => (
                          <li key={quiz.id} className="p-4 bg-purple-500/5 hover:bg-purple-500/10 flex items-center justify-between group/quiz">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                   <HelpCircle className="w-4 h-4 text-purple-600" />
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-purple-900">{quiz.title}</p>
                                   <p className="text-[10px] text-purple-600 font-black uppercase tracking-widest">{quiz.questions?.length || 0} Questions • {quiz.passing_score}% Pass</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-1 opacity-0 group-hover/quiz:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-600" onClick={() => { setEditingQuiz(quiz); setQuizForm({ ...quiz }); setQuizModalOpen(true); }}><Edit2 className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => confirm('Delete quiz?') && deleteQuizMutation.mutate(quiz.id)}><Trash2 className="w-4 h-4" /></Button>
                             </div>
                          </li>
                       ))}
                    </ul>
                    {(!mod.lessons?.length && !mod.quizzes?.length) && <div className="p-8 text-center text-[var(--text-muted)] italic text-sm">No content added.</div>}
                 </CardContent>
              </Card>
            ))}

            <div className="p-6 rounded-2xl border-2 border-dashed border-[var(--border-secondary)] hover:border-[var(--brand-500)]/30 transition-all bg-[var(--bg-secondary)]/30 flex items-center gap-4">
               <div className="flex-1">
                  <Input value={newModuleTitle} onChange={e => setNewModuleTitle(e.target.value)} placeholder="Add new module..." className="border-none bg-transparent text-lg font-bold p-0 focus-visible:ring-0" />
               </div>
               <Button onClick={() => addModuleMutation.mutate(newModuleTitle)} disabled={!newModuleTitle} className="rounded-xl px-4">
                  {addModuleMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />} Module
               </Button>
            </div>
         </div>
      </div>

      {/* Lesson Modal */}
      <Dialog open={lessonModalOpen} onOpenChange={setLessonModalOpen}>
         <DialogContent className="max-w-2xl bg-[var(--bg-primary)]">
            <DialogHeader><DialogTitle>{editingLesson ? 'Edit Lesson' : 'Add Lesson'}</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
               <Input placeholder="Lesson Title" value={lessonForm.title} onChange={e => setLessonForm({...lessonForm, title: e.target.value})} />
               <div className="grid grid-cols-2 gap-4">
                  <Input type="number" placeholder="Duration" value={lessonForm.duration} onChange={e => setLessonForm({...lessonForm, duration: parseInt(e.target.value)})} />
                  <Input placeholder="Video URL" value={lessonForm.video_url} onChange={e => setLessonForm({...lessonForm, video_url: e.target.value})} />
               </div>
               <textarea className="w-full min-h-[150px] p-3 rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-secondary)] text-sm" placeholder="Markdown content..." value={lessonForm.content} onChange={e => setLessonForm({...lessonForm, content: e.target.value})} />
            </div>
            <DialogFooter>
               <Button variant="ghost" onClick={() => setLessonModalOpen(false)}>Cancel</Button>
               <Button onClick={() => saveLessonMutation.mutate(lessonForm)}>Save</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

      {/* Quiz Modal */}
      <Dialog open={quizModalOpen} onOpenChange={setQuizModalOpen}>
         <DialogContent className="max-w-3xl bg-[var(--bg-primary)] overflow-y-auto max-h-[90vh]">
            <DialogHeader><DialogTitle>{editingQuiz ? 'Edit Quiz' : 'Add Quiz'}</DialogTitle></DialogHeader>
            <div className="space-y-6 py-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-[var(--text-muted)]">Quiz Title</label>
                     <Input value={quizForm.title} onChange={e => setQuizForm({...quizForm, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-[var(--text-muted)]">Passing Score %</label>
                     <Input type="number" value={quizForm.passing_score} onChange={e => setQuizForm({...quizForm, passing_score: parseInt(e.target.value)})} />
                  </div>
               </div>
               
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <h3 className="text-sm font-bold uppercase tracking-widest text-purple-600">Questions ({quizForm.questions.length})</h3>
                     <Button type="button" variant="outline" size="sm" onClick={addQuestion} className="gap-1 border-purple-500/20 text-purple-600"><Plus className="w-3 h-3" /> Question</Button>
                  </div>
                  
                  {quizForm.questions.map((q, qIdx) => (
                     <div key={qIdx} className="p-4 rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-secondary)]/50 space-y-3 relative">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 text-red-500" onClick={() => setQuizForm({...quizForm, questions: quizForm.questions.filter((_, i) => i !== qIdx)})}><Trash2 className="w-3 h-3" /></Button>
                        <Input placeholder={`Question ${qIdx + 1}`} value={q.text} onChange={e => updateQuestion(qIdx, 'text', e.target.value)} />
                        <div className="grid grid-cols-2 gap-2">
                           {q.options.map((opt: string, oIdx: number) => (
                             <div key={oIdx} className="flex items-center gap-2">
                                <input type="radio" name={`correct-${qIdx}`} checked={q.correct === oIdx} onChange={() => updateQuestion(qIdx, 'correct', oIdx)} />
                                <Input className="h-8 text-xs" placeholder={`Option ${String.fromCharCode(65 + oIdx)}`} value={opt} onChange={e => updateOption(qIdx, oIdx, e.target.value)} />
                             </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <DialogFooter>
               <Button variant="ghost" onClick={() => setQuizModalOpen(false)}>Cancel</Button>
               <Button onClick={() => saveQuizMutation.mutate(quizForm)} className="bg-purple-600 hover:bg-purple-700">Save Intelligence Assessment</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
}
