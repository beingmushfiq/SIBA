import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import api from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus } from 'lucide-react';

export default function CourseEditor() {
  const { slug } = useParams<{ slug: string }>();
  const queryClient = useQueryClient();

  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [activeModuleForLesson, setActiveModuleForLesson] = useState<string | null>(null);
  const [newLessonData, setNewLessonData] = useState({ title: '', content: '' });

  const { data: course, isLoading } = useQuery({
    queryKey: ['course-edit', slug],
    queryFn: async () => {
      const response = await api.get(`/api/courses/${slug}`);
      return response.data;
    }
  });

  const addModuleMutation = useMutation({
    mutationFn: async (title: string) => {
      const response = await api.post(`/api/courses/${course.id}/modules`, { title });
      return response.data;
    },
    onSuccess: () => {
      setNewModuleTitle('');
      queryClient.invalidateQueries({ queryKey: ['course-edit', slug] });
    }
  });

  const addLessonMutation = useMutation({
    mutationFn: async (data: { moduleId: string, title: string, content: string }) => {
      const response = await api.post(`/api/modules/${data.moduleId}/lessons`, { title: data.title, content: data.content });
      return response.data;
    },
    onSuccess: () => {
      setActiveModuleForLesson(null);
      setNewLessonData({ title: '', content: '' });
      queryClient.invalidateQueries({ queryKey: ['course-edit', slug] });
    }
  });

  if (isLoading) return <div className="flex justify-center p-8">Loading editor...</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <Link to="/dashboard/trainer" className="inline-flex items-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>

      <div className="flex items-center justify-between">
         <div>
            <div className="flex gap-2 mb-2">
               <Badge variant="secondary">{course.level}</Badge>
               <Badge variant={course.published ? 'default' : 'outline'}>
                  {course.published ? 'Published' : 'Draft'}
               </Badge>
            </div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">{course.title}</h1>
         </div>
      </div>

      {/* Curriculum Map */}
      <h2 className="text-xl font-bold text-[var(--text-primary)] border-b border-[var(--border-secondary)] pb-2">Curriculum Editor</h2>
      
      <div className="space-y-6">
         {course.modules?.map((mod: any, mIdx: number) => (
           <Card key={mod.id} className="border border-[var(--border-secondary)] shadow-sm">
              <CardHeader className="bg-[var(--bg-secondary)] border-b border-[var(--border-secondary)] py-4 flex flex-row items-center justify-between">
                 <CardTitle className="text-lg">Module {mIdx + 1}: {mod.title}</CardTitle>
                 <Button variant="outline" size="sm" onClick={() => setActiveModuleForLesson(mod.id)}>
                   <Plus className="w-4 h-4 mr-2" /> Add Lesson
                 </Button>
              </CardHeader>
              <CardContent className="p-0">
                 {mod.lessons?.length > 0 ? (
                    <ul className="divide-y divide-[var(--border-secondary)]">
                       {mod.lessons.map((lesson: any, lIdx: number) => (
                          <li key={lesson.id} className="p-4 hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] flex items-center justify-between">
                             <span>{lIdx + 1}. {lesson.title}</span>
                             <span className="text-xs font-mono">{lesson.duration || 0}m</span>
                          </li>
                       ))}
                    </ul>
                 ) : (
                    <div className="p-6 text-center text-[var(--text-muted)]">No lessons added yet.</div>
                 )}

                 {/* New Lesson Form */}
                 {activeModuleForLesson === mod.id && (
                    <div className="p-4 bg-[var(--bg-tertiary)] border-t border-[var(--border-secondary)]">
                       <h4 className="text-sm font-semibold mb-3">Add New Lesson</h4>
                       <div className="space-y-3">
                          <input 
                            placeholder="Lesson Title" 
                            className="w-full p-2 text-sm rounded border border-[var(--border-secondary)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                            value={newLessonData.title}
                            onChange={e => setNewLessonData({...newLessonData, title: e.target.value})}
                          />
                          <textarea 
                            placeholder="Lesson Content / HTML" 
                            rows={3}
                            className="w-full p-2 text-sm rounded border border-[var(--border-secondary)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                            value={newLessonData.content}
                            onChange={e => setNewLessonData({...newLessonData, content: e.target.value})}
                          />
                          <div className="flex gap-2 justify-end">
                             <Button variant="ghost" size="sm" onClick={() => setActiveModuleForLesson(null)}>Cancel</Button>
                             <Button size="sm" onClick={() => addLessonMutation.mutate({ moduleId: mod.id, ...newLessonData })} disabled={!newLessonData.title}>
                               Save Lesson
                             </Button>
                          </div>
                       </div>
                    </div>
                 )}
              </CardContent>
           </Card>
         ))}

         {/* Add Module Form */}
         <Card className="border-dashed border-2 border-[var(--border-secondary)] bg-transparent">
            <CardContent className="p-6">
               <div className="flex items-end gap-4">
                  <div className="flex-1">
                     <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">New Module Title</label>
                     <input
                       type="text"
                       value={newModuleTitle}
                       onChange={(e) => setNewModuleTitle(e.target.value)}
                       placeholder="e.g. Introduction to the course"
                       className="w-full p-3 rounded-lg border border-[var(--border-secondary)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                     />
                  </div>
                  <Button 
                    onClick={() => addModuleMutation.mutate(newModuleTitle)} 
                    disabled={!newModuleTitle || addModuleMutation.isPending}
                  >
                     <Plus className="w-4 h-4 mr-2" /> Add Module
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
