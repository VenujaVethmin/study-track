"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Plus, BookOpen, Trash2, Edit, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Subjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Web Development", color: "#8B5CF6", topics: 12, completed: 8 },
    { id: 2, name: "Data Structures", color: "#3B82F6", topics: 15, completed: 10 },
    { id: 3, name: "Machine Learning", color: "#EC4899", topics: 20, completed: 5 },
    { id: 4, name: "Database Systems", color: "#10B981", topics: 10, completed: 7 },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-header", {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".subject-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="page-header flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              My Subjects
            </h1>
            <p className="text-gray-400">Manage your study subjects and topics</p>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Subject
          </Button>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="subject-card group p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${subject.color}20` }}
                >
                  <BookOpen className="w-6 h-6" style={{ color: subject.color }} />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">{subject.name}</h3>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{Math.round((subject.completed / subject.topics) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(subject.completed / subject.topics) * 100}%`,
                      background: `linear-gradient(to right, ${subject.color}, ${subject.color}dd)`
                    }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  {subject.completed} of {subject.topics} topics
                </span>
                <div className="flex items-center text-gray-400 group-hover:text-white transition-colors">
                  View
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}

          {/* Add New Card */}
          <div 
            onClick={() => setShowAddModal(true)}
            className="subject-card group p-6 border-2 border-dashed border-white/20 rounded-2xl backdrop-blur-sm hover:border-purple-500/50 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[240px]"
          >
            <div className="p-4 bg-purple-500/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-gray-400 group-hover:text-white transition-colors">
              Add New Subject
            </p>
          </div>
        </div>

        {/* Add Subject Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md p-6 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Add New Subject</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Subject Name</label>
                  <Input 
                    placeholder="e.g., Machine Learning" 
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Color</label>
                  <div className="flex gap-2">
                    {['#8B5CF6', '#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'].map((color) => (
                      <button
                        key={color}
                        className="w-10 h-10 rounded-lg border-2 border-transparent hover:border-white/50 transition-all"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0"
                  >
                    Add Subject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}