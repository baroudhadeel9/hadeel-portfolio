'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught error:', error, errorInfo);
    }
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 rounded-2xl border border-rose-200 bg-rose-50/70 text-slate-800 text-center space-y-3 my-4">
          <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-2xs">
            <AlertCircle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 font-tajawal">
              {this.props.fallbackTitle || 'حدث خطأ مؤقت في هذا المكون / Temporary Component Error'}
            </h4>
            <p className="text-xs text-slate-600 font-ibm max-w-sm mx-auto leading-relaxed">
              {this.props.fallbackMessage || 'يمكنك الضغط أدناه لإعادة تشغيل هذا الجزء دون مغادرة الصفحة.'}
            </p>
          </div>
          <button
            type="button"
            onClick={this.handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-rose-300 text-rose-800 hover:bg-rose-100 text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>إعادة المحاولة · Retry</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
