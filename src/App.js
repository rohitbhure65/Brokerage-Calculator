import React, { useState } from "react";

const App = () => {
  const [buyPrice, setBuyPrice] = useState(""); // Default buy price in USD
  const [sellPrice, setSellPrice] = useState(""); // Default empty
  const [contracts, setContracts] = useState(1); // Default 1 contract
  const lotSize = 0.001; // Lot size for BTC/ETH Futures
  const [leverage, setLeverage] = useState(10); // Default leverage
  const marketFeeRate = 0.05; // Maker fee rate (5%)
  const takerFeeRate = 0.02; // Taker fee rate (2%)
  const usdToInrRate = 85.0; // Hardcoded USD to INR conversion rate

  // Calculate brokerage fee
  const calculateFee = (price, leverage, feeRate) => {
    const leveragedValue = price * leverage;
    const fee = (leveragedValue * feeRate) / 100; // Fee is a percentage
    return fee;
  };

  // Calculate results
  const calculateResults = () => {
    const buy = parseFloat(buyPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const numberOfContracts = parseFloat(contracts) || 0;

    if (sell <= 0 || buy <= 0 || numberOfContracts <= 0) {
      return { makerBrokerage: 0, takerBrokerage: 0, pnl: 0, pnlInInr: 0 };
    }

    const makerBrokerage = calculateFee(buy, leverage, marketFeeRate);
    const takerBrokerage = calculateFee(buy, leverage, takerFeeRate);

    // PnL calculations
    const pnl = (sell - buy) * numberOfContracts * lotSize;
    const leveragedPnl = pnl * leverage;
    const pnlInInr = leveragedPnl * usdToInrRate;

    return { makerBrokerage, takerBrokerage, pnl: leveragedPnl, pnlInInr };
  };

  const results = calculateResults();

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <h1 className="text-2xl font-bold mt-10 mb-10 text-gray-800">Delta Exchange Brokerage and P&L Calculator</h1>

      {/* Input Fields */}
      <div className="flex flex-col space-y-4 w-full max-w-md">
        {/* Buy Price */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold text-gray-700">Buy Price (USD)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Enter buy price in USD"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Sell Price */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold text-gray-700">Sell Price (USD)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Enter sell price in USD"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Contracts */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold text-gray-700">Number of Contracts</label>
          <input
            type="number"
            step="1"
            min="0"
            placeholder="Enter number of contracts"
            value={contracts}
            onChange={(e) => setContracts(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Leverage */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold text-gray-700">Leverage</label>
          <select
            value={leverage}
            onChange={(e) => setLeverage(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            {[1, 10, 25, 50, 100, 150, 200].map((lev) => (
              <option key={lev} value={lev}>
                {lev}x
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="w-full max-w-md bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Results</h2>

        {/* Maker Brokerage */}
        <p>
          Brokerage (Maker):{" "}
          <span className={results.makerBrokerage > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
            ${results.makerBrokerage.toFixed(4)}
          </span>
        </p>

        {/* Taker Brokerage */}
        <p>
          Brokerage (Taker):{" "}
          <span className={results.takerBrokerage > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
            ${results.takerBrokerage.toFixed(4)}
          </span>
        </p>

        {/* Profit and Loss */}
        <p>
          Profit/Loss (with Leverage {leverage}x):{" "}
          <span className={results.pnl > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
            ${results.pnl.toFixed(2)}
          </span>
        </p>

        {/* Profit and Loss in INR */}
        <p>
          Profit/Loss in INR:{" "}
          <span className={results.pnlInInr > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
            ₹{results.pnlInInr.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default App;
