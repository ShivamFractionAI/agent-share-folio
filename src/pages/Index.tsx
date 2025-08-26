
import { useState } from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PriceChart from '@/components/PriceChart';
import ProfitChart from '@/components/ProfitChart';
import TradingForm from '@/components/TradingForm';
import PositionOverview from '@/components/PositionOverview';
import PerformanceMetrics from '@/components/PerformanceMetrics';

const Index = () => {
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
          
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shrink-0">
                <TrendingUp className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground break-words">{agentData.name}</h1>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base">{agentData.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    {agentData.category}
                  </Badge>
                  <Badge variant="outline" className="border-warning/30 text-warning">
                    {agentData.riskLevel}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:text-right">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">${agentData.currentPrice}</div>
                <div className="text-success flex items-center gap-1 text-sm sm:text-base">
                  <TrendingUp className="w-4 h-4" />
                  +{agentData.performance24h}% (24h)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Mobile-first responsive grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Column - Position & Performance (spans 3 cols on xl) */}
          <div className="xl:col-span-3 space-y-6">
            {/* Position Overview */}
            <PositionOverview position={agentData.userPosition} currentPrice={agentData.currentPrice} />
            
            {/* Performance Metrics */}
            <PerformanceMetrics 
              apy={agentData.apy}
              tvl={agentData.totalValueLocked}
              capitalDeployed={agentData.capitalDeployed}
              totalShares={agentData.totalShares}
            />
            
            {/* Your Profit Chart */}
            <Card className="trading-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl">Your Profit Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfitChart 
                  userPosition={agentData.userPosition}
                  currentPrice={agentData.currentPrice}
                />
              </CardContent>
            </Card>
            
            {/* Share Price Chart */}
            <Card className="trading-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl">Share Price Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <PriceChart />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Trading */}
          <div className="xl:col-span-1 order-first xl:order-last">
            <div className="xl:sticky xl:top-6">
              <TradingForm 
                currentPrice={agentData.currentPrice}
                userShares={agentData.userPosition.sharesOwned}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
