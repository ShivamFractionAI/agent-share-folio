
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useState } from 'react';

const PriceChart = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  // Mock historical price data for different timeframes
  const priceDataSets = {
    '1H': Array.from({ length: 60 }, (_, i) => ({
      time: `${String(Math.floor(i / 60)).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`,
      price: 1.20 + (Math.sin(i / 10) * 0.05) + (Math.random() * 0.02 - 0.01),
      volume: 80000 + Math.random() * 40000
    })),
    '6H': Array.from({ length: 36 }, (_, i) => ({
      time: `${String(Math.floor(i / 6)).padStart(2, '0')}:${String((i % 6) * 10).padStart(2, '0')}`,
      price: 1.18 + (Math.sin(i / 8) * 0.08) + (Math.random() * 0.03 - 0.015),
      volume: 90000 + Math.random() * 50000
    })),
    '12H': Array.from({ length: 24 }, (_, i) => ({
      time: `${String(Math.floor(i / 2)).padStart(2, '0')}:${String((i % 2) * 30).padStart(2, '0')}`,
      price: 1.16 + (Math.sin(i / 6) * 0.12) + (Math.random() * 0.04 - 0.02),
      volume: 100000 + Math.random() * 60000
    })),
    '1D': Array.from({ length: 24 }, (_, i) => ({
      time: `${String(i).padStart(2, '0')}:00`,
      price: 1.15 + (Math.sin(i / 4) * 0.15) + (Math.random() * 0.05 - 0.025),
      volume: 120000 + Math.random() * 70000
    })),
    '1W': Array.from({ length: 7 }, (_, i) => ({
      time: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      price: 1.10 + (Math.sin(i / 2) * 0.20) + (Math.random() * 0.08 - 0.04),
      volume: 150000 + Math.random() * 100000
    })),
    '1M': Array.from({ length: 30 }, (_, i) => ({
      time: `Day ${i + 1}`,
      price: 1.00 + (Math.sin(i / 5) * 0.30) + (Math.random() * 0.10 - 0.05),
      volume: 200000 + Math.random() * 150000
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

  const currentData = priceDataSets[selectedTimeframe as keyof typeof priceDataSets];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">{`Time: ${label}`}</p>
          <p className="text-sm font-semibold text-primary">
            {`Price: $${payload[0].value.toFixed(4)}`}
          </p>
          <p className="text-xs text-muted-foreground">
            {`Volume: ${payload[0].payload.volume.toLocaleString()}`}
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
            <AreaChart data={currentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(174 100% 42%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(174 100% 42%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
                domain={['dataMin - 0.02', 'dataMax + 0.02']}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="hsl(174 100% 42%)"
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">Share Price ({selectedTimeframe})</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Last updated: 2 minutes ago
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
