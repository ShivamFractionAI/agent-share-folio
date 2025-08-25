
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, DollarSign, Users, TrendingUp } from 'lucide-react';

interface PerformanceMetricsProps {
  apy: number;
  tvl: number;
  capitalDeployed: number;
  totalShares: number;
}

const PerformanceMetrics = ({ apy, tvl, capitalDeployed, totalShares }: PerformanceMetricsProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="glassmorphism">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">24h Performance</p>
              <p className="text-xs text-muted-foreground">Real-time APY</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-success">+{apy}%</div>
            <div className="text-xs text-muted-foreground">APY: 24.5%</div>
          </div>
        </CardContent>
      </Card>

      <Card className="glassmorphism">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Value Locked</p>
              <p className="text-xs text-muted-foreground">Assets under management</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">${(tvl / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Capital Deployed: ${(capitalDeployed / 1000000).toFixed(1)}M</div>
          </div>
        </CardContent>
      </Card>

      <Card className="glassmorphism">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Share Information</p>
              <p className="text-xs text-muted-foreground">Current pricing</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-warning" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">$1.24</div>
            <div className="text-xs text-muted-foreground">Total Shares: {(totalShares / 1000000).toFixed(1)}M</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
