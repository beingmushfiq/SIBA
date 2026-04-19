import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/dashboard/stat-card';
import { 
  BookOpen, Search, Plus, Loader2, Eye, EyeOff,
  Users, DollarSign, ChevronRight, BarChart3,
  Trash2, Edit, Save
} from 'lucide-react';
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AdminCoursesPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    level: 'BEGINNER',
    price: 0,
    category_id: '',
    trainer_id: ''
  });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-courses', searchTerm],
    queryFn: async () => {
      const response = await api.get('/api/courses'); // Note: categories are also here
      return response.data;
    }
  });

  const { data: trainersData } = useQuery({
    queryKey: ['admin-trainers-list'],
    queryFn: async () => {
      const response = await api.get('/api/admin/users'); // We can filter by role in UI or fetch specific
      return response.data;
    },
    enabled: isAddModalOpen
  });

  const createCourseMutation = useMutation({
    mutationFn: async (payload: typeof newCourse) => {
      const response = await api.post('/api/courses', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
      setIsAddModalOpen(false);
      setNewCourse({ title: '', description: '', level: 'BEGINNER', price: 0, category_id: '', trainer_id: '' });
      alert('Course created successfully!');
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Failed to create course');
    }
  });

  const deleteCourseMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/courses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
    }
  });

  const togglePublishMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.post(`/api/courses/${id}/toggle-publish`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
    }
  });

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    createCourseMutation.mutate(newCourse);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-500)] mb-4" />
        <p className="text-[var(--text-secondary)]">Loading course registry...</p>
      </div>
    );
  }

  const courses = data?.courses || [];
  const categories = data?.categories || [];
  const filteredCourses = courses.filter((c: any) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'BEGINNER': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'INTERMEDIATE': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'ADVANCED': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'EXPERT': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Course Management</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage all courses across the platform.</p>
        </div>
        <Button 
          className="h-11 rounded-xl px-5 gap-2"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4" /> Create Course
        </Button>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Quick Create Course</DialogTitle>
            <DialogDescription>
              Initialize a new course. You can add modules and lessons later in the editor.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateCourse} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Advanced AI Integration" 
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  required
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Input 
                  id="description" 
                  placeholder="Briefly describe what students will learn..." 
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Difficulty Level</Label>
                <Select 
                  value={newCourse.level} 
                  onValueChange={(val) => setNewCourse({...newCourse, level: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BEGINNER">Beginner</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                    <SelectItem value="ADVANCED">Advanced</SelectItem>
                    <SelectItem value="EXPERT">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({...newCourse, price: parseFloat(e.target.value)})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select 
                  value={newCourse.category_id} 
                  onValueChange={(val) => setNewCourse({...newCourse, category_id: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {(categories || []).map((cat: any) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Primary Trainer</Label>
                <Select 
                  value={newCourse.trainer_id} 
                  onValueChange={(val) => setNewCourse({...newCourse, trainer_id: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Assign trainer" />
                  </SelectTrigger>
                  <SelectContent>
                    {(trainersData?.users || [])
                      .filter((u: any) => u.role === 'TRAINER' || u.role === 'ADMIN')
                      .map((u: any) => (
                        <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddModalOpen(false)}
                disabled={createCourseMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={createCourseMutation.isPending}
              >
                {createCourseMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Launch Course Prototype'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Courses" value={courses.length} icon="BookOpen" color="#6366f1" index={0} />
        <StatCard label="Published" value={courses.filter((c: any) => c.published).length} icon="Eye" color="#10b981" index={1} />
        <StatCard label="Categories" value={categories.length} icon="BarChart3" color="#f59e0b" index={2} />
        <StatCard label="Total Enrollments" value={courses.reduce((sum: number, c: any) => sum + (c.enrollments_count || 0), 0)} icon="Users" color="#ec4899" index={3} />
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:border-[var(--brand-500)] transition-all text-[var(--text-primary)]"
        />
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-[var(--bg-secondary)] rounded-2xl border border-dashed border-[var(--border-primary)]">
            <BookOpen className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
            <p className="text-[var(--text-secondary)]">No courses found.</p>
          </div>
        ) : (
          filteredCourses.map((course: any) => (
            <Card key={course.id} className="overflow-hidden border-[var(--border-secondary)] hover:border-[var(--brand-500)]/30 transition-all duration-300 group bg-[var(--bg-secondary)]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-500)]/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-[var(--brand-500)]" />
                  </div>
                   <div className="flex items-center gap-2">
                    <button 
                      className={`p-2 rounded-lg transition-colors ${course.published ? 'text-emerald-500 hover:bg-emerald-500/10' : 'text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)]'}`}
                      onClick={() => togglePublishMutation.mutate(course.id)}
                      title={course.published ? "Unpublish" : "Publish"}
                    >
                      {course.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button 
                      className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                      onClick={() => confirm(`Permanently delete ${course.title}?`) && deleteCourseMutation.mutate(course.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors line-clamp-1 mb-2">
                  {course.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-4">by {course.trainer?.name || 'Unknown'}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getLevelColor(course.level)}`}>
                    {course.level}
                  </Badge>
                  {course.category && (
                    <Badge variant="outline" className="rounded-lg px-2 py-0.5 text-[10px]">
                      {course.category.name}
                    </Badge>
                  )}
                </div>
                <div className="pt-4 border-t border-[var(--border-secondary)] flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                    <Users className="w-3.5 h-3.5" /> {course.enrollments_count || 0}
                  </span>
                  <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                    <DollarSign className="w-3.5 h-3.5" /> ${course.price || 0}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
