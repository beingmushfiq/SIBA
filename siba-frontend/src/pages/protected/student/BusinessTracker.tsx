import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, TrendingUp, Target, CalendarDays, Rocket, Sparkles } from 'lucide-react';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// ----------------------------------------------------------------------------
// CreatePlanForm Component
// ----------------------------------------------------------------------------
function CreatePlanForm() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      await api.post('/api/business', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-plan'] });
    }
  });

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Create Your Business Plan</CardTitle>
        <CardDescription>Tell us about the idea you are executing.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); mutation.mutate({ title, description }); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Business Name / Idea Title</label>
            <input required className="w-full p-2 rounded border border-[var(--border-secondary)] bg-[var(--bg-secondary)]" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Elevator Pitch</label>
            <textarea required rows={3} className="w-full p-2 rounded border border-[var(--border-secondary)] bg-[var(--bg-secondary)]" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? 'Creating...' : 'Initialize Tracker'}</Button>
        </form>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------------
// AddEntryForm Component
// ----------------------------------------------------------------------------
function AddEntryForm({ businessPlanId, currentStage }: { businessPlanId: string, currentStage: string }) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [revenue, setRevenue] = useState('0');
  const [stage, setStage] = useState(currentStage);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      await api.post('/api/business/entries', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-plan'] });
      setTitle('');
      setNotes('');
      setRevenue('0');
    }
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); mutation.mutate({ business_plan_id: businessPlanId, title, notes, revenue, stage }); }} className="space-y-4">
      <div>
        <label className="block text-sm text-[var(--text-secondary)]">Milestone / Action Taken</label>
        <input required className="w-full p-2 rounded border border-[var(--border-secondary)] bg-[var(--bg-tertiary)]" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm text-[var(--text-secondary)]">Notes & Learnings</label>
        <textarea rows={3} className="w-full p-2 rounded border border-[var(--border-secondary)] bg-[var(--bg-tertiary)]" value={notes} onChange={e => setNotes(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
           <label className="block text-sm text-[var(--text-secondary)]">Revenue Generated ($)</label>
           <input type="number" min="0" step="0.01" className="w-full p-2 rounded border border-[var(--border-secondary)] bg-[var(--bg-tertiary)]" value={revenue} onChange={e => setRevenue(e.target.value)} />
        </div>
        <div>
           <label className="block text-sm text-[var(--text-secondary)]">Update Stage</label>
           <select className="w-full p-2 rounded border border-[var(--border-secondary)] bg-[var(--bg-tertiary)]" value={stage} onChange={e => setStage(e.target.value)}>
             <option value="IDEA">Idea Phase</option>
             <option value="PLAN">Planning</option>
             <option value="EXECUTION">Execution</option>
             <option value="REVENUE">First Revenue</option>
             <option value="GROWTH">Scaling/Growth</option>
           </select>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={mutation.isPending}>{mutation.isPending ? 'Logging...' : 'Log Progress'}</Button>
    </form>
  );
}

// ----------------------------------------------------------------------------
// AICoachWidget Component
// ----------------------------------------------------------------------------
function AICoachWidget({ businessPlanId }: { businessPlanId: string }) {
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['ai-coach', businessPlanId],
    queryFn: async () => {
      const response = await api.post(`/api/business/${businessPlanId}/ai-advice`);
      return response.data;
    },
    enabled: false
  });

  return (
    <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
      <CardHeader>
        <CardTitle className="text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
           <Sparkles className="w-5 h-5" /> AI Execution Coach
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!data && !isLoading && (
          <p className="text-sm text-[var(--text-secondary)]">Get personalized advice based on your recent execution logs and current stage.</p>
        )}
        {data && (
          <div className="p-4 bg-white/60 dark:bg-black/40 rounded-xl border border-indigo-500/20 text-sm">
             <p className="text-[var(--text-primary)] leading-relaxed">{data.advice}</p>
          </div>
        )}
        <Button onClick={() => refetch()} disabled={isFetching} variant="secondary" className="w-full">
           {isFetching ? 'Analyzing...' : 'Generate New Advice'}
        </Button>
      </CardContent>
    </Card>
  );
}


