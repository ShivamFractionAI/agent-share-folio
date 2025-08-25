
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Wallet, Target, DollarSign } from 'lucide-react';

interface PositionOverviewProps {
  position: {
    sharesOwned: number;
    avgBuyPrice: number;
    currentValue: number;
    pnl: number;
    pnlPercentage: number;
  };
  currentPrice: number;
}

const PositionOverview = ({ position, currentPrice }: PositionOverviewProps) => {
  const isProfitable = position.pnl > 0;

  return (
    <Card className="trading-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-primary" />
          Your Position
        </CardTitle>
        <p className="text-sm text-muted-foreground">Current holdings in this agent</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="metric-card">
            <div className="text-sm text-muted-foreground mb-1">Shares Owned</div>
            <div className="text-2xl font-bold">{position.sharesOwned.toLocaleString()}</div>
          </div>
          
          <div className="metric-card">
            <div className="text-sm text-muted-foreground mb-1">Avg Buy Price</div>
            <div className="text-2xl font-bold">${position.avgBuyPrice}</div>
          </div>
          
          <div className="metric-card">
            <div className="text-sm text-muted-foreground mb-1">Current Value</div>
            <div className="text-2xl font-bold">${position.currentValue.toLocaleString()}</div>
          </div>
          
          <div className="metric-card">
            <div className="text-sm text-muted-foreground mb-1">P&L</div>
            <div className={`text-2xl font-bold flex items-center gap-1 ${isProfitable ? 'text-success' : 'text-destructive'}`}>
              <TrendingUp className="w-5 h-5" />
              {isProfitable ? '+' : ''}${position.pnl} ({isProfitable ? '+' : ''}{position.pnlPercentage}%)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PositionOverview;
