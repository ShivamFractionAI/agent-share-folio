
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

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
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl">Your Position</CardTitle>
        <p className="text-sm text-muted-foreground">Current holdings in this agent</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="metric-card">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Shares Owned</div>
            <div className="text-lg sm:text-2xl font-bold">{position.sharesOwned.toLocaleString()}</div>
          </div>
          
          <div className="metric-card">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Avg Buy Price</div>
            <div className="text-lg sm:text-2xl font-bold">${position.avgBuyPrice}</div>
          </div>
          
          <div className="metric-card">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Current Value</div>
            <div className="text-lg sm:text-2xl font-bold">${position.currentValue.toLocaleString()}</div>
          </div>
          
          <div className="metric-card">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">P&L</div>
            <div className={`text-lg sm:text-2xl font-bold flex items-center gap-1 ${isProfitable ? 'text-success' : 'text-destructive'}`}>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="break-all">
                {isProfitable ? '+' : ''}${position.pnl} ({isProfitable ? '+' : ''}{position.pnlPercentage}%)
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PositionOverview;