// ----------------------------------------------------------------------------
// Main Page Export
// ----------------------------------------------------------------------------
export default function BusinessTracker() {
  const { data, isLoading } = useQuery({
    queryKey: ['business-plan'],
    queryFn: async () => {
      const response = await api.get('/api/business');
      return response.data.plan; // might be null
    }
  });

  if (isLoading) return <div className="p-8">Loading tracker...</div>;

  const plan = data;

  if (!plan) {
    return (
      <div className="py-6 space-y-6 animate-in fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Business Idea Tracker</h1>
          <p className="text-[var(--text-secondary)] mt-2">
             Execute your learning. Transform your skills into real-world value.
          </p>
        </div>
        <CreatePlanForm />
      </div>
    );
  }

  const STAGE_COLORS: Record<string, string> = {
    IDEA: "bg-slate-500",
    PLAN: "bg-blue-500",
    EXECUTION: "bg-yellow-500",
    REVENUE: "bg-emerald-500",
    GROWTH: "bg-purple-500",
  };

  const totalEntries = plan.entries?.length || 0;
  const recentRevenue = plan.entries?.slice(0, 3).reduce((acc: number, e: any) => acc + (parseFloat(e.revenue) || 0), 0) || 0;

  return (
    <div className="py-6 space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">{plan.title}</h1>
          <p className="text-[var(--text-secondary)] mt-2 max-w-2xl">{plan.description}</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-secondary)] bg-[var(--bg-tertiary)]">
          <Target className="w-4 h-4 text-[var(--brand-400)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">Stage:</span>
          <Badge className={`${STAGE_COLORS[plan.stage] || "bg-gray-500"} text-white border-0`}>
            {plan.stage}
          </Badge>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-[var(--brand-600)]/30 bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-primary)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            <p className="text-sm font-medium text-[var(--text-muted)] mb-1">Total Revenue Tracking</p>
            <h3 className="text-3xl font-bold text-[var(--text-primary)]">{formatCurrency(plan.revenue)}</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <p className="text-sm font-medium text-[var(--text-muted)] mb-1">Recent Momentum (Last 3)</p>
            <h3 className="text-3xl font-bold text-[var(--text-primary)]">{formatCurrency(recentRevenue)}</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            <p className="text-sm font-medium text-[var(--text-muted)] mb-1">Total Entries Logged</p>
            <h3 className="text-3xl font-bold text-[var(--text-primary)]">{totalEntries} Updates</h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Execution Timeline</h2>
          {plan.entries?.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-[var(--border-secondary)] rounded-xl">
              <CalendarDays className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)]">No execution entries yet.</p>
            </div>
          ) : (
            <div className="relative border-l-2 border-[var(--border-secondary)] ml-4 space-y-8">
              {plan.entries?.map((entry: any) => (
                <div key={entry.id} className="relative pl-8">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[var(--brand-500)] ring-4 ring-[var(--bg-primary)]" />
                  <div className="glass-card p-5 rounded-xl border border-[var(--border-secondary)]">
                    <div className="flex items-start justify-between mb-2">
                       <h4 className="font-semibold text-[var(--text-primary)]">{entry.title}</h4>
                       {entry.revenue > 0 && (
                         <Badge variant="default" className="shrink-0 bg-emerald-500 text-white border-none">
                           +{formatCurrency(entry.revenue)}
                         </Badge>
                       )}
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-[var(--text-secondary)] mt-2 whitespace-pre-wrap">{entry.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: AI & Form */}
        <div className="lg:col-span-1 space-y-6">
          <AICoachWidget businessPlanId={plan.id} />
          
          <Card className="sticky top-24 border-[var(--border-secondary)]">
            <CardHeader>
              <CardTitle>Log Progress</CardTitle>
              <CardDescription>Update your stage and add milestones.</CardDescription>
            </CardHeader>
            <CardContent>
              <AddEntryForm businessPlanId={plan.id} currentStage={plan.stage} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
