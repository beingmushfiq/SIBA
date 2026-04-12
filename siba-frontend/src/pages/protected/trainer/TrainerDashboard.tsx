import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Users, Eye, EyeOff, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CourseManager from './CourseManager';

export default function TrainerDashboard() {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['trainer-dashboard'],
    queryFn: async () => {
      const response = await api.get('/api/trainer/dashboard');
      return response.data;
    }
  });

  const togglePublishMutation = useMutation({
    mutationFn: async (courseId: string) => {
      await api.post(`/api/courses/${courseId}/toggle-publish`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer-dashboard'] });
    }
  });

  if (isLoading) return <div className="flex h-64 items-center justify-center">Loading dashboard...</div>;
  if (error) return <div className="text-red-500">Error loading dashboard</div>;

  if (isCreating) {
    return <CourseManager onBack={() => setIsCreating(false)} />;
  }

  const { metrics, courses } = data;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header and Metrics */}
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-bold text-[var(--text-primary)]">Trainer Dashboard</h1>
           <p className="text-[var(--text-secondary)]">Manage your courses and evaluate student progress.</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="shadow-brand">
          <Plus className="w-5 h-5 mr-2" />
          Create Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg shadow-indigo-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">My Courses</p>
                <p className="text-2xl font-bold">{metrics.totalCourses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg shadow-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Total Students Enrolled</p>
                <p className="text-2xl font-bold">{metrics.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses List */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Course Management</h2>
        
        {courses.length === 0 ? (
          <div className="text-center py-20 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-secondary)]">
            <BookOpen className="w-16 h-16 mx-auto text-[var(--text-muted)] mb-4" />
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">No courses created yet</h3>
            <p className="text-[var(--text-secondary)] mb-6">Start building your first course to begin teaching.</p>
            <Button onClick={() => setIsCreating(true)}>Create Your First Course</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {courses.map((course: any) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardContent className="p-6">
                     <div className="flex justify-between items-start mb-4">
                        <div className="pr-12">
                           <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 line-clamp-1">{course.title}</h3>
                           <Badge variant={course.published ? 'default' : 'secondary'} className="mb-4">
                              {course.published ? 'Published' : 'Draft'}
                           </Badge>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4 text-sm text-[var(--text-secondary)] mb-6 bg-[var(--bg-secondary)] p-4 rounded-xl">
                        <div className="flex flex-col">
                           <span className="font-semibold text-[var(--text-primary)]">{course.enrollments_count}</span>
                           <span>Students</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="font-semibold text-[var(--text-primary)]">{course.modules_count}</span>
                           <span>Modules</span>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <Button 
                           variant="outline" 
                           onClick={() => togglePublishMutation.mutate(course.id)}
                           className="flex-1"
                        >
                           {course.published ? <><EyeOff className="w-4 h-4 mr-2" /> Unpublish</> : <><Eye className="w-4 h-4 mr-2" /> Publish</>}
                        </Button>
                        <Link to={`/dashboard/trainer/courses/${course.slug}/edit`} className="flex-1">
                           <Button variant="secondary" className="w-full">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                           </Button>
                        </Link>
                     </div>
                  </CardContent>
                </Card>
             ))}
          </div>
        )}
      </div>

    </div>
  );
}
