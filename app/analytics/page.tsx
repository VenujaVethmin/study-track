'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface AnalyticsData {
  totalTime: number;
  sessionsCount: number;
  avgFocusScore: number;
  subjectStats: Array<{
    subject: string;
    duration: number;
    avgFocusScore: number;
    sessionsCount: number;
  }>;
  dailyData: { [key: string]: number };
  bestStudyTimes: Array<{
    hour: number;
    avgFocusScore: number;
    totalDuration: number;
  }>;
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('week');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/analytics?userId=temp-user&range=${timeRange}`);
      const analyticsData = await response.json();
      setData(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs > 0) return `${hrs}.${Math.round((mins / 60) * 10)}h`;
    return `${mins}m`;
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-bold text-slate-900">StudyTracker</span>
          </Link>
          
          <nav className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/tasks"
              className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors"
            >
              Tasks
            </Link>
            <Link
              href="/analytics"
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium"
            >
              Analytics
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics</h1>
            <p className="text-slate-600">Track your study patterns and progress</p>
          </div>
          
          {/* Time Range Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === 'year'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              This Year
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">📚</span>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{formatDuration(data?.totalTime || 0)}</div>
            <p className="text-sm text-slate-600">Total Study Time</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🎯</span>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+5%</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{data?.avgFocusScore || 0}%</div>
            <p className="text-sm text-slate-600">Average Focus Score</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">⚡</span>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Active</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{data?.sessionsCount || 0}</div>
            <p className="text-sm text-slate-600">Study Sessions</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🔥</span>
              <span className="text-sm font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">Great!</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{data?.subjectStats?.length || 0}</div>
            <p className="text-sm text-slate-600">Subjects Studied</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Study Time Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Study Time Over Time</h2>
            
            {/* Bar Chart Visualization */}
            <div className="space-y-4">
              <div className="flex items-end gap-2 h-48">
                {data?.dailyData && Object.keys(data.dailyData).length > 0 ? (
                  Object.entries(data.dailyData).map(([date, duration]) => {
                    const maxDuration = Math.max(...Object.values(data.dailyData));
                    const heightPercent = maxDuration > 0 ? (duration / maxDuration) * 100 : 0;
                    return (
                      <div key={date} className="flex-1 flex flex-col justify-end">
                        <div 
                          className="bg-blue-600 rounded-t hover:bg-blue-700 transition-colors" 
                          style={{ height: `${heightPercent}%` }}
                          title={`${getDayName(date)}: ${formatDuration(duration)}`}
                        ></div>
                        <span className="text-xs text-slate-600 mt-2 text-center">{getDayName(date)}</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full text-center py-8 text-slate-500">No data available</div>
                )}
              </div>
            </div>

            {data?.dailyData && Object.keys(data.dailyData).length > 0 && (
              <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    {formatDuration(Math.round(data.totalTime / Object.keys(data.dailyData).length))}
                  </div>
                  <p className="text-xs text-slate-600">Daily Average</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {formatDuration(Math.max(...Object.values(data.dailyData)))}
                  </div>
                  <p className="text-xs text-slate-600">Best Day</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {formatDuration(Math.min(...Object.values(data.dailyData)))}
                  </div>
                  <p className="text-xs text-slate-600">Lowest Day</p>
                </div>
              </div>
            )}
          </div>

          {/* Subject Distribution */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Top Subjects</h2>
            
            {data?.subjectStats && data.subjectStats.length > 0 ? (
              <>
                <div className="space-y-4">
                  {data.subjectStats.slice(0, 5).map((subject, index) => {
                    const colors = ['blue', 'green', 'purple', 'yellow', 'pink'];
                    const color = colors[index % colors.length];
                    const maxDuration = Math.max(...data.subjectStats.map(s => s.duration));
                    const widthPercent = (subject.duration / maxDuration) * 100;
                    
                    return (
                      <div key={subject.subject}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-slate-900">{subject.subject}</span>
                          <span className="text-sm text-slate-600">{formatDuration(subject.duration)}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className={`bg-${color}-600 h-2 rounded-full`} style={{ width: `${widthPercent}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <div className="text-sm text-slate-600 mb-2">Total Subjects Studied</div>
                  <div className="text-2xl font-bold text-slate-900">{data.subjectStats.length}</div>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500 text-center py-8">No subject data available yet</p>
            )}
          </div>
        </div>

        {/* Focus Score Trends */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Focus Score Breakdown</h2>
            
            {data && data.avgFocusScore !== undefined ? (
              <>
                <div className="space-y-3 mb-6">
                  {/* High Focus (80-100%) */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">✅</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-slate-900">High Focus (80-100%)</span>
                        <span className="text-sm font-semibold text-green-600">
                          {data.subjectStats.filter(s => s.avgFocusScore >= 80).length} subjects
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ 
                            width: data.subjectStats.length > 0 
                              ? `${(data.subjectStats.filter(s => s.avgFocusScore >= 80).length / data.subjectStats.length) * 100}%` 
                              : '0%' 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Medium Focus (60-79%) */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-slate-900">Medium Focus (60-79%)</span>
                        <span className="text-sm font-semibold text-yellow-600">
                          {data.subjectStats.filter(s => s.avgFocusScore >= 60 && s.avgFocusScore < 80).length} subjects
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-yellow-600 h-2 rounded-full" 
                          style={{ 
                            width: data.subjectStats.length > 0 
                              ? `${(data.subjectStats.filter(s => s.avgFocusScore >= 60 && s.avgFocusScore < 80).length / data.subjectStats.length) * 100}%` 
                              : '0%' 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Low Focus (<60%) */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">❌</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-slate-900">Low Focus (&lt;60%)</span>
                        <span className="text-sm font-semibold text-red-600">
                          {data.subjectStats.filter(s => s.avgFocusScore < 60).length} subjects
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full" 
                          style={{ 
                            width: data.subjectStats.length > 0 
                              ? `${(data.subjectStats.filter(s => s.avgFocusScore < 60).length / data.subjectStats.length) * 100}%` 
                              : '0%' 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold text-blue-600">Overall Focus Score:</span> {Math.round(data.avgFocusScore)}%
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500 text-center py-8">No focus data available yet</p>
            )}
            {data?.bestStudyTimes && data.bestStudyTimes.length > 0 ? (
              <>
                <div className="space-y-4">
                  {data.bestStudyTimes.slice(0, 3).map((timeSlot, index) => {
                    const colors = ['green', 'blue', 'yellow'];
                    const color = colors[index];
                    const labels = ['Most productive', 'Good focus', 'Lower focus'];
                    
                    return (
                      <div key={timeSlot.hour} className={`flex items-center justify-between p-3 bg-${color}-50 rounded-lg border border-${color}-200`}>
                        <div>
                          <div className="font-semibold text-slate-900">{formatHour(timeSlot.hour)}</div>
                          <p className="text-sm text-slate-600">{labels[index]} - {formatDuration(timeSlot.totalDuration)}</p>
                        </div>
                        <div className={`text-2xl font-bold text-${color}-600`}>{timeSlot.avgFocusScore}%</div>
                      </div>
                    );
                  })}
                </div>

                {data.bestStudyTimes.length > 0 && (
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💡</span>
                      <div>
                        <p className="font-semibold text-slate-900 mb-1">Recommendation</p>
                        <p className="text-sm text-slate-600">
                          Your best focus time is around {formatHour(data.bestStudyTimes[0].hour)}. Schedule important tasks during this period.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-slate-500 text-center py-8">Complete more study sessions to see your best times</p>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Summary Statistics 📊</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 text-center">
              <div className="text-4xl mb-2">⏱️</div>
              <div className="font-semibold text-slate-900 mb-1">{formatDuration(data?.totalTime || 0)}</div>
              <p className="text-xs text-slate-600">Total study time</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 text-center">
              <div className="text-4xl mb-2">🎯</div>
              <div className="font-semibold text-slate-900 mb-1">{data?.avgFocusScore || 0}%</div>
              <p className="text-xs text-slate-600">Average focus</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 text-center">
              <div className="text-4xl mb-2">📚</div>
              <div className="font-semibold text-slate-900 mb-1">{data?.subjectStats?.length || 0}</div>
              <p className="text-xs text-slate-600">Subjects studied</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 text-center">
              <div className="text-4xl mb-2">📝</div>
              <div className="font-semibold text-slate-900 mb-1">{data?.sessionsCount || 0}</div>
              <p className="text-xs text-slate-600">Total sessions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}