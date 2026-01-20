"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TrendingUp, Clock, Target, Award, Calendar } from "lucide-react";

export default function Progress() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-header", {
        opacity: 0,
        y: -20,
        duration: 0.6,
      });

      gsap.from(".stat-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
      });

      gsap.from(".chart-card", {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        delay: 0.4,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.0 },
    { day: 'Fri', hours: 2.7 },
    { day: 'Sat', hours: 3.5 },
    { day: 'Sun', hours: 2.8 },
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  const subjectBreakdown = [
    { name: 'Web Development', hours: 12.5, color: '#8B5CF6', percentage: 35 },
    { name: 'Data Structures', hours: 10.2, color: '#3B82F6', percentage: 28 },
    { name: 'Machine Learning', hours: 8.3, color: '#EC4899', percentage: 23 },
    { name: 'Database Systems', hours: 5.0, color: '#10B981', percentage: 14 },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="page-header mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Progress & Analytics
          </h1>
          <p className="text-gray-400">Track your study performance and achievements</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="stat-card p-6 bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-xs text-green-400">+12%</span>
            </div>
            <div className="text-3xl font-bold mb-1">36.5h</div>
            <div className="text-sm text-gray-400">Total Hours</div>
          </div>

          <div className="stat-card p-6 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-xs text-green-400">+8%</span>
            </div>
            <div className="text-3xl font-bold mb-1">2.8h</div>
            <div className="text-sm text-gray-400">Daily Average</div>
          </div>

          <div className="stat-card p-6 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-xs text-green-400">85%</span>
            </div>
            <div className="text-3xl font-bold mb-1">23/27</div>
            <div className="text-sm text-gray-400">Topics Done</div>
          </div>

          <div className="stat-card p-6 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <Award className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-xs text-orange-400">🔥</span>
            </div>
            <div className="text-3xl font-bold mb-1">7 Days</div>
            <div className="text-sm text-gray-400">Current Streak</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Weekly Chart */}
          <div className="chart-card lg:col-span-2 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Weekly Overview</h2>
              <Calendar className="w-5 h-5 text-purple-400" />
            </div>

            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="flex items-center gap-4">
                  <div className="w-12 text-sm text-gray-400">{day.day}</div>
                  <div className="flex-1 bg-white/5 rounded-full h-8 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-end pr-3 transition-all duration-1000"
                      style={{ 
                        width: `${(day.hours / maxHours) * 100}%`,
                        transitionDelay: `${index * 100}ms`
                      }}
                    >
                      <span className="text-xs font-medium">{day.hours}h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex justify-between text-sm">
              <div>
                <div className="text-gray-400">Total This Week</div>
                <div className="text-2xl font-bold text-purple-400">
                  {weeklyData.reduce((acc, d) => acc + d.hours, 0).toFixed(1)}h
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-400">vs Last Week</div>
                <div className="text-2xl font-bold text-green-400">+12%</div>
              </div>
            </div>
          </div>

          {/* Subject Breakdown */}
          <div className="chart-card p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-6">By Subject</h2>
            
            <div className="space-y-4">
              {subjectBreakdown.map((subject, index) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{subject.name}</span>
                    <span className="font-medium">{subject.hours}h</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${subject.percentage}%`,
                        backgroundColor: subject.color,
                        transitionDelay: `${index * 150}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-sm text-gray-400 mb-2">Most Studied</div>
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${subjectBreakdown[0].color}20` }}
                >
                  <span style={{ color: subjectBreakdown[0].color }}>📚</span>
                </div>
                <div>
                  <div className="font-semibold">{subjectBreakdown[0].name}</div>
                  <div className="text-sm text-gray-400">{subjectBreakdown[0].hours} hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="chart-card mt-6 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-6">Recent Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl text-center">
              <div className="text-4xl mb-2">🏆</div>
              <div className="font-semibold mb-1">7 Day Streak</div>
              <div className="text-xs text-gray-400">Keep it up!</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl text-center">
              <div className="text-4xl mb-2">⭐</div>
              <div className="font-semibold mb-1">100 Hours</div>
              <div className="text-xs text-gray-400">Total study time</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-xl text-center">
              <div className="text-4xl mb-2">🎯</div>
              <div className="font-semibold mb-1">25 Topics</div>
              <div className="text-xs text-gray-400">Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}