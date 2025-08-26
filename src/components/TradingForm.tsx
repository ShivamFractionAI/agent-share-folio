
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Calculator, Wallet } from 'lucide-react';

interface TradingFormProps {
  currentPrice: number;
  userShares: number;
}

const TradingForm = ({ currentPrice, userShares }: TradingFormProps) => {
  const [buyAmount, setBuyAmount] = useState('');
  const [sellShares, setSellShares] = useState('');

  const calculateBuyShares = (amount: string) => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) return 0;
    return Math.floor(amountNum / currentPrice);
  };

  const calculateSellValue = (shares: string) => {
    const sharesNum = parseFloat(shares);
    if (isNaN(sharesNum)) return 0;
    return sharesNum * currentPrice;
  };

  const addToBuyAmount = (addition: number) => {
    const currentAmount = parseFloat(buyAmount) || 0;
    setBuyAmount((currentAmount + addition).toString());
  };

  const setMaxBuyAmount = () => {
    // Assuming user has $10000 available for demo purposes
    setBuyAmount('10000');
  };

  return (
    <Card className="trading-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl">Trade Shares</CardTitle>
        <p className="text-sm text-muted-foreground">Current Price: ${currentPrice}</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/30">
            <TabsTrigger value="buy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground text-xs sm:text-sm">
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Amount (USD)</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="text-base sm:text-lg"
                />
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addToBuyAmount(1)}
                  className="text-xs"
                >
                  +$1
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addToBuyAmount(10)}
                  className="text-xs"
                >
                  +$10
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addToBuyAmount(100)}
                  className="text-xs"
                >
                  +$100
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={setMaxBuyAmount}
                  className="text-xs"
                >
                  Max
                </Button>
              </div>
              
              {buyAmount && (
                <div className="metric-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">You'll receive</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-primary">
                    {calculateBuyShares(buyAmount).toLocaleString()} shares
                  </div>
                </div>
              )}

              <Button className="w-full buy-button text-sm sm:text-lg py-4 sm:py-6">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Buy Shares
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center justify-between">
                  <span>Shares to sell</span>
                  <span className="text-xs text-muted-foreground">
                    Available: {userShares.toLocaleString()}
                  </span>
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={sellShares}
                  onChange={(e) => setSellShares(e.target.value)}
                  max={userShares}
                  className="text-base sm:text-lg"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSellShares((userShares * 0.25).toString())}
                  className="text-xs"
                >
                  25%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSellShares((userShares * 0.5).toString())}
                  className="text-xs"
                >
                  50%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSellShares(userShares.toString())}
                  className="text-xs"
                >
                  Max
                </Button>
              </div>

              {sellShares && (
                <div className="metric-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4 text-destructive" />
                    <span className="text-sm font-medium">You'll receive</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-destructive">
                    ${calculateSellValue(sellShares).toFixed(2)}
                  </div>
                </div>
              )}

              <Button className="w-full sell-button text-sm sm:text-lg py-4 sm:py-6">
                <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Sell Shares
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TradingForm;
