import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  remainingTime: number;
  timerId: NodeJS.Timeout | null;
  createdAt: number;
}

interface ToastContextType {
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  pauseToast: (id: string) => void;
  resumeToast: (id: string) => void;
  toasts: Toast[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastsRef = useRef<Toast[]>([]);
  toastsRef.current = toasts;

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) => {
      const toastToClear = currentToasts.find(t => t.id === id);
      if (toastToClear?.timerId) {
        clearTimeout(toastToClear.timerId);
      }
      return currentToasts.filter((t) => t.id !== id);
    });
  }, []);

  const startToastTimer = useCallback((id: string, duration: number) => {
    const timerId = setTimeout(() => {
      removeToast(id);
    }, duration);

    setToasts((currentToasts) =>
      currentToasts.map((t) => (t.id === id ? { ...t, timerId, createdAt: Date.now(), remainingTime: duration } : t))
    );
  }, [removeToast]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = {
      id,
      message,
      type,
      remainingTime: 10000, // 10 seconds default window duration
      timerId: null,
      createdAt: Date.now()
    };

    setToasts((current) => [...current, newToast]);
    startToastTimer(id, 10000);
  }, [startToastTimer]);

  const pauseToast = useCallback((id: string) => {
    const target = toastsRef.current.find((t) => t.id === id);
    if (!target || !target.timerId) return;

    clearTimeout(target.timerId);
    const elapsed = Date.now() - target.createdAt;
    const newRemaining = Math.max(0, target.remainingTime - elapsed);

    setToasts((current) =>
      current.map((t) => (t.id === id ? { ...t, timerId: null, remainingTime: newRemaining } : t))
    );
  }, []);

  const resumeToast = useCallback((id: string) => {
    const target = toastsRef.current.find((t) => t.id === id);
    if (!target || target.timerId || target.remainingTime <= 0) return;
    
    startToastTimer(id, target.remainingTime);
  }, [startToastTimer]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast, pauseToast, resumeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};