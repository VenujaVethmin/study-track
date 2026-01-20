"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BookOpen, Target, Flame, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".quick-action", {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3,
      });
    });

    return () => ctx.revert();
  }, []);

  // Mock data - replace with real data later
  const stats = {
    currentStreak: 7,
    weeklyHours: 12.5,
    completedTopics: 23,
    activeSubjects: 5,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Here's your study progress at a glance
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="stat-card border-l-4 border-l-orange-500 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Current Streak
              </CardTitle>
              <Flame className="w-5 h-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {stats.currentStreak} days
              </div>
              <p className="text-xs text-slate-500 mt-1">Keep it going! 🔥</p>
            </CardContent>
          </Card>

          <Card className="stat-card border-l-4 border-l-blue-500 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Weekly Hours
              </CardTitle>
              <Clock className="w-5 h-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {stats.weeklyHours}h
              </div>
              <p className="text-xs text-slate-500 mt-1">+2.5h from last week</p>
            </CardContent>
          </Card>

          <Card className="stat-card border-l-4 border-l-green-500 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Topics Completed
              </CardTitle>
              <Target className="w-5 h-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {stats.completedTopics}
              </div>
              <p className="text-xs text-slate-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="stat-card border-l-4 border-l-purple-500 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Active Subjects
              </CardTitle>
              <BookOpen className="w-5 h-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {stats.activeSubjects}
              </div>
              <p className="text-xs text-slate-500 mt-1">In progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/subjects">
            <Card className="quick-action bg-gradient-to-br from-indigo-500 to-purple-600 text-white cursor-pointer hover:scale-105 transition-transform">
              <CardContent className="pt-6">
                <Brain className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Manage Subjects</h3>
                <p className="text-indigo-100">Add or update your subjects and topics</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/planner">
            <Card className="quick-action bg-gradient-to-br from-blue-500 to-cyan-600 text-white cursor-pointer hover:scale-105 transition-transform">
              <CardContent className="pt-6">
                <Target className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Study Planner</h3>
                <p className="text-blue-100">Plan your daily and weekly sessions</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/progress">
            <Card className="quick-action bg-gradient-to-br from-pink-500 to-rose-600 text-white cursor-pointer hover:scale-105 transition-transform">
              <CardContent className="pt-6">
                <TrendingUp className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold mb-2">View Progress</h3>
                <p className="text-pink-100">Track your study analytics</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">Completed: React Hooks</p>
                  <p className="text-sm text-slate-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">Studied: Database Design</p>
                  <p className="text-sm text-slate-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">Added: New subject - Machine Learning</p>
                  <p className="text-sm text-slate-500">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}