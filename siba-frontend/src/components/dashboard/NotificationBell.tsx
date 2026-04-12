import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Bell, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export function NotificationBell() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await api.get('/api/notifications');
      return response.data;
    },
    refetchInterval: 30000 // Poll every 30s
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => api.post('/api/notifications/mark-read'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-xl w-10 h-10">
          <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 border-2 border-[var(--bg-primary)]">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 border-[var(--border-secondary)] shadow-2xl mr-4" align="end">
        <div className="p-4 border-b border-[var(--border-secondary)] flex items-center justify-between">
          <h3 className="font-bold text-[var(--text-primary)]">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-8 text-[var(--brand-500)]"
                onClick={() => markAllReadMutation.mutate()}
            >
              <CheckSquare className="w-3 h-3 mr-2" />
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-[var(--text-muted)]">
              No notifications yet.
            </div>
          ) : (
            <div className="divide-y divide-[var(--border-secondary)]/50">
              {notifications.map((n: any) => (
                <div key={n.id} className={`p-4 transition-colors ${!n.read ? 'bg-[var(--brand-500)]/5 dark:bg-[var(--brand-500)]/05' : ''}`}>
                  <p className={`text-sm ${!n.read ? 'font-bold text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                    {n.title}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{n.message}</p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-2">
                    {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
