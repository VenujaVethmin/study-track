'use client';

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface FocusCheck {
  time: number;
  wasFocused: boolean | null;
}

interface TimerState {
  time: number;
  subject: string;
  topic: string;
  startTime: string;
  isBreak: boolean;
  focusChecks: FocusCheck[];
  lastCheckTime: number;
  pomodoroLength: number;
  breakLength: number;
  checkInterval: number;
}

interface TimerContextType {
  time: number;
  isRunning: boolean;
  subject: string;
  topic: string;
  focusChecks: FocusCheck[];
  showFocusCheck: boolean;
  pomodoroLength: number;
  breakLength: number;
  checkInterval: number;
  isBreak: boolean;
  setSubject: (subject: string) => void;
  setTopic: (topic: string) => void;
  setPomodoroLength: (length: number) => void;
  setBreakLength: (length: number) => void;
  setCheckInterval: (interval: number) => void;
  handleStart: () => void;
  handlePause: () => void;
  handleStop: () => Promise<void>;
  handleFocusResponse: (focused: boolean) => void;
  formatTime: (seconds: number) => string;
  progress: number;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [focusChecks, setFocusChecks] = useState<FocusCheck[]>([]);
  const [showFocusCheck, setShowFocusCheck] = useState(false);
  const [pomodoroLength, setPomodoroLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [checkInterval, setCheckInterval] = useState(15);
  const [isBreak, setIsBreak] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date | null>(null);
  const lastCheckRef = useRef<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isSavingRef = useRef(false);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGmi96+yqZRsHO5Tp7qthGggrhc7y1oY1CAw');

      const savedState = localStorage.getItem('timerState');
      if (savedState) {
        try {
          const state: TimerState = JSON.parse(savedState);
          setTime(state.time);
          setSubject(state.subject);
          setTopic(state.topic);
          setIsBreak(state.isBreak);
          setFocusChecks(state.focusChecks);
          setPomodoroLength(state.pomodoroLength);
          setBreakLength(state.breakLength);
          setCheckInterval(state.checkInterval);
          lastCheckRef.current = state.lastCheckTime;
          if (state.startTime) {
            startTimeRef.current = new Date(state.startTime);
            setIsRunning(true);
          }
        } catch (error) {
          console.error('Error loading timer state:', error);
        }
      }

      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && startTimeRef.current) {
      const state: TimerState = {
        time,
        subject,
        topic,
        startTime: startTimeRef.current.toISOString(),
        isBreak,
        focusChecks,
        lastCheckTime: lastCheckRef.current,
        pomodoroLength,
        breakLength,
        checkInterval,
      };
      localStorage.setItem('timerState', JSON.stringify(state));
    }
  }, [time, subject, topic, isBreak, focusChecks, pomodoroLength, breakLength, checkInterval]);

  // Save session function
  const saveSession = async () => {
    if (isSavingRef.current || !startTimeRef.current || time === 0 || isBreak) return false;

    isSavingRef.current = true;
    const endTime = new Date();
    const focusScore = focusChecks.length > 0
      ? (focusChecks.filter(c => c.wasFocused === true).length / focusChecks.length) * 100
      : 0;

    try {
      const response = await fetch('/api/study-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          topic: topic || null,
          duration: time,
          startTime: startTimeRef.current.toISOString(),
          endTime: endTime.toISOString(),
          focusScore: Math.round(focusScore),
          focusChecks: focusChecks.length,
        }),
      });

      if (response.ok) {
        localStorage.removeItem('timerState');
        window.dispatchEvent(new Event('session-saved'));
        return true;
      }
    } catch (error) {
      console.error('Error saving session:', error);
    } finally {
      isSavingRef.current = false;
    }
    return false;
  };

  // Save session when page unloads or visibility changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (time > 0 && startTimeRef.current && !isBreak && !isSavingRef.current) {
        // Use sendBeacon for reliable save on page close
        const focusScore = focusChecks.length > 0
          ? (focusChecks.filter(c => c.wasFocused === true).length / focusChecks.length) * 100
          : 0;

        const data = JSON.stringify({
          subject,
          topic: topic || null,
          duration: time,
          startTime: startTimeRef.current.toISOString(),
          endTime: new Date().toISOString(),
          focusScore: Math.round(focusScore),
          focusChecks: focusChecks.length,
        });

        navigator.sendBeacon('/api/study-sessions', data);
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handleVisibilityChange = async () => {
      if (document.hidden && time > 0 && startTimeRef.current && !isBreak && isRunning) {
        await saveSession();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [time, isBreak, subject, topic, focusChecks, isRunning]);

  // Timer interval
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => {
          const newTime = prev + 1;

          if (!isBreak && newTime - lastCheckRef.current >= checkInterval * 60) {
            lastCheckRef.current = newTime;
            triggerFocusCheck(newTime);
          }

          const targetTime = isBreak ? breakLength * 60 : pomodoroLength * 60;
          if (newTime >= targetTime) {
            completeCycle();
          }

          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isBreak, pomodoroLength, breakLength, checkInterval]);

  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('StudyTracker Focus Check', {
        body: isBreak ? 'Break time is over!' : 'Are you still focused?',
        icon: '/icon.png',
      });
    }
  };

  const triggerFocusCheck = (currentTime: number) => {
    playAlarm();
    setShowFocusCheck(true);
    setFocusChecks(prev => [...prev, { time: currentTime, wasFocused: null }]);
  };

  const completeCycle = () => {
    playAlarm();
    setIsRunning(false);

    if (isBreak) {
      setIsBreak(false);
      setTime(0);
      lastCheckRef.current = 0;
    } else {
      saveSession();
      setIsBreak(true);
      setTime(0);
    }
  };

  const handleFocusResponse = async (focused: boolean) => {
    setFocusChecks(prev =>
      prev.map((check, idx) =>
        idx === prev.length - 1 ? { ...check, wasFocused: focused } : check
      )
    );
    setShowFocusCheck(false);

    try {
      await fetch('/api/focus-checks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          focused,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Error logging focus check:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = async () => {
    if (!subject.trim()) {
      alert('Please enter a subject');
      return;
    }

    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    startTimeRef.current = new Date();
    setIsRunning(true);
    lastCheckRef.current = 0;
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = async () => {
    setIsRunning(false);

    if (time > 0 && startTimeRef.current && !isBreak) {
      const saved = await saveSession();
      if (saved) {
        const focusScore = focusChecks.length > 0
          ? Math.round((focusChecks.filter(c => c.wasFocused === true).length / focusChecks.length) * 100)
          : 0;
        alert(`Session saved! Focus score: ${focusScore}%`);
        setTime(0);
        setSubject('');
        setTopic('');
        setFocusChecks([]);
        setIsBreak(false);
        startTimeRef.current = null;
        lastCheckRef.current = 0;
        localStorage.removeItem('timerState');
      }
    } else {
      setTime(0);
      setIsBreak(false);
      setFocusChecks([]);
      lastCheckRef.current = 0;
      localStorage.removeItem('timerState');
    }
  };

  const targetTime = isBreak ? breakLength * 60 : pomodoroLength * 60;
  const progress = (time / targetTime) * 100;

  return (
    <TimerContext.Provider
      value={{
        time,
        isRunning,
        subject,
        topic,
        focusChecks,
        showFocusCheck,
        pomodoroLength,
        breakLength,
        checkInterval,
        isBreak,
        setSubject,
        setTopic,
        setPomodoroLength,
        setBreakLength,
        setCheckInterval,
        handleStart,
        handlePause,
        handleStop,
        handleFocusResponse,
        formatTime,
        progress,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}