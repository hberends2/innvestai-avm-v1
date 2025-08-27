/**
 * Modern async operation hook with comprehensive error handling
 * Provides loading states, error management, and retry capabilities
 */

import { useState, useCallback, useRef } from 'react';
import { useToast } from '../use-toast';
import { DataServiceResult, DataServiceError } from '../../services/DataService';

export interface AsyncOperationState<T> {
  data: T | null;
  loading: boolean;
  error: DataServiceError | null;
  lastOperation: string | null;
}

export interface AsyncOperationOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  retryAttempts?: number;
  retryDelay?: number;
}

const DEFAULT_OPTIONS: AsyncOperationOptions = {
  showSuccessToast: true,
  showErrorToast: true,
  retryAttempts: 0,
  retryDelay: 1000,
};

/**
 * Enhanced hook for managing async operations with modern patterns
 */
export const useAsyncOperation = <T>(initialData: T | null = null) => {
  const [state, setState] = useState<AsyncOperationState<T>>({
    data: initialData,
    loading: false,
    error: null,
    lastOperation: null,
  });
  
  const { toast } = useToast();
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async <R>(
    operation: () => Promise<DataServiceResult<R>>,
    operationName: string,
    options: AsyncOperationOptions = {}
  ): Promise<R | null> => {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    
    // Cancel any ongoing operation
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
      lastOperation: operationName,
    }));

    let attempt = 0;
    const maxAttempts = opts.retryAttempts! + 1;

    while (attempt < maxAttempts) {
      try {
        // Check if operation was aborted
        if (abortControllerRef.current?.signal.aborted) {
          return null;
        }

        const result = await operation();
        
        if (result.success) {
          // Only update state data if R extends T (for compatible types)
          if (result.data !== undefined) {
            setState(prev => ({
              ...prev,
              data: result.data as unknown as T,
              loading: false,
              error: null,
            }));
          } else {
            setState(prev => ({
              ...prev,
              loading: false,
              error: null,
            }));
          }

          if (opts.showSuccessToast && opts.successMessage) {
            toast({
              title: "Success",
              description: opts.successMessage,
            });
          }

          return result.data as R;
        } else {
          throw new Error(result.error?.message || 'Operation failed');
        }
      } catch (error: any) {
        attempt++;
        
        if (attempt >= maxAttempts) {
          const errorObj: DataServiceError = {
            message: error.message || 'Unknown error occurred',
            details: error,
          };

          setState(prev => ({
            ...prev,
            loading: false,
            error: errorObj,
          }));

          if (opts.showErrorToast) {
            toast({
              title: "Error",
              description: errorObj.message,
              variant: "destructive",
            });
          }

          return null;
        } else {
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, opts.retryDelay));
        }
      }
    }

    return null;
  }, [toast]);

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    setState({
      data: initialData,
      loading: false,
      error: null,
      lastOperation: null,
    });
  }, [initialData]);

  const setData = useCallback((data: T) => {
    setState(prev => ({
      ...prev,
      data,
      error: null,
    }));
  }, []);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    ...state,
    execute,
    reset,
    setData,
    cleanup,
    isIdle: !state.loading && !state.error && state.lastOperation === null,
    hasError: !!state.error,
  };
};