import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';

interface CourseManagerProps {
  onBack: () => void;
}

export default function CourseManager({ onBack }: CourseManagerProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'BEGINNER',
    price: '0'
  });

  const createCourseMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post('/api/courses', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainer-dashboard'] });
      // Would normally redirect to detailed editor here
      onBack();
    },
    onError: () => {
      alert('Failed to create course. Please try again.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCourseMutation.mutate({
      ...formData,
      price: parseFloat(formData.price)
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
       <button onClick={onBack} className="flex items-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
       </button>

       <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Course</CardTitle>
          </CardHeader>
          <CardContent>
             <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                   <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Course Title</label>
                   <input
                     required
                     type="text"
                     value={formData.title}
                     onChange={(e) => setFormData({...formData, title: e.target.value})}
                     className="w-full px-4 py-3 rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                     placeholder="e.g. Advanced TypeScript Patterns"
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Description</label>
                   <textarea
                     required
                     rows={5}
                     value={formData.description}
                     onChange={(e) => setFormData({...formData, description: e.target.value})}
                     className="w-full px-4 py-3 rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                     placeholder="Describe what students will learn..."
                   />
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Level</label>
                     <select
                       value={formData.level}
                       onChange={(e) => setFormData({...formData, level: e.target.value})}
                       className="w-full px-4 py-3 rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                     >
                        <option value="BEGINNER">Beginner</option>
                        <option value="INTERMEDIATE">Intermediate</option>
                        <option value="ADVANCED">Advanced</option>
                        <option value="EXPERT">Expert</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Price (USD)</label>
                     <input
                       type="number"
                       min="0"
                       step="0.01"
                       value={formData.price}
                       onChange={(e) => setFormData({...formData, price: e.target.value})}
                       className="w-full px-4 py-3 rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500"
                     />
                   </div>
                </div>
                
                <div className="pt-4 flex justify-end gap-4">
                   <Button type="button" variant="outline" onClick={onBack}>Cancel</Button>
                   <Button type="submit" disabled={createCourseMutation.isPending} className="shadow-brand">
                      {createCourseMutation.isPending ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Course</>}
                   </Button>
                </div>
             </form>
          </CardContent>
       </Card>
    </div>
  );
}
