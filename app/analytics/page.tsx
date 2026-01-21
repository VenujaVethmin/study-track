'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('week');

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
            <div className="text-3xl font-bold text-slate-900 mb-1">42.5h</div>
            <p className="text-sm text-slate-600">Total Study Time</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🎯</span>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+5%</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">86%</div>
            <p className="text-sm text-slate-600">Average Focus Score</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">⚡</span>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Same</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">24</div>
            <p className="text-sm text-slate-600">Study Sessions</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🔥</span>
              <span className="text-sm font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">Record!</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">14</div>
            <p className="text-sm text-slate-600">Day Streak</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Study Time Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Study Time Over Time</h2>
            
            {/* Bar Chart Visualization */}
            <div className="space-y-4">
              <div className="flex items-end gap-2 h-48">
                <div className="flex-1 flex flex-col justify-end">
                  <div className="bg-blue-200 rounded-t" style={{ height: '60%' }}></div>
                  <span className="text-xs text-slate-600 mt-2 text-center">Mon</span>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <div className="bg-blue-300 rounded-t" style={{ height: '75%' }}></div>
                  <span className="text-xs text-slate-600 mt-2 text-center">Tue</span>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <div className="bg-blue-400 rounded-t" style={{ height: '90%' }}></div>
                  <span className="text-xs text-slate-600 mt-2 text-center">Wed</span>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <div className="bg-blue-500 rounded-t" style={{ height: '85%' }}></div>
                  <span className="text-xs text-slate-600 mt-2 text-center">Thu</span>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <div className="bg-blue-600 rounded-t" style={{ height: '100%' }}></div>
                  <span className="text-xs text-slate-600 mt-2 text-center">Fri</span>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <div className="bg-blue-400 rounded-t" style={{ height: '70%' }}></div>
                  <span className="text-xs text-slate-600 mt-2 text-center">Sat</span>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <div className="bg-blue-300 rounded-t" style={{ height: '45%' }}></div>
                  <span className="text-xs text-slate-600 mt-2 text-center">Sun</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div>
                <div className="text-2xl font-bold text-slate-900">8.2h</div>
                <p className="text-xs text-slate-600">Daily Average</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">12.5h</div>
                <p className="text-xs text-slate-600">Best Day (Fri)</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">5.1h</div>
                <p className="text-xs text-slate-600">Lowest Day (Sun)</p>
              </div>
            </div>
          </div>

          {/* Subject Distribution */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Top Subjects</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-slate-900">Mathematics</span>
                  <span className="text-sm text-slate-600">15.2h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-slate-900">Physics</span>
                  <span className="text-sm text-slate-600">12.8h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-slate-900">Chemistry</span>
                  <span className="text-sm text-slate-600">8.5h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-slate-900">History</span>
                  <span className="text-sm text-slate-600">6.0h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="text-sm text-slate-600 mb-2">Total Subjects Studied</div>
              <div className="text-2xl font-bold text-slate-900">7</div>
            </div>
          </div>
        </div>

        {/* Focus Score Trends */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Focus Score Trends</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-slate-900">Focused Sessions</span>
                    <span className="text-sm font-semibold text-green-600">78%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-slate-900">Partially Focused</span>
                    <span className="text-sm font-semibold text-yellow-600">15%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">❌</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-slate-900">Lost Focus</span>
                    <span className="text-sm font-semibold text-red-600">7%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '7%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-slate-700">
                <span className="font-semibold text-blue-600">Great progress!</span> Your focus score improved by 12% this week.
              </p>
            </div>
          </div>

          {/* Best Study Times */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Best Study Times</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <div className="font-semibold text-slate-900">Morning (6 AM - 12 PM)</div>
                  <p className="text-sm text-slate-600">Most productive time</p>
                </div>
                <div className="text-2xl font-bold text-green-600">92%</div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <div className="font-semibold text-slate-900">Afternoon (12 PM - 6 PM)</div>
                  <p className="text-sm text-slate-600">Good focus level</p>
                </div>
                <div className="text-2xl font-bold text-blue-600">84%</div>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <div className="font-semibold text-slate-900">Evening (6 PM - 12 AM)</div>
                  <p className="text-sm text-slate-600">Lower focus</p>
                </div>
                <div className="text-2xl font-bold text-yellow-600">68%</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Recommendation</p>
                  <p className="text-sm text-slate-600">
                    Schedule important tasks during morning hours when your focus is at its peak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Recent Achievements 🏆</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 text-center">
              <div className="text-4xl mb-2">🔥</div>
              <div className="font-semibold text-slate-900 mb-1">14 Day Streak</div>
              <p className="text-xs text-slate-600">Keep it up!</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 text-center">
              <div className="text-4xl mb-2">⏱️</div>
              <div className="font-semibold text-slate-900 mb-1">50 Hours</div>
              <p className="text-xs text-slate-600">Total study time</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 text-center">
              <div className="text-4xl mb-2">🎯</div>
              <div className="font-semibold text-slate-900 mb-1">90% Focus</div>
              <p className="text-xs text-slate-600">Best session</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 text-center">
              <div className="text-4xl mb-2">📚</div>
              <div className="font-semibold text-slate-900 mb-1">7 Subjects</div>
              <p className="text-xs text-slate-600">Mastered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}