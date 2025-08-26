
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface ProfitChartProps {
  userPosition: {
    sharesOwned: number;
    avgBuyPrice: number;
    currentValue: number;
    pnl: number;
    pnlPercentage: number;
  };
  currentPrice: number;
}

const ProfitChart = ({ userPosition, currentPrice }: ProfitChartProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  // Mock profit data for different timeframes based on user's position
  const profitDataSets = {
    '1H': Array.from({ length: 60 }, (_, i) => ({
      time: `${String(Math.floor(i / 60)).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`,
      profit: userPosition.pnl * (0.8 + (Math.sin(i / 10) * 0.3) + (Math.random() * 0.2 - 0.1)),
      profitPercentage: userPosition.pnlPercentage * (0.8 + (Math.sin(i / 10) * 0.3) + (Math.random() * 0.2 - 0.1))
    })),
    '6H': Array.from({ length: 36 }, (_, i) => ({
      time: `${String(Math.floor(i / 6)).padStart(2, '0')}:${String((i % 6) * 10).padStart(2, '0')}`,
      profit: userPosition.pnl * (0.7 + (Math.sin(i / 8) * 0.4) + (Math.random() * 0.3 - 0.15)),
      profitPercentage: userPosition.pnlPercentage * (0.7 + (Math.sin(i / 8) * 0.4) + (Math.random() * 0.3 - 0.15))
    })),
    '12H': Array.from({ length: 24 }, (_, i) => ({
      time: `${String(Math.floor(i / 2)).padStart(2, '0')}:${String((i % 2) * 30).padStart(2, '0')}`,
      profit: userPosition.pnl * (0.6 + (Math.sin(i / 6) * 0.5) + (Math.random() * 0.4 - 0.2)),
      profitPercentage: userPosition.pnlPercentage * (0.6 + (Math.sin(i / 6) * 0.5) + (Math.random() * 0.4 - 0.2))
    })),
    '1D': Array.from({ length: 24 }, (_, i) => ({
      time: `${String(i).padStart(2, '0')}:00`,
      profit: userPosition.pnl * (0.5 + (Math.sin(i / 4) * 0.6) + (Math.random() * 0.5 - 0.25)),
      profitPercentage: userPosition.pnlPercentage * (0.5 + (Math.sin(i / 4) * 0.6) + (Math.random() * 0.5 - 0.25))
    })),
    '1W': Array.from({ length: 7 }, (_, i) => ({
      time: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      profit: userPosition.pnl * (0.3 + (Math.sin(i / 2) * 0.8) + (Math.random() * 0.6 - 0.3)),
      profitPercentage: userPosition.pnlPercentage * (0.3 + (Math.sin(i / 2) * 0.8) + (Math.random() * 0.6 - 0.3))
    })),
    '1M': Array.from({ length: 30 }, (_, i) => ({
      time: `Day ${i + 1}`,
      profit: userPosition.pnl * (0.1 + (Math.sin(i / 5) * 1.2) + (Math.random() * 0.8 - 0.4)),
      profitPercentage: userPosition.pnlPercentage * (0.1 + (Math.sin(i / 5) * 1.2) + (Math.random() * 0.8 - 0.4))
    }))
  };

  const timeframes = [
    { label: '1H', value: '1H' },
    { label: '6H', value: '6H' },
    { label: '12H', value: '12H' },
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' }
  ];

  const currentData = profitDataSets[selectedTimeframe as keyof typeof profitDataSets];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const profit = payload[0].value;
      const isPositive = profit >= 0;
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">{`Time: ${label}`}</p>
          <p className={`text-sm font-semibold ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {`Profit: ${isPositive ? '+' : ''}$${profit.toFixed(2)}`}
          </p>
          <p className={`text-xs ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {`${isPositive ? '+' : ''}${payload[0].payload.profitPercentage.toFixed(2)}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Timeframe Selection */}
      <div className="flex flex-wrap gap-1 p-1 bg-muted rounded-lg">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe.value}
            onClick={() => setSelectedTimeframe(timeframe.value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              selectedTimeframe === timeframe.value
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            }`}
          >
            {timeframe.label}
          </button>
        ))}
      </div>

      {/* Chart Container with Horizontal Scroll */}
      <div className="h-80 w-full overflow-x-auto">
        <div className="min-w-full" style={{ minWidth: currentData.length > 24 ? '800px' : '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                strokeOpacity={0.3}
              />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                interval={selectedTimeframe === '1H' ? 9 : selectedTimeframe === '6H' ? 5 : 0}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="profit"
                stroke={userPosition.pnl >= 0 ? "hsl(142 76% 36%)" : "hsl(0 84% 60%)"}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${userPosition.pnl >= 0 ? 'bg-success' : 'bg-destructive'}`}></div>
            <span className="text-muted-foreground">Your Profit ({selectedTimeframe})</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Last updated: 2 minutes ago
        </div>
      </div>
    </div>
  );
};

export default ProfitChart;
