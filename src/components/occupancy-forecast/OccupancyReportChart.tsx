
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatPercent } from "./utils";

interface HistoricalData {
  year: number;
  occupancy: number;
  rooms?: number;
}

interface MarketData {
  year: number;
  occupancy: number;
  growthRate: number;
}

interface CompSetData {
  year: number;
  occupancy: number;
  growthRate: number;
}

interface ForecastData {
  year: number;
  occupancy: number;
}

interface OccupancyReportChartProps {
  historicalData: HistoricalData[];
  marketData: MarketData[];
  compSetData: CompSetData[];
  forecastData: ForecastData[];
}

const OccupancyReportChart: React.FC<OccupancyReportChartProps> = ({
  historicalData,
  marketData,
  compSetData,
  forecastData
}) => {
  // Combine all data into a single array for the chart
  const chartData = [];
  
  // Add historical years
  const historicalYears = historicalData.map(d => d.year);
  historicalYears.forEach(year => {
    const subjectData = historicalData.find(d => d.year === year);
    const marketDataPoint = marketData.find(d => d.year === year);
    const compSetDataPoint = compSetData.find(d => d.year === year);
    
    chartData.push({
      year,
      subject: subjectData ? subjectData.occupancy * 100 : null,
      market: marketDataPoint ? marketDataPoint.occupancy * 100 : null,
      compSet: compSetDataPoint ? compSetDataPoint.occupancy * 100 : null,
      forecast: year === Math.max(...historicalYears) ? (subjectData ? subjectData.occupancy * 100 : null) : null
    });
  });
  
  // Add forecast years
  forecastData.forEach(forecast => {
    chartData.push({
      year: forecast.year,
      subject: null,
      market: null,
      compSet: null,
      forecast: forecast.occupancy * 100
    });
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-medium">{`Year: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value !== undefined && entry.value !== null ? entry.value.toFixed(1) : 'N/A'}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Generate custom ticks in 5% increments
  const generateTicks = () => {
    const allValues = chartData.flatMap(d => [d.subject, d.market, d.compSet, d.forecast]).filter(v => v !== null && v !== undefined);
    if (allValues.length === 0) return [50, 55, 60, 65, 70, 75, 80, 85];
    
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    
    // Round down to nearest 5 for min, round up to nearest 5 for max
    const minTick = Math.floor(min / 5) * 5;
    const maxTick = Math.ceil(max / 5) * 5;
    
    const ticks = [];
    for (let i = minTick; i <= maxTick; i += 5) {
      ticks.push(i);
    }
    
    return ticks;
  };

  const customTicks = generateTicks();

  return (
    <div className="w-full h-96 bg-white p-4 rounded-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">Occupancy Trends</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="year" 
            stroke="#666"
            fontSize={12}
          />
          <YAxis 
            stroke="#666"
            fontSize={12}
            domain={[customTicks[0], customTicks[customTicks.length - 1]]}
            ticks={customTicks}
            tickFormatter={(value) => `${Math.round(value)}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          {/* Historical Subject Property Line */}
          <Line
            type="monotone"
            dataKey="subject"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
            connectNulls={false}
            name="Subject Property"
          />
          
          {/* Forecast Line */}
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#3b82f6"
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
            connectNulls={false}
            name="Forecast (- - -)"
          />
          
          {/* Market Line */}
          <Line
            type="monotone"
            dataKey="market"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
            connectNulls={false}
            name="Market"
          />
          
          {/* Comp Set Line */}
          <Line
            type="monotone"
            dataKey="compSet"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ fill: "#f59e0b", strokeWidth: 2, r: 5 }}
            connectNulls={false}
            name="Comp Set"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OccupancyReportChart;
