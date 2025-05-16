'use client';

import Link from "next/link";
import { ArrowRight, Car, CarFront, DollarSign, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AutoLoanPage() {
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
            <Link href="/auto-loan" className="text-sm font-medium text-navy-700">
              Auto Loans
            </Link>
            <Link href="/heloc" className="text-sm font-medium hover:text-navy-700">
              HELOC
            </Link>
            <Link href="/education" className="text-sm font-medium hover:text-navy-700">
              Financial Education
            </Link>
          </nav>
          <div>
            <Button asChild>
              <Link href="/auto-loan/apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-navy-700 to-navy-900 py-16 md:py-24">
          <div className="container relative z-10 mx-auto px-4 text-white md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Drive Your Dreams with Competitive Auto Loans</h1>
              <p className="mb-8 text-lg text-gray-100">
                Flexible financing options with low rates and personalized service to help you get on the road faster.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
                <Button size="lg" className="bg-white text-navy-700 hover:bg-gray-100">
                  <Link href="/auto-loan/apply">Apply Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-navy-800">
                  <Link href="#calculator">Calculate Payment</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-0 bg-[url('/modern-family-home.png')] bg-cover bg-center opacity-10"></div>
        </section>

        {/* Loan Options */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-3xl font-bold text-navy-700">Auto Loan Options</h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Choose the auto loan that fits your needs, whether you're buying new, used, or refinancing.
              </p>
            </div>

            <Tabs defaultValue="new">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="new">New Auto</TabsTrigger>
                <TabsTrigger value="used">Used Auto</TabsTrigger>
                <TabsTrigger value="refinance">Refinance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="new" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Standard New Auto Loan</CardTitle>
                      <CardDescription>For new vehicles from dealerships</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Rates as low as</span>
                          <span className="text-2xl font-bold text-navy-700">3.49% APR*</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Terms</span>
                          <span className="text-sm">Up to 72 months</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Loan Amount</span>
                          <span className="text-sm">Up to $100,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Down Payment</span>
                          <span className="text-sm">As low as 0%</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-navy-700 hover:bg-navy-800">
                        <Link href="/auto-loan/apply" className="w-full h-full flex items-center justify-center">
                          Apply Now
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="border-navy-600 border-2">
                    <div className="bg-navy-700 text-white text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                    <CardHeader>
                      <CardTitle>Green Vehicle Loan</CardTitle>
                      <CardDescription>For electric or hybrid vehicles</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Rates as low as</span>
                          <span className="text-2xl font-bold text-navy-700">2.99% APR*</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Terms</span>
                          <span className="text-sm">Up to 84 months</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Loan Amount</span>
                          <span className="text-sm">Up to $120,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Down Payment</span>
                          <span className="text-sm">As low as 0%</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-navy-700 hover:bg-navy-800">
                        <Link href="/auto-loan/apply?type=green" className="w-full h-full flex items-center justify-center">
                          Apply Now
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>First-Time Buyer</CardTitle>
                      <CardDescription>For members with limited credit history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Rates as low as</span>
                          <span className="text-2xl font-bold text-navy-700">4.49% APR*</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Terms</span>
                          <span className="text-sm">Up to 60 months</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Loan Amount</span>
                          <span className="text-sm">Up to $35,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Down Payment</span>
                          <span className="text-sm">As low as 5%</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-navy-700 hover:bg-navy-800">
                        <Link href="/auto-loan/apply?type=first-time" className="w-full h-full flex items-center justify-center">
                          Apply Now
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  *APR = Annual Percentage Rate. Rates are based on creditworthiness and are subject to change without notice. 
                  Other restrictions may apply. Sample payment for a $30,000 loan at 3.49% APR for 72 months would be approximately $463.73 per month.
                </p>
              </TabsContent>
              
              <TabsContent value="used" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Standard Used Auto Loan</CardTitle>
                      <CardDescription>For vehicles up to 5 years old</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Rates as low as</span>
                          <span className="text-2xl font-bold text-navy-700">4.19% APR*</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Terms</span>
                          <span className="text-sm">Up to 72 months</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Loan Amount</span>
                          <span className="text-sm">Up to $75,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Down Payment</span>
                          <span className="text-sm">As low as 0%</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-navy-700 hover:bg-navy-800">
                        <Link href="/auto-loan/apply?type=used" className="w-full h-full flex items-center justify-center">
                          Apply Now
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Older Vehicle Loan</CardTitle>
                      <CardDescription>For vehicles 6-10 years old</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Rates as low as</span>
                          <span className="text-2xl font-bold text-navy-700">5.29% APR*</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Terms</span>
                          <span className="text-sm">Up to 60 months</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Loan Amount</span>
                          <span className="text-sm">Up to $50,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Down Payment</span>
                          <span className="text-sm">As low as 10%</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-navy-700 hover:bg-navy-800">
                        <Link href="/auto-loan/apply?type=older" className="w-full h-full flex items-center justify-center">
                          Apply Now
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Private Party Purchase</CardTitle>
                      <CardDescription>For buying directly from seller</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Rates as low as</span>
                          <span className="text-2xl font-bold text-navy-700">4.69% APR*</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Terms</span>
                          <span className="text-sm">Up to 60 months</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Loan Amount</span>
                          <span className="text-sm">Up to $50,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Down Payment</span>
                          <span className="text-sm">As low as 10%</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-navy-700 hover:bg-navy-800">
                        <Link href="/auto-loan/apply?type=private" className="w-full h-full flex items-center justify-center">
                          Apply Now
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  *APR = Annual Percentage Rate. Rates are based on creditworthiness and are subject to change without notice. 
                  Other restrictions may apply. Sample payment for a $20,000 loan at 4.19% APR for 72 months would be approximately $321.64 per month.
                </p>
              </TabsContent>
              
              <TabsContent value="refinance" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Standard Refinance</CardTitle>
                      <CardDescription>Lower your current auto loan rate</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Rates as low as</span>
                          <span className="text-2xl font-bold text-navy-700">3.89% APR*</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Terms</span>
                          <span className="text-sm">Up to 72 months</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Requirements</span>
                          <span className="text-sm">Vehicle less than 7 years old</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Application Fee</span>
                          <span className="text-sm">$0</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-navy-700 hover:bg-navy-800">
                        <Link href="/auto-loan/apply?type=refinance" className="w-full h-full flex items-center justify-center">
                          Apply Now
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Cash-Out Refinance</CardTitle>
                      <CardDescription>Access the equity in your vehicle</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Rates as low as</span>
                          <span className="text-2xl font-bold text-navy-700">4.59% APR*</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Terms</span>
                          <span className="text-sm">Up to 72 months</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Cash Out</span>
                          <span className="text-sm">Up to 100% of vehicle equity</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Application Fee</span>
                          <span className="text-sm">$0</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-navy-700 hover:bg-navy-800">
                        <Link href="/auto-loan/apply?type=cash-out" className="w-full h-full flex items-center justify-center">
                          Apply Now
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  *APR = Annual Percentage Rate. Rates are based on creditworthiness and are subject to change without notice. 
                  Other restrictions may apply. Refinancing an existing Dade Credit Union auto loan may require opening a new loan with a higher rate.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Payment Calculator */}
        <section id="calculator" className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-3xl font-bold text-navy-700">Auto Loan Calculator</h2>
                <p className="text-gray-600">Estimate your monthly payments based on loan amount, term, and rate.</p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h3 className="mb-4 text-xl font-semibold text-navy-700">Enter Loan Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Vehicle Price</label>
                          <div className="relative mt-1">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                            <input
                              type="number"
                              className="w-full rounded-md border-gray-300 pl-8 py-2 border focus:border-navy-600 focus:ring-navy-600"
                              placeholder="30,000"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Down Payment</label>
                          <div className="relative mt-1">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                            <input
                              type="number"
                              className="w-full rounded-md border-gray-300 pl-8 py-2 border focus:border-navy-600 focus:ring-navy-600"
                              placeholder="5,000"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Interest Rate</label>
                          <div className="relative mt-1">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">%</span>
                            <input
                              type="number"
                              step="0.01"
                              className="w-full rounded-md border-gray-300 pl-8 py-2 border focus:border-navy-600 focus:ring-navy-600"
                              placeholder="3.49"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Loan Term</label>
                          <select className="mt-1 w-full rounded-md border-gray-300 py-2 border focus:border-navy-600 focus:ring-navy-600">
                            <option value="36">36 months (3 years)</option>
                            <option value="48">48 months (4 years)</option>
                            <option value="60">60 months (5 years)</option>
                            <option value="72" selected>72 months (6 years)</option>
                            <option value="84">84 months (7 years)</option>
                          </select>
                        </div>
                        <Button className="w-full bg-navy-700 hover:bg-navy-800">Calculate Payment</Button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-6 md:border-l md:pl-8">
                      <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-700">Estimated Monthly Payment</h3>
                        <p className="mt-1 text-4xl font-bold text-navy-700">$386.52</p>
                      </div>
                      <div className="rounded-lg bg-gray-100 p-4">
                        <h4 className="mb-3 text-base font-medium text-navy-700">Loan Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Loan Amount:</span>
                            <span className="font-medium">$25,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Interest Rate:</span>
                            <span className="font-medium">3.49%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Loan Term:</span>
                            <span className="font-medium">72 months</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Interest:</span>
                            <span className="font-medium">$2,829.44</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Cost:</span>
                            <span className="font-medium">$27,829.44</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <Button asChild variant="outline">
                          <Link href="/auto-loan/apply">
                            Apply With These Terms <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features and Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="mb-2 text-3xl font-bold text-navy-700">Why Choose Our Auto Loans</h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                We make financing your next vehicle easy with competitive rates and exceptional service.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-navy-100 p-3">
                  <DollarSign className="h-8 w-8 text-navy-700" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Competitive Rates</h3>
                <p className="text-gray-600">
                  Our auto loan rates are among the lowest in the industry, helping you save money over the life of your loan.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-navy-100 p-3">
                  <FileText className="h-8 w-8 text-navy-700" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Simple Application</h3>
                <p className="text-gray-600">
                  Our streamlined application process makes it easy to apply online and get a decision within minutes.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-navy-100 p-3">
                  <ShieldCheck className="h-8 w-8 text-navy-700" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Flexible Terms</h3>
                <p className="text-gray-600">
                  Choose from a variety of loan terms to fit your budget, with options from 36 to 84 months.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-navy-100 p-3">
                  <CarFront className="h-8 w-8 text-navy-700" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">No Hidden Fees</h3>
                <p className="text-gray-600">
                  We believe in transparency - no application fees, prepayment penalties, or hidden charges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="bg-navy-50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="mb-2 text-3xl font-bold text-navy-700">How to Apply</h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Follow these simple steps to get your auto loan and drive away in your new vehicle.
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="relative">
                <div className="absolute left-8 top-0 h-full w-0.5 bg-navy-200 md:left-[calc(50%-0.5px)]"></div>
                <div className="space-y-12">
                  <div className="relative md:flex md:justify-between">
                    <div className="hidden md:block md:w-[calc(50%-32px)]"></div>
                    <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-navy-700 text-white md:left-[calc(50%-32px)]">
                      1
                    </div>
                    <div className="ml-24 md:ml-0 md:w-[calc(50%-32px)]">
                      <h3 className="mb-2 text-xl font-semibold text-navy-700">Apply Online</h3>
                      <p className="text-gray-600">
                        Complete our simple online application in as little as 10 minutes. You'll need your personal information, employment details, and income verification.
                      </p>
                    </div>
                  </div>
                  <div className="relative md:flex md:justify-between">
                    <div className="ml-24 md:ml-0 md:mr-16 md:w-[calc(50%-32px)] md:text-right">
                      <h3 className="mb-2 text-xl font-semibold text-navy-700">Get Pre-Approved</h3>
                      <p className="text-gray-600">
                        Receive a decision on your application within minutes. Once pre-approved, you'll know exactly how much you can afford.
                      </p>
                    </div>
                    <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-navy-700 text-white md:left-[calc(50%-32px)]">
                      2
                    </div>
                    <div className="hidden md:block md:w-[calc(50%-32px)]"></div>
                  </div>
                  <div className="relative md:flex md:justify-between">
                    <div className="hidden md:block md:w-[calc(50%-32px)]"></div>
                    <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-navy-700 text-white md:left-[calc(50%-32px)]">
                      3
                    </div>
                    <div className="ml-24 md:ml-0 md:w-[calc(50%-32px)]">
                      <h3 className="mb-2 text-xl font-semibold text-navy-700">Shop With Confidence</h3>
                      <p className="text-gray-600">
                        Shop for your vehicle with the power of pre-approval. You can negotiate like a cash buyer at any dealership or with a private seller.
                      </p>
                    </div>
                  </div>
                  <div className="relative md:flex md:justify-between">
                    <div className="ml-24 md:ml-0 md:mr-16 md:w-[calc(50%-32px)] md:text-right">
                      <h3 className="mb-2 text-xl font-semibold text-navy-700">Finalize Your Loan</h3>
                      <p className="text-gray-600">
                        Once you've found your vehicle, we'll finalize the loan details. Sign your documents electronically and get your funds quickly.
                      </p>
                    </div>
                    <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-navy-700 text-white md:left-[calc(50%-32px)]">
                      4
                    </div>
                    <div className="hidden md:block md:w-[calc(50%-32px)]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" className="bg-navy-700 hover:bg-navy-800">
                <Link href="/auto-loan/apply">Start Your Application</Link>
              </Button>
              <p className="mt-4 text-sm text-gray-600">
                Need help? Call us at (305) 555-1234 or visit any branch location.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="mb-2 text-3xl font-bold text-navy-700">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Find answers to common questions about our auto loans.
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer font-medium text-navy-700">
                  What do I need to apply for an auto loan?
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>To apply for an auto loan, you'll need:</p>
                  <ul className="ml-5 mt-2 list-disc space-y-1">
                    <li>Valid government-issued ID</li>
                    <li>Proof of income (pay stubs, tax returns)</li>
                    <li>Proof of residence</li>
                    <li>Vehicle information (for used cars)</li>
                    <li>Down payment amount (if applicable)</li>
                  </ul>
                </div>
              </details>
              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer font-medium text-navy-700">
                  How long does the approval process take?
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>
                    Our online applications are typically processed within minutes, with conditional approval often given the same day. Final approval may take 1-2 business days, depending on verification requirements.
                  </p>
                </div>
              </details>
              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer font-medium text-navy-700">
                  Can I get pre-approved before shopping for a vehicle?
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>
                    Yes! We recommend getting pre-approved before you start shopping. This gives you a clear budget and stronger negotiating power at dealerships. Pre-approvals are valid for 30 days.
                  </p>
                </div>
              </details>
              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer font-medium text-navy-700">
                  Do you finance private party vehicle purchases?
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>
                    Yes, we offer financing for private party purchases. The process requires additional verification of the vehicle's condition and value, but we make it as smooth as possible.
                  </p>
                </div>
              </details>
              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer font-medium text-navy-700">
                  Can I refinance my existing auto loan from another lender?
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>
                    Absolutely! We offer competitive refinancing options that could lower your rate and monthly payment. You may even be able to skip a payment when refinancing with us.
                  </p>
                </div>
              </details>
              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer font-medium text-navy-700">
                  Is there a penalty for paying off my loan early?
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>
                    No, we do not charge prepayment penalties. You're free to pay off your loan early or make additional payments at any time without any fees.
                  </p>
                </div>
              </details>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Still have questions? <Link href="/contact" className="text-navy-700 underline">Contact our loan specialists</Link> for assistance.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-navy-700 py-16 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Ready to Drive Your Dream Car?</h2>
              <p className="mb-8 text-lg text-navy-100">
                Apply today and get pre-approved in minutes. Our team is ready to help you find the perfect auto loan.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
                <Button size="lg" className="bg-white text-navy-700 hover:bg-gray-100">
                  <Car className="mr-2 h-5 w-5" />
                  <Link href="/auto-loan/apply">Apply Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-navy-800">
                  <Link href="/contact">Speak to a Loan Specialist</Link>
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