
import { useState, useCallback } from 'react';

export const useInputHandlers = (initialValue: Record<number, string>) => {
  const [values, setValues] = useState(initialValue);

  const formatPercentageInput = useCallback((value: string): string => {
    const cleanValue = value.replace(/[^0-9.-]/g, "");
    const numValue = parseFloat(cleanValue);
    return isNaN(numValue) ? "0.0" : numValue.toFixed(1);
  }, []);

  const formatIntegerInput = useCallback((value: string): string => {
    const cleanValue = value.replace(/[^0-9-]/g, "");
    const numValue = parseInt(cleanValue);
    return isNaN(numValue) ? "0" : numValue.toString();
  }, []);

  const handleChange = useCallback((year: number, value: string) => {
    setValues(prev => ({ ...prev, [year]: value }));
  }, []);

  const handlePercentageBlur = useCallback((year: number, value: string) => {
    const formattedValue = formatPercentageInput(value);
    setValues(prev => ({ ...prev, [year]: formattedValue }));
  }, [formatPercentageInput]);

  const handleIntegerBlur = useCallback((year: number, value: string) => {
    const formattedValue = formatIntegerInput(value);
    setValues(prev => ({ ...prev, [year]: formattedValue }));
  }, [formatIntegerInput]);

  return {
    values,
    setValues,
    handleChange,
    handlePercentageBlur,
    handleIntegerBlur
  };
};
