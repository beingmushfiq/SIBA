import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { ArrowUpRight, ArrowDownRight, Loader2, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';

export default function RevenuePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await api.get("/api/admin/revenue");
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch revenue data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRevenue();
  }, []);

  const handleExport = async () => {
    try {
      const response = await api.get('/api/admin/revenue/export', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `siba_revenue_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Failed to export revenue data.");
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-[var(--brand-500)] animate-spin" />
        <p className="text-[var(--text-muted)] font-black uppercase tracking-widest text-[10px]">Processing Financial Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Revenue Dashboard</h1>
          <p className="text-[var(--text-secondary)] mt-1">Financial overview and transaction history.</p>
        </div>
        <Button 
          variant="outline" 
          className="h-11 rounded-xl px-5 gap-2 border-[var(--brand-500)]/30 text-[var(--brand-500)] hover:bg-[var(--brand-500)]/10"
          onClick={handleExport}
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Total Revenue" 
          value={`$${(data?.totalRevenue || 0).toLocaleString()}`} 
          icon="DollarSign" 
          color="#10b981" 
          change={12} 
          index={0} 
        />
        <StatCard 
          label="This Month" 
          value={`$${(data?.thisMonth || 0).toLocaleString()}`} 
          icon="TrendingUp" 
          color="#6366f1" 
          change={8} 
          index={1} 
        />
        <StatCard 
          label="Transactions" 
          value={data?.transactionsCount?.toString() || "0"} 
          icon="CreditCard" 
          color="#f59e0b" 
          change={5} 
          index={2} 
        />
        <StatCard 
          label="Avg. Order Value" 
          value={`$${Math.round(data?.avgOrderValue || 0)}`} 
          icon="DollarSign" 
          color="#ec4899" 
          change={-2} 
          index={3} 
        />
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-around gap-2 px-4">
            {data?.trend?.map((item: any, i: number) => {
               const maxVal = Math.max(...data.trend.map((t: any) => t.revenue), 1);
               const height = (item.revenue / maxVal) * 90 + 5; // Min 5% height
               return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-[var(--brand-600)] to-[var(--brand-400)] transition-all hover:from-[var(--brand-500)] hover:to-[var(--brand-300)] cursor-pointer"
                    style={{ height: `${height}%` }}
                    title={`$${item.revenue}`}
                    />
                    <span className="text-[10px] text-[var(--text-muted)]">
                    {item.month}
                    </span>
                </div>
               );
            })}
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
            {data?.transactions?.map((tx: any) => (
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
            {data?.transactions?.length === 0 && (
                <p className="text-center py-10 text-[var(--text-muted)] text-sm">No transactions yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
