import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function RevenuePage() {
  const transactions = [
    { id: 1, student: 'Nadia Ahmed', course: 'Full-Stack Web Development', amount: 99, date: '2026-04-14', type: 'enrollment' },
    { id: 2, student: 'Karim Hassan', course: 'AI-Powered Business Automation', amount: 149, date: '2026-04-13', type: 'enrollment' },
    { id: 3, student: 'Fatima Sultana', course: 'Digital Marketing Mastery', amount: 79, date: '2026-04-12', type: 'enrollment' },
    { id: 4, student: 'Rafiq Uddin', course: 'Cloud Architecture & DevOps', amount: 129, date: '2026-04-11', type: 'enrollment' },
    { id: 5, student: 'Imran Sheikh', course: 'AI-Powered Business Automation', amount: -149, date: '2026-04-10', type: 'refund' },
    { id: 6, student: 'Salma Khatun', course: 'Full-Stack Web Development', amount: 99, date: '2026-04-09', type: 'enrollment' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Revenue Dashboard</h1>
        <p className="text-[var(--text-secondary)] mt-1">Financial overview and transaction history.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="$12,450" icon="DollarSign" color="#10b981" change={12} index={0} />
        <StatCard label="This Month" value="$3,280" icon="TrendingUp" color="#6366f1" change={8} index={1} />
        <StatCard label="Transactions" value="156" icon="CreditCard" color="#f59e0b" change={5} index={2} />
        <StatCard label="Avg. Order Value" value="$108" icon="DollarSign" color="#ec4899" change={-2} index={3} />
      </div>

      {/* Revenue Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-around gap-2 px-4">
            {[40, 55, 35, 70, 60, 85, 75, 90, 65, 80, 95, 88].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-[var(--brand-600)] to-[var(--brand-400)] transition-all hover:from-[var(--brand-500)] hover:to-[var(--brand-300)] cursor-pointer"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] text-[var(--text-muted)]">
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.amount > 0 ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                    {tx.amount > 0 ? (
                      <ArrowUpRight className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--text-primary)]">{tx.student}</p>
                    <p className="text-xs text-[var(--text-muted)]">{tx.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${tx.amount > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount > 0 ? `$${tx.amount}` : `-$${Math.abs(tx.amount)}`}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{tx.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
