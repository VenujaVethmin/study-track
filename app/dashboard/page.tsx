"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BookOpen, Target, Flame, Clock, TrendingUp, Plus, Calendar } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      gsap.from(".quick-action", {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3,
      });

      gsap.from(".activity-item", {
        opacity: 0,
        x: -20,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.6,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = {
    currentStreak: 7,
    weeklyHours: 12.5,
    completedTopics: 23,
    activeSubjects: 5,
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Welcome back 👋
            </span>
          </h1>
          <p className="text-gray-400">Here's your progress overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="stat-card p-6 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl backdrop-blur-sm hover:border-orange-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Flame className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{stats.currentStreak}</div>
                <div className="text-xs text-gray-400">days</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">Current Streak</div>
            <div className="mt-2 h-1 bg-orange-500/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 w-3/4"></div>
            </div>
          </div>

          <div className="stat-card p-6 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-2xl backdrop-blur-sm hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{stats.weeklyHours}</div>
                <div className="text-xs text-gray-400">hours</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">This Week</div>
            <div className="mt-2 text-xs text-blue-400">+2.5h from last week</div>
          </div>

          <div className="stat-card p-6 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl backdrop-blur-sm hover:border-green-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{stats.completedTopics}</div>
                <div className="text-xs text-gray-400">topics</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">Completed</div>
            <div className="mt-2 text-xs text-green-400">This month</div>
          </div>

          <div className="stat-card p-6 bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-2xl backdrop-blur-sm hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{stats.activeSubjects}</div>
                <div className="text-xs text-gray-400">subjects</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">Active</div>
            <div className="mt-2 text-xs text-purple-400">In progress</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/subjects" className="quick-action group">
            <div className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl backdrop-blur-sm hover:border-purple-500/40 transition-all">
              <Brain className="w-10 h-10 mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Subjects</h3>
              <p className="text-sm text-gray-400 mb-4">Manage your study materials</p>
              <div className="flex items-center text-sm text-purple-400 font-medium">
                Open <Plus className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>

          <Link href="/planner" className="quick-action group">
            <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl backdrop-blur-sm hover:border-blue-500/40 transition-all">
              <Target className="w-10 h-10 mb-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Planner</h3>
              <p className="text-sm text-gray-400 mb-4">Schedule study sessions</p>
              <div className="flex items-center text-sm text-blue-400 font-medium">
                Plan <Plus className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>

          <Link href="/progress" className="quick-action group">
            <div className="p-6 bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20 rounded-2xl backdrop-blur-sm hover:border-pink-500/40 transition-all">
              <TrendingUp className="w-10 h-10 mb-4 text-pink-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Progress</h3>
              <p className="text-sm text-gray-400 mb-4">View your analytics</p>
              <div className="flex items-center text-sm text-pink-400 font-medium">
                Analyze <Plus className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-3">
            <div className="activity-item flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="flex-1">
                <p className="font-medium">Completed: React Hooks</p>
                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="activity-item flex items-center gap-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <p className="font-medium">Studied: Database Design</p>
                <p className="text-sm text-gray-400">5 hours ago</p>
              </div>
            </div>
            <div className="activity-item flex items-center gap-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <div className="flex-1">
                <p className="font-medium">Added: Machine Learning</p>
                <p className="text-sm text-gray-400">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}