
import React from "react";

interface ForecastMethodSelectorProps {
  forecastMethod: string;
  setForecastMethod: (method: string) => void;
}

const ForecastMethodSelector: React.FC<ForecastMethodSelectorProps> = ({ 
  forecastMethod, 
  setForecastMethod 
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Forecast Method</h3>
      <div className="flex space-x-4">
        <div className="flex items-center">
          <input
            id="direct-input"
            type="radio"
            name="forecast-method"
            className="h-4 w-4 text-blue-600"
            checked={forecastMethod === 'direct'}
            onChange={() => setForecastMethod('direct')}
          />
          <label htmlFor="direct-input" className="ml-2 text-gray-700">
            Direct Occupancy Input
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="growth-rate"
            type="radio"
            name="forecast-method"
            className="h-4 w-4 text-blue-600"
            checked={forecastMethod === 'growth'}
            onChange={() => setForecastMethod('growth')}
          />
          <label htmlFor="growth-rate" className="ml-2 text-gray-700">
            Growth Rate (YoY) Based
          </label>
        </div>
      </div>
    </div>
  );
};

export default ForecastMethodSelector;
