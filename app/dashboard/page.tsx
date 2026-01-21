import Link from 'next/link';

export default function Dashboard() {
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
              <span className="text-3xl font-bold text-blue-600">5h 32m</span>
            </div>
            <p className="text-sm font-medium text-slate-600">Total Study Time</p>
            <p className="text-xs text-slate-500 mt-1">This week</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">📚</span>
              <span className="text-3xl font-bold text-green-600">12</span>
            </div>
            <p className="text-sm font-medium text-slate-600">Study Sessions</p>
            <p className="text-xs text-slate-500 mt-1">Completed</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🎯</span>
              <span className="text-3xl font-bold text-purple-600">87%</span>
            </div>
            <p className="text-sm font-medium text-slate-600">Focus Score</p>
            <p className="text-xs text-slate-500 mt-1">Average</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🔥</span>
              <span className="text-3xl font-bold text-orange-600">7</span>
            </div>
            <p className="text-sm font-medium text-slate-600">Day Streak</p>
            <p className="text-xs text-slate-500 mt-1">Keep it going!</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Timer Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Study Timer</h2>
              
              {/* Timer Display */}
              <div className="text-center mb-8">
                <div className="inline-block bg-slate-900 text-white rounded-2xl px-16 py-12 mb-6">
                  <div className="text-6xl font-mono font-bold tracking-wider">
                    00:00:00
                  </div>
                </div>
                
                <div className="w-full max-w-md mx-auto bg-slate-200 rounded-full h-2 mb-4">
                  <div className="bg-blue-600 h-2 rounded-full w-0 transition-all"></div>
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
                    placeholder="e.g., Mathematics, Physics..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Topic (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Calculus, Quantum Mechanics..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-green-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Start Session
                </button>
                <button className="flex-1 bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors opacity-50 cursor-not-allowed" disabled>
                  Stop & Save
                </button>
              </div>

              {/* Timer Settings */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Timer Settings</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Study (min)</label>
                    <input
                      type="number"
                      defaultValue={25}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Break (min)</label>
                    <input
                      type="number"
                      defaultValue={5}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Focus Check (min)</label>
                    <input
                      type="number"
                      defaultValue={15}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
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
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-slate-900 text-sm">Mathematics</span>
                    <span className="text-sm font-semibold text-blue-600">45m</span>
                  </div>
                  <p className="text-xs text-slate-600">Calculus</p>
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-xs text-green-600 font-medium">92% focus</span>
                    <span className="text-xs text-slate-400">• 10:30 AM</span>
                  </div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-slate-900 text-sm">Physics</span>
                    <span className="text-sm font-semibold text-green-600">30m</span>
                  </div>
                  <p className="text-xs text-slate-600">Quantum Mechanics</p>
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-xs text-green-600 font-medium">88% focus</span>
                    <span className="text-xs text-slate-400">• 2:15 PM</span>
                  </div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-slate-900 text-sm">Chemistry</span>
                    <span className="text-sm font-semibold text-purple-600">25m</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-xs text-green-600 font-medium">95% focus</span>
                    <span className="text-xs text-slate-400">• 4:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total today:</span>
                  <span className="font-semibold text-slate-900">1h 40m</span>
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
              
              <div className="space-y-2">
                <label className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input type="checkbox" className="mt-1 h-4 w-4 text-blue-600 rounded" />
                  <span className="text-sm text-slate-700">Finish calculus homework</span>
                </label>
                <label className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input type="checkbox" className="mt-1 h-4 w-4 text-blue-600 rounded" />
                  <span className="text-sm text-slate-700">Read chapter 5 Physics</span>
                </label>
                <label className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 text-blue-600 rounded" />
                  <span className="text-sm text-slate-400 line-through">Review notes</span>
                </label>
              </div>

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
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-slate-900">Mathematics</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-green-600 font-medium">85% focus</span>
                  <span className="text-sm text-slate-600">2h 15m</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-slate-900">Physics</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-green-600 font-medium">90% focus</span>
                  <span className="text-sm text-slate-600">1h 45m</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-slate-900">Chemistry</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-green-600 font-medium">92% focus</span>
                  <span className="text-sm text-slate-600">1h 32m</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}