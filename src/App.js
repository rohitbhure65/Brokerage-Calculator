import React, { useState } from "react";

const BrokerageCalculator = () => {
  const [price, setPrice] = useState(""); // Price for calculation
  const [contracts, setContracts] = useState(1); // Default 1 contract
  const [leverage, setLeverage] = useState(10); // Default leverage
  const makerFeeRate = 0.05; // Maker fee rate (5%)
  const takerFeeRate = 0.02; // Taker fee rate (2%)

  // Calculate brokerage fee
  const calculateFee = (price, contracts, leverage, feeRate) => {
    const leveragedValue = price * leverage * contracts;
    const fee = (leveragedValue * feeRate) / 100; // Fee is a percentage
    return fee;
  };

  const makerBrokerage = calculateFee(parseFloat(price) || 0, contracts, leverage, makerFeeRate);
  const takerBrokerage = calculateFee(parseFloat(price) || 0, contracts, leverage, takerFeeRate);

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <h1 className="text-2xl font-bold mt-10 mb-10 text-gray-800">Brokerage Calculator</h1>

      {/* Input Fields */}
      <div className="flex flex-col space-y-4 w-full max-w-md">
        {/* Price */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold text-gray-700">Price (USD)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Enter price in USD"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
          <span className={makerBrokerage > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
            ${makerBrokerage.toFixed(4)}
          </span>
        </p>

        {/* Taker Brokerage */}
        <p>
          Brokerage (Taker):{" "}
          <span className={takerBrokerage > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
            ${takerBrokerage.toFixed(4)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default BrokerageCalculator;
