"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HelocCalculator() {
  const [homeValue, setHomeValue] = useState<string>("");
  const [mortgageBalance, setMortgageBalance] = useState<string>("");
  const [availableEquity, setAvailableEquity] = useState<number | null>(null);

  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTerm, setLoanTerm] = useState<string>("20");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const handleCalculateEquity = () => {
    const hv = parseFloat(homeValue);
    const mb = parseFloat(mortgageBalance);
    if (!isNaN(hv) && !isNaN(mb)) {
      setAvailableEquity(Math.max(0, hv * 0.8 - mb));
    } else {
      setAvailableEquity(null);
    }
  };

  const handleCalculatePayment = () => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseInt(loanTerm);
    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
      setMonthlyPayment(null);
      return;
    }
    const i = annualRate / 100 / 12;
    const n = years * 12;
    const M = (P * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    setMonthlyPayment(isFinite(M) ? M : null);
  };

  return (
    <Tabs defaultValue="amount" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="amount">Line Amount</TabsTrigger>
        <TabsTrigger value="payment">Payment Calculator</TabsTrigger>
      </TabsList>
      <TabsContent value="amount" className="p-4 bg-white rounded-md shadow mt-2">
        <div className="space-y-4">
          <div>
            <label htmlFor="homeValue" className="block text-sm font-medium mb-1">
              Home Value
            </label>
            <input
              id="homeValue"
              type="number"
              placeholder="$300,000"
              className="w-full p-2 border rounded-md"
              value={homeValue}
              onChange={(e) => setHomeValue(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="mortgageBalance" className="block text-sm font-medium mb-1">
              Mortgage Balance
            </label>
            <input
              id="mortgageBalance"
              type="number"
              placeholder="$200,000"
              className="w-full p-2 border rounded-md"
              value={mortgageBalance}
              onChange={(e) => setMortgageBalance(e.target.value)}
            />
          </div>
          <Button onClick={handleCalculateEquity} className="w-full bg-navy-700 hover:bg-navy-800">
            Calculate Available Equity
          </Button>
          {availableEquity !== null && (
            <div className="p-4 bg-gray-50 rounded-md mt-4">
              <p className="text-sm text-gray-500">
                Estimated available equity:{" "}
                <span className="font-bold text-black">
                  ${availableEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">(Based on 80% loan-to-value ratio)</p>
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="payment" className="p-4 bg-white rounded-md shadow mt-2">
        <div className="space-y-4">
          <div>
            <label htmlFor="loanAmount" className="block text-sm font-medium mb-1">
              Loan Amount
            </label>
            <input
              id="loanAmount"
              type="number"
              placeholder="$50,000"
              className="w-full p-2 border rounded-md"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="interestRate" className="block text-sm font-medium mb-1">
              Interest Rate (%)
            </label>
            <input
              id="interestRate"
              type="number"
              step="0.01"
              placeholder="5.25"
              className="w-full p-2 border rounded-md"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="loanTerm" className="block text-sm font-medium mb-1">
              Term (years)
            </label>
            <select
              id="loanTerm"
              className="w-full p-2 border rounded-md bg-white"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
            >
              {[5, 10, 15, 20, 25, 30].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={handleCalculatePayment} className="w-full bg-navy-700 hover:bg-navy-800">
            Calculate Payment
          </Button>
          {monthlyPayment !== null && (
            <div className="p-4 bg-gray-50 rounded-md mt-4">
              <p className="text-sm text-gray-500">
                Estimated monthly payment:{" "}
                <span className="font-bold text-black">
                  ${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">(Principal and interest only)</p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
} 