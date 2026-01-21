'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTimer } from '@/context/TimerContext';

interface TodayStats {
  totalTime: number;
  sessionsCount: number;
  avgFocusScore: number;
  completedTasks: number;
  streak: number;
  sessions: Array<{
    id: string;
    subject: string;
    topic: string | null;
    duration: number;
    startTime: string;
    focusScore: number;
  }>;
  subjectStats: Array<{
    subject: string;
    duration: number;
    focusScore: number;
  }>;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function Dashboard() {
  const [stats, setStats] = useState<TodayStats | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  
  const {
    time,
    isRunning,
    subject,
    topic,
    showFocusCheck,
    pomodoroLength,
    breakLength,
    checkInterval,
    isBreak,
    setSubject,
    setTopic,
    setPomodoroLength,
    setBreakLength,
    setCheckInterval,
    handleStart,
    handlePause,
    handleStop,
    handleFocusResponse,
    formatTime,
    progress,
  } = useTimer();

  useEffect(() => {
    fetchData();
    // Listen for session-saved event to refresh data
    const handleSessionSaved = () => fetchData();
    window.addEventListener('session-saved', handleSessionSaved);
    return () => window.removeEventListener('session-saved', handleSessionSaved);
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        fetch('/api/stats/today?userId=temp-user'),
        fetch('/api/tasks?userId=temp-user&completed=false'),
      ]);

      const statsData = await statsRes.json();
      const tasksData = await tasksRes.json();

      setStats(statsData);
      setTasks(tasksData.slice(0, 3));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  const toggleTask = async (taskId: string, completed: boolean) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });
      fetchData();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
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
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium"
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
              className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors"
            >
              Analytics
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Track your study progress and stats</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">⏱️</span>
              <span className="text-3xl font-bold text-blue-600">{formatDuration(stats?.totalTime || 0)}</span>
            </div>
            <p className="text-sm font-medium text-slate-600">Total Study Time</p>
            <p className="text-xs text-slate-500 mt-1">This week</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">📚</span>
              <span className="text-3xl font-bold text-green-600">{stats?.sessionsCount || 0}</span>
            </div>
            <p className="text-sm font-medium text-slate-600">Study Sessions</p>
            <p className="text-xs text-slate-500 mt-1">Completed</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🎯</span>
              <span className="text-3xl font-bold text-purple-600">{stats?.avgFocusScore || 0}%</span>
            </div>
            <p className="text-sm font-medium text-slate-600">Focus Score</p>
            <p className="text-xs text-slate-500 mt-1">Average</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🔥</span>
              <span className="text-3xl font-bold text-orange-600">{stats?.streak || 0}</span>
            </div>
            <p className="text-sm font-medium text-slate-600">Day Streak</p>
            <p className="text-xs text-slate-500 mt-1">Keep it going!</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Timer Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                {isBreak ? '☕ Break Time' : '📚 Study Timer'}
              </h2>
              
              {/* Timer Display */}
              <div className="text-center mb-8">
                <div className={`inline-block ${isBreak ? 'bg-green-600' : 'bg-slate-900'} text-white rounded-2xl px-16 py-12 mb-6`}>
                  <div className="text-6xl font-mono font-bold tracking-wider">
                    {formatTime(time)}
                  </div>
                  {isRunning && (
                    <div className="text-sm mt-2 opacity-75">
                      {isBreak ? 'Take a break!' : `Studying ${subject}`}
                    </div>
                  )}
                </div>
                
                <div className="w-full max-w-md mx-auto bg-slate-200 rounded-full h-2 mb-4">
                  <div 
                    className={`${isBreak ? 'bg-green-600' : 'bg-blue-600'} h-2 rounded-full transition-all`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    What are you studying? *
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={isRunning}
                    placeholder="e.g., Mathematics, Physics..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 disabled:bg-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Topic (optional)
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    disabled={isRunning}
                    placeholder="e.g., Calculus, Quantum Mechanics..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 disabled:bg-slate-100"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                {!isRunning ? (
                  <button 
                    onClick={handleStart}
                    className="flex-1 bg-green-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Start Session
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={handlePause}
                      className="flex-1 bg-yellow-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                    >
                      Pause
                    </button>
                    <button 
                      onClick={handleStop}
                      className="flex-1 bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Stop & Save
                    </button>
                  </>
                )}
              </div>

              {/* Timer Settings */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Timer Settings</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Study (min)</label>
                    <input
                      type="number"
                      value={pomodoroLength}
                      onChange={(e) => setPomodoroLength(parseInt(e.target.value))}
                      disabled={isRunning}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 disabled:bg-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Break (min)</label>
                    <input
                      type="number"
                      value={breakLength}
                      onChange={(e) => setBreakLength(parseInt(e.target.value))}
                      disabled={isRunning}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 disabled:bg-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Focus Check (min)</label>
                    <input
                      type="number"
                      value={checkInterval}
                      onChange={(e) => setCheckInterval(parseInt(e.target.value))}
                      disabled={isRunning}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 disabled:bg-slate-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Activity */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Today's Activity</h2>
              
              {stats?.sessions && stats.sessions.length > 0 ? (
                <div className="space-y-3">
                  {stats.sessions.map((session, index) => {
                    const colors = ['blue', 'green', 'purple', 'orange'];
                    const color = colors[index % colors.length];
                    return (
                      <div key={session.id} className={`p-3 bg-${color}-50 rounded-lg border border-${color}-100`}>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-slate-900 text-sm">{session.subject}</span>
                          <span className={`text-sm font-semibold text-${color}-600`}>{formatDuration(session.duration)}</span>
                        </div>
                        {session.topic && <p className="text-xs text-slate-600">{session.topic}</p>}
                        <div className="mt-2 flex items-center gap-1">
                          <span className="text-xs text-green-600 font-medium">{session.focusScore}% focus</span>
                          <span className="text-xs text-slate-400">• {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-slate-500 text-center py-8">No sessions today yet</p>
              )}

              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total today:</span>
                  <span className="font-semibold text-slate-900">{formatDuration(stats?.totalTime || 0)}</span>
                </div>
              </div>
            </div>

            {/* Quick Tasks */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Quick Tasks</h2>
                <Link href="/tasks" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all →
                </Link>
              </div>
              
              {tasks.length > 0 ? (
                <div className="space-y-2">
                  {tasks.map(task => (
                    <label key={task.id} className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={task.completed}
                        onChange={(e) => toggleTask(task.id, e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 rounded" 
                      />
                      <span className={`text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                        {task.title}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">No active tasks</p>
              )}

              <Link
                href="/tasks"
                className="mt-4 block text-center px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Add Task
              </Link>
            </div>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="mt-6 bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Study Time by Subject</h2>
          
          {stats?.subjectStats && stats.subjectStats.length > 0 ? (
            <div className="space-y-4">
              {stats.subjectStats.map((subject, index) => {
                const colors = ['blue', 'green', 'purple', 'orange', 'pink'];
                const color = colors[index % colors.length];
                const maxDuration = Math.max(...stats.subjectStats.map(s => s.duration));
                const widthPercent = (subject.duration / maxDuration) * 100;
                
                return (
                  <div key={subject.subject}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-slate-900">{subject.subject}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-green-600 font-medium">{subject.focusScore}% focus</span>
                        <span className="text-sm text-slate-600">{formatDuration(subject.duration)}</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className={`bg-${color}-600 h-2 rounded-full transition-all`}
                        style={{ width: `${widthPercent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-8">No subject data available yet</p>
          )}
        </div>
      </div>

      {/* Focus Check Modal */}
      {showFocusCheck && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Focus Check! 🎯</h3>
            <p className="text-slate-600 mb-6">Were you focused during the last {checkInterval} minutes?</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleFocusResponse(true)}
                className="flex-1 bg-green-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                ✅ Yes, I was focused
              </button>
              <button
                onClick={() => handleFocusResponse(false)}
                className="flex-1 bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                ❌ No, I was distracted
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}