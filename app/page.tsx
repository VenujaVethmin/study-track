"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { BookOpen, Brain, TrendingUp, Zap } from "lucide-react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-buttons", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.6,
        stagger: 0.15,
      });

      gsap.from(".feature-card", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Hero Section */}
      <div ref={heroRef} className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <div className="hero-text mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              AI-Powered Study Planner
            </div>
          </div>

          <h1 className="hero-text text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Master Your Studies
          </h1>

          <p className="hero-text text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mb-12">
            Track progress, build streaks, and achieve your academic goals with
            intelligent study planning
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard"
              className="hero-buttons px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/dashboard"
              className="hero-buttons px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              View Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white">
          Everything You Need to Excel
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="feature-card p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
              Subject Management
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Organize subjects and topics with visual progress tracking
            </p>
          </div>

          <div className="feature-card p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
              Smart Planner
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Daily and weekly study plans tailored to your goals
            </p>
          </div>

          <div className="feature-card p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
              Progress Analytics
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Visualize your study hours and topic completion
            </p>
          </div>

          <div className="feature-card p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
              Study Streaks
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Build consistency with daily study streak tracking
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
