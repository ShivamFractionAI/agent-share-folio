
import { Card, CardContent } from '@/components/ui/card';

interface PerformanceMetricsProps {
  apy: number;
  tvl: number;
  capitalDeployed: number;
  totalShares: number;
}

const PerformanceMetrics = ({ apy, tvl, capitalDeployed, totalShares }: PerformanceMetricsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <Card className="glassmorphism">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">24h Performance</p>
            <div className="text-2xl font-bold text-success">+{apy}%</div>
            <p className="text-xs text-muted-foreground">Real-time APY: 24.5%</p>
          </div>
        </CardContent>
      </Card>

      <Card className="glassmorphism">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Value Locked</p>
            <div className="text-2xl font-bold">${(tvl / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Assets under management</p>
          </div>
        </CardContent>
      </Card>

      <Card className="glassmorphism sm:col-span-2 lg:col-span-1">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Share Information</p>
            <div className="text-2xl font-bold">$1.24</div>
            <p className="text-xs text-muted-foreground">Current pricing • {(totalShares / 1000000).toFixed(1)}M shares</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
