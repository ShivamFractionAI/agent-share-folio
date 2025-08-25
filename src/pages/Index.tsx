
import { useState } from 'react';
import { ArrowLeft, TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PriceChart from '@/components/PriceChart';
import TradingForm from '@/components/TradingForm';
import PositionOverview from '@/components/PositionOverview';
import PerformanceMetrics from '@/components/PerformanceMetrics';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  // Mock data - in real app this would come from API
  const agentData = {
    name: "DeFi Yield Optimizer",
    description: "Automatically finds and compounds the highest-yielding opportunities across multiple DeFi protocols. Rebalances positions based on market conditions.",
    category: "Yield Farming",
    riskLevel: "Medium Risk",
    currentPrice: 1.24,
    totalShares: 10300000,
    marketCap: 12800000,
    performance24h: 2.3,
    apy: 24.5,
    totalValueLocked: 12800000,
    capitalDeployed: 8200000,
    userPosition: {
      sharesOwned: 2500,
      avgBuyPrice: 1.18,
      currentValue: 3100,
      pnl: 150,
      pnlPercentage: 5.08
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{agentData.name}</h1>
                <p className="text-muted-foreground max-w-2xl mt-1">{agentData.description}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    {agentData.category}
                  </Badge>
                  <Badge variant="outline" className="border-warning/30 text-warning">
                    {agentData.riskLevel}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-right">
              <div>
                <div className="text-3xl font-bold text-foreground">${agentData.currentPrice}</div>
                <div className="text-success flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +{agentData.performance24h}% (24h)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Charts & Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Position Overview */}
            <PositionOverview position={agentData.userPosition} currentPrice={agentData.currentPrice} />
            
            {/* Price Chart */}
            <Card className="trading-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Share Price Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PriceChart />
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <PerformanceMetrics 
              apy={agentData.apy}
              tvl={agentData.totalValueLocked}
              capitalDeployed={agentData.capitalDeployed}
              totalShares={agentData.totalShares}
            />
          </div>

          {/* Right Column - Trading Forms */}
          <div className="space-y-6">
            <TradingForm 
              currentPrice={agentData.currentPrice}
              userShares={agentData.userPosition.sharesOwned}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
