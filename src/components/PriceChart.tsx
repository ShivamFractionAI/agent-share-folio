
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const PriceChart = () => {
  // Mock price data - in real app this would come from API
  const priceData = [
    { time: '00:00', price: 1.18, volume: 120000 },
    { time: '04:00', price: 1.16, volume: 98000 },
    { time: '08:00', price: 1.19, volume: 145000 },
    { time: '12:00', price: 1.21, volume: 162000 },
    { time: '16:00', price: 1.23, volume: 134000 },
    { time: '20:00', price: 1.24, volume: 187000 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">{`Time: ${label}`}</p>
          <p className="text-sm font-semibold text-primary">
            {`Price: $${payload[0].value.toFixed(2)}`}
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
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={priceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">Share Price</span>
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
