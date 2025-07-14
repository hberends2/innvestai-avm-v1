
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { HistoricalData, MarketData, CompSetData, OccupancyData } from "./types";
import { formatPercent } from "./utils";

interface OccupancyChartProps {
  historicalData: HistoricalData[];
  marketData: MarketData[];
  compSetData: CompSetData[];
  forecastData: OccupancyData[];
}

const OccupancyChart: React.FC<OccupancyChartProps> = ({
  historicalData,
  marketData,
  compSetData,
  forecastData
}) => {
  // Combine all data into a single array for the chart
  const chartData = [];
  
  // Add historical years (2022-2024)
  const historicalYears = [2022, 2023, 2024];
  historicalYears.forEach(year => {
    const subjectData = historicalData.find(d => d.year === year);
    const marketDataPoint = marketData.find(d => d.year === year);
    const compSetDataPoint = compSetData.find(d => d.year === year);
    
    chartData.push({
      year,
      subject: subjectData ? subjectData.occupancy * 100 : null,
      market: marketDataPoint ? marketDataPoint.occupancy * 100 : null,
      compSet: compSetDataPoint ? compSetDataPoint.occupancy * 100 : null,
      forecast: year === 2024 ? (subjectData ? subjectData.occupancy * 100 : null) : null // Connect 2024 to forecast
    });
  });
  
  // Add forecast years (2025-2029)
  forecastData.forEach(forecast => {
    chartData.push({
      year: forecast.year,
      subject: null, // No historical subject data for forecast years
      market: null, // No market data for forecast years
      compSet: null, // No comp set data for forecast years
      forecast: forecast.occupancy * 100
    });
  });

  console.log("Chart data:", chartData);
  console.log("Market data passed to chart:", marketData);
  console.log("Comp set data passed to chart:", compSetData);

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
            domain={['dataMin - 5', 'dataMax + 5']}
            tickFormatter={(value) => `${value}%`}
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
          
          {/* Forecast Line - Same blue as Subject Property, positioned second in legend */}
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

export default OccupancyChart;
