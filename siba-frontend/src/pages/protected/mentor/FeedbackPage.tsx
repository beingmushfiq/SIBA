import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/stat-card';
import { MessageSquare, Plus, Star, Send } from 'lucide-react';
import { useState } from 'react';

export default function FeedbackPage() {
  const [newFeedback, setNewFeedback] = useState('');

  const feedbackHistory = [
    { id: 1, student: 'Nadia Ahmed', topic: 'Business Plan Review', rating: 5, message: 'Excellent strategy draft. Focus on the revenue model section — the unit economics need tighter validation before investor pitch.', date: '2026-04-14', type: 'given' },
    { id: 2, student: 'Karim Hassan', topic: 'Marketing Strategy', rating: 4, message: 'Good progress on market research. Consider adding competitive analysis for the local market segment.', date: '2026-04-12', type: 'given' },
    { id: 3, student: 'Fatima Sultana', topic: 'Pitch Presentation', rating: 5, message: 'Outstanding pitch deck. The storytelling narrative is compelling. Ready for demo day.', date: '2026-04-10', type: 'given' },
    { id: 4, student: 'Rafiq Uddin', topic: 'MVP Development', rating: 3, message: 'The technical foundation is solid, but the user flow needs significant simplification. Schedule a follow-up session.', date: '2026-04-08', type: 'given' },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-[var(--border-secondary)]'}`}
      />
    ));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Feedback</h1>
        <p className="text-[var(--text-secondary)] mt-1">Provide actionable feedback to your mentees.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Feedback" value={feedbackHistory.length} icon="MessageSquare" color="#8b5cf6" index={0} />
        <StatCard label="This Month" value={feedbackHistory.filter(f => f.date >= '2026-04-01').length} icon="Clock" color="#6366f1" index={1} />
        <StatCard label="Avg Rating" value={`${(feedbackHistory.reduce((s, f) => s + f.rating, 0) / feedbackHistory.length).toFixed(1)}`} icon="Star" color="#f59e0b" index={2} />
        <StatCard label="Students Covered" value={new Set(feedbackHistory.map(f => f.student)).size} icon="Users" color="#10b981" index={3} />
      </div>

      {/* Quick Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Plus className="w-5 h-5 text-[var(--brand-500)]" /> Quick Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <textarea
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              placeholder="Write feedback for a student..."
              rows={3}
              className="flex-1 px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] focus:outline-none focus:border-[var(--brand-500)] transition-all text-[var(--text-primary)] text-sm resize-none"
            />
            <Button className="h-auto gap-2 self-end">
              <Send className="w-4 h-4" /> Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feedback History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-500" /> Feedback History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {feedbackHistory.map((feedback) => (
            <div key={feedback.id} className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-sm font-bold text-purple-500">
                    {feedback.student.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">{feedback.student}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{feedback.topic}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(feedback.rating)}</div>
                  <span className="text-xs text-[var(--text-muted)]">{feedback.date}</span>
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed pl-[52px]">
                {feedback.message}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
