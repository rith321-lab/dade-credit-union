'use client';

import Link from "next/link";
import { ArrowRight, CreditCard, Shield, Award, Gift, Percent, Gem, Wallet, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/logo";
import { useState } from "react";

// Card type data
interface CardType {
  id: string;
  name: string;
  description: string;
  annualFee: number;
  introAPR: string;
  regularAPR: string;
  rewards: string;
  benefits: string[];
  creditNeeded: string;
  image: string;
  bestFor: string;
  introOffer?: string;
  color: string;
}

const creditCards: CardType[] = [
  {
    id: "cash-rewards",
    name: "Cash Rewards Visa®",
    description: "Earn cash back on every purchase, every day.",
    annualFee: 0,
    introAPR: "0% for 15 months",
    regularAPR: "14.99% - 24.99%",
    rewards: "3% cash back on dining, 2% on groceries, 1% on all other purchases",
    benefits: [
      "No annual fee",
      "Cash back doesn't expire",
      "No limit on cash back you can earn",
      "Online and mobile account access",
      "Zero liability protection",
    ],
    creditNeeded: "Good to Excellent",
    image: "/placeholder.svg",
    bestFor: "Everyday spending",
    introOffer: "$200 cash bonus after spending $1,000 in first 3 months",
    color: "bg-blue-600"
  },
  {
    id: "travel-rewards",
    name: "Travel Rewards Signature®",
    description: "Earn miles on every purchase to use toward travel.",
    annualFee: 95,
    introAPR: "0% for 12 months on purchases",
    regularAPR: "16.99% - 26.99%",
    rewards: "3x miles on travel, 2x miles on dining, 1x miles on all other purchases",
    benefits: [
      "No foreign transaction fees",
      "Travel insurance coverage",
      "Airport lounge access (4 passes per year)",
      "Global Entry or TSA PreCheck® credit",
      "Trip cancellation/interruption insurance",
    ],
    creditNeeded: "Excellent",
    image: "/placeholder.svg",
    bestFor: "Frequent travelers",
    introOffer: "50,000 bonus miles after spending $3,000 in first 3 months",
    color: "bg-emerald-600"
  },
  {
    id: "secure-starter",
    name: "Secure Starter Visa®",
    description: "Build or rebuild your credit with responsible use.",
    annualFee: 49,
    introAPR: "None",
    regularAPR: "19.99% - 28.99%",
    rewards: "1% cash back on all purchases",
    benefits: [
      "Automatic credit line reviews after 6 months",
      "Free credit score monitoring",
      "Fraud protection",
      "Online and mobile account access",
      "Reporting to all three major credit bureaus",
    ],
    creditNeeded: "Fair to Good",
    image: "/placeholder.svg",
    bestFor: "Building credit",
    color: "bg-gray-600"
  },
  {
    id: "platinum-business",
    name: "Platinum Business Visa®",
    description: "Designed for small business owners to manage expenses and earn rewards.",
    annualFee: 0,
    introAPR: "0% for 12 months on purchases and balance transfers",
    regularAPR: "15.99% - 21.99%",
    rewards: "2% cash back on office supplies and internet/phone services, 1% on all other purchases",
    benefits: [
      "No annual fee",
      "Free employee cards",
      "Detailed year-end summary",
      "Travel and emergency assistance",
      "Purchase protection",
    ],
    creditNeeded: "Good to Excellent",
    image: "/placeholder.svg",
    bestFor: "Small business owners",
    introOffer: "$500 cash bonus after spending $5,000 in first 3 months",
    color: "bg-purple-600"
  },
];

export default function CreditCardPage() {
  const [selectedCard, setSelectedCard] = useState<CardType>(creditCards[0]);
  const [compareCards, setCompareCards] = useState<string[]>([]);

  const toggleCompare = (cardId: string) => {
    if (compareCards.includes(cardId)) {
      setCompareCards(compareCards.filter(id => id !== cardId));
    } else {
      if (compareCards.length < 3) {
        setCompareCards([...compareCards, cardId]);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b py-4">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="font-bold text-lg text-navy-700">
            <Logo />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-navy-700">
              Home
            </Link>
            <Link href="/credit-card" className="text-sm font-medium text-navy-700">
              Credit Cards
            </Link>
            <Link href="/auto-loan" className="text-sm font-medium hover:text-navy-700">
              Auto Loans
            </Link>
            <Link href="/education" className="text-sm font-medium hover:text-navy-700">
              Financial Education
            </Link>
          </nav>
          <div>
            <Button asChild>
              <Link href="/credit-card/apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-navy-700 to-navy-900 py-16 md:py-24">
          <div className="container relative z-10 mx-auto px-4 text-white md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Find the Right Credit Card for You</h1>
              <p className="mb-8 text-lg text-gray-100">
                Choose from our selection of credit cards designed to fit your lifestyle and financial goals.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
                <Button size="lg" className="bg-white text-navy-700 hover:bg-gray-100">
                  <Link href="#compare-cards">Compare Cards</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-navy-800">
                  <Link href="#card-calculator">Pre-Qualify</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10"></div>
        </section>

        {/* Featured Cards */}
        <section id="compare-cards" className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-3xl font-bold text-navy-700">Our Credit Card Options</h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Compare features and find the perfect card to match your spending habits and lifestyle.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {creditCards.map((card) => (
                <Card key={card.id} className={`overflow-hidden ${compareCards.includes(card.id) ? 'ring-2 ring-blue-500' : ''}`}>
                  <div className={`h-2 w-full ${card.color}`}></div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{card.name}</CardTitle>
                        <CardDescription>{card.description}</CardDescription>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={compareCards.includes(card.id)}
                        onChange={() => toggleCompare(card.id)}
                        className="h-5 w-5 rounded border-gray-300"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Annual Fee</span>
                        <span className="font-medium">{card.annualFee === 0 ? 'No annual fee' : `$${card.annualFee}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Intro APR</span>
                        <span className="font-medium">{card.introAPR}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Regular APR</span>
                        <span className="font-medium">{card.regularAPR}</span>
                      </div>
                      <Separator />
                      <div>
                        <span className="text-sm text-gray-500 block mb-1">Rewards</span>
                        <span className="font-medium">{card.rewards}</span>
                      </div>
                      {card.introOffer && (
                        <div className="mt-2 rounded-md bg-blue-50 p-2">
                          <span className="text-sm font-medium text-blue-700">{card.introOffer}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" onClick={() => setSelectedCard(card)}>
                      Learn More
                    </Button>
                    <Button asChild>
                      <Link href={`/credit-card/apply?id=${card.id}`}>Apply</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {compareCards.length > 0 && (
              <div className="mt-12">
                <div className="mb-6 text-center">
                  <h3 className="text-2xl font-bold text-navy-700">Compare Cards</h3>
                  <p className="text-gray-600">
                    {compareCards.length === 1 
                      ? "Select at least one more card to compare." 
                      : `Comparing ${compareCards.length} cards.`}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Features</th>
                        {compareCards.map(cardId => {
                          const card = creditCards.find(c => c.id === cardId)!;
                          return (
                            <th key={card.id} className="px-4 py-3 text-left font-semibold text-gray-900">
                              {card.name}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">Annual Fee</td>
                        {compareCards.map(cardId => {
                          const card = creditCards.find(c => c.id === cardId)!;
                          return (
                            <td key={`${card.id}-fee`} className="px-4 py-3 text-gray-700">
                              {card.annualFee === 0 ? 'No annual fee' : `$${card.annualFee}`}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">Intro APR</td>
                        {compareCards.map(cardId => {
                          const card = creditCards.find(c => c.id === cardId)!;
                          return (
                            <td key={`${card.id}-intro`} className="px-4 py-3 text-gray-700">
                              {card.introAPR}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">Regular APR</td>
                        {compareCards.map(cardId => {
                          const card = creditCards.find(c => c.id === cardId)!;
                          return (
                            <td key={`${card.id}-apr`} className="px-4 py-3 text-gray-700">
                              {card.regularAPR}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">Rewards</td>
                        {compareCards.map(cardId => {
                          const card = creditCards.find(c => c.id === cardId)!;
                          return (
                            <td key={`${card.id}-rewards`} className="px-4 py-3 text-gray-700">
                              {card.rewards}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">Intro Offer</td>
                        {compareCards.map(cardId => {
                          const card = creditCards.find(c => c.id === cardId)!;
                          return (
                            <td key={`${card.id}-offer`} className="px-4 py-3 text-gray-700">
                              {card.introOffer || 'None'}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">Credit Needed</td>
                        {compareCards.map(cardId => {
                          const card = creditCards.find(c => c.id === cardId)!;
                          return (
                            <td key={`${card.id}-credit`} className="px-4 py-3 text-gray-700">
                              {card.creditNeeded}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">Best For</td>
                        {compareCards.map(cardId => {
                          const card = creditCards.find(c => c.id === cardId)!;
                          return (
                            <td key={`${card.id}-best`} className="px-4 py-3 text-gray-700">
                              {card.bestFor}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="px-4 py-3"></td>
                        {compareCards.map(cardId => {
                          const card = creditCards.find(c => c.id === cardId)!;
                          return (
                            <td key={`${card.id}-action`} className="px-4 py-3">
                              <Button asChild className="w-full">
                                <Link href={`/credit-card/apply?id=${card.id}`}>Apply</Link>
                              </Button>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex justify-center">
                  <Button variant="outline" onClick={() => setCompareCards([])}>
                    Clear Comparison
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Card Details */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-navy-700">{selectedCard.name}</h2>
                <p className="mb-6 text-gray-600">{selectedCard.description}</p>
                
                <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-3 text-xl font-semibold">Card Highlights</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Award className="h-5 w-5 text-navy-700" />
                      <div>
                        <p className="font-medium">Rewards</p>
                        <p className="text-sm text-gray-600">{selectedCard.rewards}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Percent className="h-5 w-5 text-navy-700" />
                      <div>
                        <p className="font-medium">Annual Fee</p>
                        <p className="text-sm text-gray-600">{selectedCard.annualFee === 0 ? 'No annual fee' : `$${selectedCard.annualFee}`}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Clock className="h-5 w-5 text-navy-700" />
                      <div>
                        <p className="font-medium">Intro APR</p>
                        <p className="text-sm text-gray-600">{selectedCard.introAPR}</p>
                      </div>
                    </div>
                    {selectedCard.introOffer && (
                      <div className="flex items-start space-x-2">
                        <Gift className="h-5 w-5 text-navy-700" />
                        <div>
                          <p className="font-medium">Intro Offer</p>
                          <p className="text-sm text-gray-600">{selectedCard.introOffer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="mb-3 text-xl font-semibold">Card Benefits</h3>
                <ul className="mb-6 space-y-2">
                  {selectedCard.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-navy-700" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex space-x-4">
                  <Button asChild className="bg-navy-700 hover:bg-navy-800">
                    <Link href={`/credit-card/apply?id=${selectedCard.id}`}>Apply Now</Link>
                  </Button>
                  <Button variant="outline" onClick={() => toggleCompare(selectedCard.id)}>
                    {compareCards.includes(selectedCard.id) ? 'Remove from Comparison' : 'Add to Comparison'}
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <Tabs defaultValue="rates">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="rates">Rates & Fees</TabsTrigger>
                    <TabsTrigger value="rewards">Rewards Details</TabsTrigger>
                    <TabsTrigger value="protection">Protection</TabsTrigger>
                  </TabsList>
                  <TabsContent value="rates" className="mt-6 space-y-4">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Interest Rates</h3>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 font-medium">Purchase APR</td>
                            <td className="py-2">{selectedCard.regularAPR}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">Intro Purchase APR</td>
                            <td className="py-2">{selectedCard.introAPR}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">Balance Transfer APR</td>
                            <td className="py-2">{selectedCard.regularAPR}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">Cash Advance APR</td>
                            <td className="py-2">26.99%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">Penalty APR</td>
                            <td className="py-2">29.99%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Fees</h3>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 font-medium">Annual Fee</td>
                            <td className="py-2">{selectedCard.annualFee === 0 ? 'None' : `$${selectedCard.annualFee}`}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">Foreign Transaction Fee</td>
                            <td className="py-2">{selectedCard.id === 'travel-rewards' ? 'None' : '3% of each transaction'}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">Balance Transfer Fee</td>
                            <td className="py-2">3% of each transfer (min $5)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">Cash Advance Fee</td>
                            <td className="py-2">5% of each advance (min $10)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">Late Payment Fee</td>
                            <td className="py-2">Up to $40</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="rewards" className="mt-6 space-y-4">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">How You Earn</h3>
                      <p className="text-gray-600 mb-4">{selectedCard.rewards}</p>
                      
                      {selectedCard.id === 'cash-rewards' && (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-blue-100 text-blue-700">3%</Badge>
                            <span>Cash back on dining and restaurants</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-blue-100 text-blue-700">2%</Badge>
                            <span>Cash back at grocery stores and supermarkets</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-blue-100 text-blue-700">1%</Badge>
                            <span>Cash back on all other eligible purchases</span>
                          </div>
                        </div>
                      )}
                      
                      {selectedCard.id === 'travel-rewards' && (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-emerald-100 text-emerald-700">3x</Badge>
                            <span>Miles on travel purchases (flights, hotels, rental cars)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-emerald-100 text-emerald-700">2x</Badge>
                            <span>Miles on dining and restaurant purchases</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-emerald-100 text-emerald-700">1x</Badge>
                            <span>Miles on all other eligible purchases</span>
                          </div>
                        </div>
                      )}
                      
                      {selectedCard.id === 'secure-starter' && (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-gray-100 text-gray-700">1%</Badge>
                            <span>Cash back on all eligible purchases</span>
                          </div>
                        </div>
                      )}
                      
                      {selectedCard.id === 'platinum-business' && (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-purple-100 text-purple-700">2%</Badge>
                            <span>Cash back on office supplies and internet/phone services</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-purple-100 text-purple-700">1%</Badge>
                            <span>Cash back on all other eligible purchases</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="mb-2 text-lg font-medium">How You Redeem</h3>
                      <ul className="space-y-2">
                        {selectedCard.id === 'cash-rewards' && (
                          <>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-navy-700" />
                              <span>Statement credit</span>
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-navy-700" />
                              <span>Direct deposit to Dade Credit Union account</span>
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-navy-700" />
                              <span>Gift cards</span>
                            </li>
                          </>
                        )}
                        
                        {selectedCard.id === 'travel-rewards' && (
                          <>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-navy-700" />
                              <span>Book travel through our rewards portal</span>
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-navy-700" />
                              <span>Redeem for statement credit for travel purchases</span>
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-navy-700" />
                              <span>Transfer to participating airline and hotel partners</span>
                            </li>
                          </>
                        )}
                        
                        {selectedCard.id === 'secure-starter' && (
                          <>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-navy-700" />
                              <span>Statement credit</span>
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-navy-700" />
                              <span>Direct deposit to Dade Credit Union account</span>
                            </li>
                          </>
                        )}
                        
                        {selectedCard.id === 'platinum-business' && (
                          <>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-navy-700" />
                              <span>Statement credit</span>
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-navy-700" />
                              <span>Direct deposit to business checking account</span>
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-navy-700" />
                              <span>Apply toward business expenses</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="protection" className="mt-6 space-y-4">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Security Features</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <Shield className="mt-1 h-5 w-5 text-navy-700" />
                          <div>
                            <p className="font-medium">Zero Liability Protection</p>
                            <p className="text-sm text-gray-600">You won't be held responsible for unauthorized charges.</p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Shield className="mt-1 h-5 w-5 text-navy-700" />
                          <div>
                            <p className="font-medium">Fraud Monitoring</p>
                            <p className="text-sm text-gray-600">24/7 monitoring of your account for suspicious activity.</p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Shield className="mt-1 h-5 w-5 text-navy-700" />
                          <div>
                            <p className="font-medium">Instant Purchase Notifications</p>
                            <p className="text-sm text-gray-600">Get real-time alerts for transactions on your account.</p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Shield className="mt-1 h-5 w-5 text-navy-700" />
                          <div>
                            <p className="font-medium">Chip Card Technology</p>
                            <p className="text-sm text-gray-600">Enhanced security with EMV chip technology.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    {selectedCard.id === 'travel-rewards' && (
                      <div>
                        <h3 className="mb-2 text-lg font-medium">Travel Protections</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start space-x-2">
                            <Shield className="mt-1 h-5 w-5 text-navy-700" />
                            <div>
                              <p className="font-medium">Trip Cancellation Insurance</p>
                              <p className="text-sm text-gray-600">Reimbursement for non-refundable travel expenses.</p>
                            </div>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Shield className="mt-1 h-5 w-5 text-navy-700" />
                            <div>
                              <p className="font-medium">Travel Accident Insurance</p>
                              <p className="text-sm text-gray-600">Coverage in case of injuries while traveling.</p>
                            </div>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Shield className="mt-1 h-5 w-5 text-navy-700" />
                            <div>
                              <p className="font-medium">Baggage Delay Insurance</p>
                              <p className="text-sm text-gray-600">Reimbursement for essential purchases when baggage is delayed.</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Card Calculator */}
        <section id="card-calculator" className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="mb-2 text-3xl font-bold text-navy-700">Find Your Perfect Card</h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Answer a few questions to see which card is best for your spending habits and lifestyle.
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <Card>
                <CardHeader>
                  <CardTitle>Card Recommendation Tool</CardTitle>
                  <CardDescription>Tell us about your preferences to get a personalized recommendation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-3 text-lg font-medium">What's your primary spending category?</h3>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border p-4 cursor-pointer hover:border-navy-700">
                          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-navy-100">
                            <Wallet className="h-5 w-5 text-navy-700" />
                          </div>
                          <h4 className="font-medium">Everyday Purchases</h4>
                          <p className="text-sm text-gray-500">Groceries, gas, dining</p>
                        </div>
                        <div className="rounded-lg border p-4 cursor-pointer hover:border-navy-700">
                          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-navy-100">
                            <CreditCard className="h-5 w-5 text-navy-700" />
                          </div>
                          <h4 className="font-medium">Travel</h4>
                          <p className="text-sm text-gray-500">Flights, hotels, dining</p>
                        </div>
                        <div className="rounded-lg border p-4 cursor-pointer hover:border-navy-700">
                          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-navy-100">
                            <Gem className="h-5 w-5 text-navy-700" />
                          </div>
                          <h4 className="font-medium">Business Expenses</h4>
                          <p className="text-sm text-gray-500">Office supplies, internet</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-medium">What's most important to you in a credit card?</h3>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border p-4 cursor-pointer hover:border-navy-700">
                          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-navy-100">
                            <Award className="h-5 w-5 text-navy-700" />
                          </div>
                          <h4 className="font-medium">Rewards Rate</h4>
                          <p className="text-sm text-gray-500">Higher cash back or points</p>
                        </div>
                        <div className="rounded-lg border p-4 cursor-pointer hover:border-navy-700">
                          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-navy-100">
                            <Percent className="h-5 w-5 text-navy-700" />
                          </div>
                          <h4 className="font-medium">Low APR</h4>
                          <p className="text-sm text-gray-500">Lower interest rate</p>
                        </div>
                        <div className="rounded-lg border p-4 cursor-pointer hover:border-navy-700">
                          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-navy-100">
                            <Gift className="h-5 w-5 text-navy-700" />
                          </div>
                          <h4 className="font-medium">Sign-up Bonus</h4>
                          <p className="text-sm text-gray-500">Generous welcome offer</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-medium">What's your approximate credit score?</h3>
                      <div className="grid gap-4 md:grid-cols-4">
                        <div className="rounded-lg border p-4 cursor-pointer hover:border-navy-700">
                          <h4 className="font-medium">Excellent</h4>
                          <p className="text-sm text-gray-500">750+</p>
                        </div>
                        <div className="rounded-lg border p-4 cursor-pointer hover:border-navy-700">
                          <h4 className="font-medium">Good</h4>
                          <p className="text-sm text-gray-500">700-749</p>
                        </div>
                        <div className="rounded-lg border p-4 cursor-pointer hover:border-navy-700">
                          <h4 className="font-medium">Fair</h4>
                          <p className="text-sm text-gray-500">650-699</p>
                        </div>
                        <div className="rounded-lg border p-4 cursor-pointer hover:border-navy-700">
                          <h4 className="font-medium">Building Credit</h4>
                          <p className="text-sm text-gray-500">Below 650</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <Button className="bg-navy-700 hover:bg-navy-800">
                        Get My Recommendation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-3xl font-bold text-navy-700">Card Member Benefits</h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Enjoy these valuable benefits with any Dade Credit Union card.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-navy-100 p-3">
                  <Shield className="h-8 w-8 text-navy-700" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Zero Liability Protection</h3>
                <p className="text-gray-600">
                  You won't be held responsible for unauthorized charges made with your card or account information.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-navy-100 p-3">
                  <CreditCard className="h-8 w-8 text-navy-700" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Digital Banking</h3>
                <p className="text-gray-600">
                  Manage your account, view transactions, pay bills and more with our mobile app and online banking.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-navy-100 p-3">
                  <Clock className="h-8 w-8 text-navy-700" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">24/7 Customer Service</h3>
                <p className="text-gray-600">
                  Reach our dedicated customer service team anytime, day or night, for assistance with your account.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-navy-100 p-3">
                  <Wallet className="h-8 w-8 text-navy-700" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Digital Wallet Integration</h3>
                <p className="text-gray-600">
                  Add your card to Apple Pay, Google Pay, or Samsung Pay for convenient and secure payments.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-navy-100 p-3">
                  <Award className="h-8 w-8 text-navy-700" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Member-Only Discounts</h3>
                <p className="text-gray-600">
                  Enjoy exclusive discounts and offers from select merchants when you use your Dade Credit Union card.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-navy-100 p-3">
                  <Gem className="h-8 w-8 text-navy-700" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Free Credit Score</h3>
                <p className="text-gray-600">
                  Access your FICO® Score for free and receive alerts when there are important changes to your credit report.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="mb-2 text-3xl font-bold text-navy-700">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Find answers to common questions about our credit cards.
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer font-medium text-navy-700">
                  How do I apply for a credit card?
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>
                    You can apply for a Dade Credit Union credit card online, by phone, or at any branch location. The online application takes about 10 minutes to complete, and you may receive a decision in as little as 60 seconds.
                  </p>
                </div>
              </details>
              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer font-medium text-navy-700">
                  What information do I need to apply?
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>You'll need to provide:</p>
                  <ul className="ml-5 mt-2 list-disc space-y-1">
                    <li>Personal information (name, address, phone, SSN)</li>
                    <li>Employment and income information</li>
                    <li>Housing information (rent/own and monthly payment)</li>
                    <li>Desired credit limit</li>
                  </ul>
                </div>
              </details>
              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer font-medium text-navy-700">
                  How long does it take to receive my card?
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>
                    If approved, you can expect to receive your new card in the mail within 7-10 business days. Some members may qualify for instant card issuance at our branch locations.
                  </p>
                </div>
              </details>
              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer font-medium text-navy-700">
                  How do I redeem my rewards?
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>
                    You can redeem rewards through our online banking portal or mobile app. Depending on your card, redemption options may include statement credits, direct deposits, travel bookings, gift cards, or merchandise.
                  </p>
                </div>
              </details>
              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer font-medium text-navy-700">
                  Can I get a credit card if I have limited or poor credit?
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>
                    Yes, our Secure Starter Visa® is designed for members who are building or rebuilding their credit. This card offers a path to establishing credit with responsible use, and we'll automatically review your account for potential credit line increases after 6 months.
                  </p>
                </div>
              </details>
              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer font-medium text-navy-700">
                  Is there a fee for balance transfers?
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>
                    Yes, there is typically a balance transfer fee of 3% of the amount transferred (minimum $5). However, we occasionally offer promotional balance transfer offers with reduced or waived fees for eligible members.
                  </p>
                </div>
              </details>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Still have questions? <Link href="/contact" className="text-navy-700 underline">Contact our card services team</Link> for assistance.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-navy-700 py-16 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Ready to Choose Your Card?</h2>
              <p className="mb-8 text-lg text-navy-100">
                Apply today and enjoy the benefits of being a Dade Credit Union card member.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
                <Button size="lg" className="bg-white text-navy-700 hover:bg-gray-100">
                  <CreditCard className="mr-2 h-5 w-5" />
                  <Link href="/credit-card/apply">Apply Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-navy-800">
                  <Link href="#compare-cards">Compare Cards</Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-navy-100">
                Already a member? <Link href="/login" className="underline">Log in</Link> to see your personalized offers.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Dade Credit Union</h3>
              <p className="text-sm text-gray-600">
                Serving our community with financial solutions since 1974.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact</h3>
              <p className="text-sm text-gray-600">
                123 Financial Way<br />
                Miami, FL 33101<br />
                (305) 555-1234<br />
                info@dadecreditunion.com
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Hours</h3>
              <p className="text-sm text-gray-600">
                Monday - Friday: 9:00 AM - 5:00 PM<br />
                Saturday: 9:00 AM - 1:00 PM<br />
                Sunday: Closed
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-navy-700">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-navy-700">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/rates" className="text-gray-600 hover:text-navy-700">
                    Rates
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-navy-700">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-sm text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Dade Credit Union. All rights reserved. Federally insured by NCUA.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}