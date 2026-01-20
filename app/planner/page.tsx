"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Calendar, Clock, Plus, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Planner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([
    { id: 1, title: "Review React Hooks", subject: "Web Development", duration: 60, completed: true, time: "09:00" },
    { id: 2, title: "Practice DSA Problems", subject: "Data Structures", duration: 90, completed: false, time: "14:00" },
    { id: 3, title: "Read ML Chapter 5", subject: "Machine Learning", duration: 45, completed: false, time: "16:30" },
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-header", {
        opacity: 0,
        y: -20,
        duration: 0.6,
      });

      gsap.from(".calendar-section", {
        opacity: 0,
        x: -30,
        duration: 0.6,
        delay: 0.2,
      });

      gsap.from(".task-item", {
        opacity: 0,
        x: 30,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="page-header flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Study Planner
            </h1>
            <p className="text-gray-400">Plan and track your daily study sessions</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0">
            <Plus className="w-5 h-5 mr-2" />
            Add Session
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="calendar-section lg:col-span-1">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Calendar</h2>
                <Calendar className="w-5 h-5 text-purple-400" />
              </div>
              
              {/* Mini Calendar */}
              <div className="space-y-2">
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day} className="py-2">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 2;
                    const isToday = day === 15;
                    const hasSession = [10, 12, 15, 18, 20].includes(day);
                    
                    return (
                      <button
                        key={i}
                        className={`
                          aspect-square p-2 rounded-lg text-sm transition-all
                          ${isToday ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white font-bold' : ''}
                          ${hasSession && !isToday ? 'bg-purple-500/20 text-purple-300' : ''}
                          ${!isToday && !hasSession ? 'hover:bg-white/5 text-gray-400' : ''}
                        `}
                      >
                        {day > 0 && day <= 31 ? day : ''}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total Sessions</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Hours Planned</span>
                  <span className="font-semibold">32.5h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Completion Rate</span>
                  <span className="font-semibold text-green-400">85%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Today's Sessions</h2>
                <div className="text-sm text-gray-400">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="task-item group p-4 bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-xl hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="mt-1"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-green-400" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
                        )}
                      </button>
                      
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded">
                            {task.subject}
                          </span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {task.duration} min
                          </div>
                          <span>{task.time}</span>
                        </div>
                      </div>

                      <div className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${task.completed ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}
                      `}>
                        {task.completed ? 'Completed' : 'Pending'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{tasks.length}</div>
                  <div className="text-sm text-gray-400">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {tasks.filter(t => t.completed).length}
                  </div>
                  <div className="text-sm text-gray-400">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {tasks.reduce((acc, t) => acc + t.duration, 0)} min
                  </div>
                  <div className="text-sm text-gray-400">Total Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}