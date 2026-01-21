export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function calculateFocusScore(focusChecks: { wasFocused: boolean }[]): number {
  if (focusChecks.length === 0) return 0;
  const focusedCount = focusChecks.filter(c => c.wasFocused).length;
  return Math.round((focusedCount / focusChecks.length) * 100);
}

export function getTimeOfDay(date: Date): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = date.getHours();
  
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
}

export function getDateRange(range: 'week' | 'month' | 'year'): { start: Date; end: Date } {
  const end = new Date();
  const start = new Date();
  
  if (range === 'week') {
    start.setDate(start.getDate() - 7);
  } else if (range === 'month') {
    start.setMonth(start.getMonth() - 1);
  } else if (range === 'year') {
    start.setFullYear(start.getFullYear() - 1);
  }
  
  return { start, end };
}
