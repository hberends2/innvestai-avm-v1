import React from 'react';
import ErrorBoundary from './ErrorBoundary';

interface PageErrorBoundaryProps {
  children: React.ReactNode;
  pageName?: string;
}

/**
 * Page-specific error boundary wrapper
 * Provides contextual error handling for individual pages
 */
export const PageErrorBoundary: React.FC<PageErrorBoundaryProps> = ({ 
  children, 
  pageName = 'page' 
}) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log page-specific error information
    console.error(`Error in ${pageName}:`, {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    // In a real application, you would send this to your error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  };

  return (
    <ErrorBoundary onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};

interface SectionErrorBoundaryProps {
  children: React.ReactNode;
  sectionName: string;
  fallback?: React.ReactNode;
}

/**
 * Section-specific error boundary for smaller UI sections
 * Allows the rest of the page to continue working if one section fails
 */
export const SectionErrorBoundary: React.FC<SectionErrorBoundaryProps> = ({ 
  children, 
  sectionName, 
  fallback 
}) => {
  const defaultFallback = (
    <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
      <p className="text-sm text-destructive">
        Failed to load {sectionName}. Please try refreshing the page.
      </p>
    </div>
  );

  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error(`Error in ${sectionName} section:`, {
      error: error.message,
      section: sectionName,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <ErrorBoundary 
      onError={handleError} 
      fallback={fallback || defaultFallback}
    >
      {children}
    </ErrorBoundary>
  );
};