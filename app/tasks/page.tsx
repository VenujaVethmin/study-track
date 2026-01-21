'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TasksPage() {
  const [showAddForm, setShowAddForm] = useState(false);

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
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium"
            >
              Tasks
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Tasks</h1>
            <p className="text-slate-600">5 active • 3 completed</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {showAddForm ? 'Cancel' : '+ New Task'}
          </button>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl p-6 border border-slate-200 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Create New Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  placeholder="What do you need to do?"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description (optional)
                </label>
                <textarea
                  placeholder="Add more details..."
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Priority
                  </label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Create Task
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
            All (8)
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">
            Active (5)
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">
            Completed (3)
          </button>
        </div>

        {/* Active Tasks */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-slate-900">Active Tasks</h2>

          <div className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <input type="checkbox" className="mt-1 h-5 w-5 text-blue-600 rounded" />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">Complete Calculus Assignment</h3>
                <p className="text-sm text-slate-600 mb-3">Finish problems 1-15 from chapter 5</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">High Priority</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Due: Tomorrow</span>
                </div>
              </div>
              <button className="text-slate-400 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <input type="checkbox" className="mt-1 h-5 w-5 text-blue-600 rounded" />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">Read Physics Chapter 7</h3>
                <p className="text-sm text-slate-600 mb-3">Quantum mechanics introduction</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Medium Priority</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Due: Jan 25</span>
                </div>
              </div>
              <button className="text-slate-400 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <input type="checkbox" className="mt-1 h-5 w-5 text-blue-600 rounded" />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">Prepare for Chemistry Quiz</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">High Priority</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Due: Jan 23</span>
                </div>
              </div>
              <button className="text-slate-400 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <input type="checkbox" className="mt-1 h-5 w-5 text-blue-600 rounded" />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">Write History Essay</h3>
                <p className="text-sm text-slate-600 mb-3">World War II analysis, 2000 words</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Low Priority</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Due: Jan 30</span>
                </div>
              </div>
              <button className="text-slate-400 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <input type="checkbox" className="mt-1 h-5 w-5 text-blue-600 rounded" />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">Review Biology Notes</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Medium Priority</span>
                </div>
              </div>
              <button className="text-slate-400 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Completed</h2>

          <div className="bg-green-50 rounded-xl p-5 border border-green-200">
            <div className="flex items-start gap-4">
              <input type="checkbox" defaultChecked className="mt-1 h-5 w-5 text-green-600 rounded" />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-600 line-through mb-1">Finish Math Homework</h3>
                <p className="text-sm text-slate-500">Completed today at 3:45 PM</p>
              </div>
              <button className="text-slate-400 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-5 border border-green-200">
            <div className="flex items-start gap-4">
              <input type="checkbox" defaultChecked className="mt-1 h-5 w-5 text-green-600 rounded" />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-600 line-through mb-1">Study for English Test</h3>
                <p className="text-sm text-slate-500">Completed yesterday</p>
              </div>
              <button className="text-slate-400 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-5 border border-green-200">
            <div className="flex items-start gap-4">
              <input type="checkbox" defaultChecked className="mt-1 h-5 w-5 text-green-600 rounded" />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-600 line-through mb-1">Review Chemistry Chapter 3</h3>
                <p className="text-sm text-slate-500">Completed 2 days ago</p>
              </div>
              <button className="text-slate-400 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}