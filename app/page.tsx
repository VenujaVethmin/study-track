import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simple Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-bold text-slate-900">StudyTracker</span>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Open App
          </Link>
        </div>
      </header>

      {/* Hero Section - Simple & Casual */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Track Your Study Time ⏱️
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            A simple tool I built to help track study sessions, stay focused, and see how much time you actually spend studying.
          </p>

          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Try it out →
          </Link>
          
          <p className="mt-4 text-sm text-slate-500">
            No signup needed • Free to use • Built with Next.js
          </p>
        </div>
      </section>

      {/* What it does - Simple cards */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            What it does
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="text-4xl mb-3">⏰</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Pomodoro Timer
              </h3>
              <p className="text-slate-600">
                Study for 25 minutes, take a 5-minute break. The classic technique that actually works.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="text-4xl mb-3">🔔</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Focus Checks
              </h3>
              <p className="text-slate-600">
                Get random alerts asking "are you still focused?" Helps you stay honest about your study time.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Simple Dashboard
              </h3>
              <p className="text-slate-600">
                See your total study time, which subjects you focus on, and your focus score over time.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="text-4xl mb-3">✓</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Task List
              </h3>
              <p className="text-slate-600">
                Basic to-do list to keep track of what you need to study. Nothing fancy, just works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why I built this - Personal touch */}
      <section className="py-16 px-4 bg-white border-y border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Why I built this
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              I was frustrated with how I couldn't track my actual study time. I'd sit down to study for 2 hours but constantly get distracted by my phone, YouTube, or just spacing out.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              So I made this to keep myself accountable. The focus checks are annoying on purpose - they force you to admit when you're not actually studying.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              It's been really helpful for me, so I'm sharing it in case others find it useful too. 🤷‍♂️
            </p>
          </div>
        </div>
      </section>

      {/* How to use - Simple steps */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            How to use it
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Start a session
                </h3>
                <p className="text-slate-600">
                  Enter what you're studying and hit start. Timer begins.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Answer focus checks
                </h3>
                <p className="text-slate-600">
                  Every 15 minutes (you can change this), you'll get an alert. Click if you're focused or not.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Check your stats
                </h3>
                <p className="text-slate-600">
                  See how much you actually studied vs how much time you thought you studied.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack - For fellow devs */}
      <section className="py-16 px-4 bg-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Built with
          </h2>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-4 py-2 bg-white rounded-lg text-slate-700 border border-slate-200">Next.js 15</span>
            <span className="px-4 py-2 bg-white rounded-lg text-slate-700 border border-slate-200">TypeScript</span>
            <span className="px-4 py-2 bg-white rounded-lg text-slate-700 border border-slate-200">Tailwind CSS</span>
            <span className="px-4 py-2 bg-white rounded-lg text-slate-700 border border-slate-200">Prisma</span>
            <span className="px-4 py-2 bg-white rounded-lg text-slate-700 border border-slate-200">SQLite</span>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Give it a try
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            It's completely free. No accounts, no tracking, just a simple tool to help you study better.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Start Tracking →
          </Link>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-slate-200 py-8 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center text-slate-600">
          <p className="mb-2">Made with ☕ as a learning project</p>
          <p className="text-sm text-slate-500">
            StudyTracker • 2026 • Open source on GitHub
          </p>
        </div>
      </footer>
    </div>
  );
}