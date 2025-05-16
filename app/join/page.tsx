"use client";

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Logo from "@/components/logo"
import { useRouter } from "next/navigation"

export default function JoinPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("personal");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleNextTab = () => {
    if (activeTab === "personal") setActiveTab("account");
    else if (activeTab === "account") setActiveTab("verify");
  };

  const handlePreviousTab = () => {
    if (activeTab === "verify") setActiveTab("account");
    else if (activeTab === "account") setActiveTab("personal");
  };

  const handleSubmit = async () => {
    const getVal = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.value || "";

    const payload = {
      firstName: getVal("first-name"),
      lastName: getVal("last-name"),
      email: getVal("email"),
      phone: getVal("phone"),
      dob: getVal("dob"),
      ssn: getVal("ssn"),
      address: getVal("address"),
      city: getVal("city"),
      state: getVal("state"),
      zip: getVal("zip"),
      // Additional fields would be collected from other tabs
    };

    try {
      const res = await fetch("/api/membership/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      // Redirect to success page instead of alert
      router.push("/join/success");
    } catch (e) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Logo />
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="/heloc" className="text-sm font-medium hover:underline">
              HELOC
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Financial Wellness
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              About Us
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/join">
              <Button size="sm" className="bg-navy-700 hover:bg-navy-800">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="mt-4 text-3xl font-bold tracking-tight">Join Dade County Federal Credit Union</h1>
              <p className="mt-2 text-gray-500">
                Complete the application below to become a member. The process takes less than 10 minutes.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="account">Account Selection</TabsTrigger>
                <TabsTrigger value="verify">Verification</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Please provide your personal details to get started.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Enter your last name" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email address" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="Enter your phone number" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ssn">Social Security Number</Label>
                      <Input id="ssn" placeholder="XXX-XX-XXXX" />
                      <p className="text-xs text-gray-500">Your information is encrypted and secure.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" placeholder="Enter your street address" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="City" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="State" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="ZIP Code" />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-navy-700 hover:bg-navy-800" onClick={handleNextTab}>
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Selection</CardTitle>
                    <CardDescription>Choose the accounts you'd like to open.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Primary Account Type</Label>
                      <RadioGroup defaultValue="checking">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="checking" id="checking" />
                          <Label htmlFor="checking">Checking Account</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="savings" id="savings" />
                          <Label htmlFor="savings">Savings Account</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="both" />
                          <Label htmlFor="both">Both Checking & Savings</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label>Additional Services (Optional)</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="debit-card" className="h-4 w-4 rounded border-gray-300" />
                          <Label htmlFor="debit-card">Debit Card</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="online-banking" className="h-4 w-4 rounded border-gray-300" />
                          <Label htmlFor="online-banking">Online & Mobile Banking</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="direct-deposit" className="h-4 w-4 rounded border-gray-300" />
                          <Label htmlFor="direct-deposit">Direct Deposit</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="overdraft" className="h-4 w-4 rounded border-gray-300" />
                          <Label htmlFor="overdraft">Overdraft Protection</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Initial Deposit</Label>
                      <div className="space-y-2">
                        <Input type="number" placeholder="Enter amount (minimum $25)" />
                        <p className="text-xs text-gray-500">Minimum opening deposit is $25.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Funding Method</Label>
                      <RadioGroup defaultValue="debit">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="debit" id="debit" />
                          <Label htmlFor="debit">Debit/Credit Card</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ach" id="ach" />
                          <Label htmlFor="ach">Bank Account (ACH Transfer)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" onClick={handlePreviousTab}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button className="bg-navy-700 hover:bg-navy-800" onClick={handleNextTab}>
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="verify" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Identity Verification</CardTitle>
                    <CardDescription>We need to verify your identity to complete your application.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Identification Document</Label>
                      <RadioGroup defaultValue="license">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="license" id="license" />
                          <Label htmlFor="license">Driver's License</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="state-id" id="state-id" />
                          <Label htmlFor="state-id">State ID</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="passport" id="passport" />
                          <Label htmlFor="passport">Passport</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Front of ID</Label>
                      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 py-10">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-navy-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 hover:text-emerald-500"
                            >
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Back of ID</Label>
                      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 py-10">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload-back"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-navy-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 hover:text-emerald-500"
                            >
                              <span>Upload a file</span>
                              <input id="file-upload-back" name="file-upload-back" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300" />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <Link href="#" className="text-navy-700 hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="#" className="text-navy-700 hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" onClick={handlePreviousTab}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button className="bg-navy-700 hover:bg-navy-800" onClick={handleSubmit}>Submit Application</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What Happens Next?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-4">
                      <li className="flex items-start">
                        <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Application Review</p>
                          <p className="text-sm text-gray-500">We'll review your application within 1 business day.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Account Setup</p>
                          <p className="text-sm text-gray-500">
                            Once approved, we'll set up your account and process your initial deposit.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Welcome Package</p>
                          <p className="text-sm text-gray-500">
                            You'll receive your welcome package with debit card and account information by mail.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Online Access</p>
                          <p className="text-sm text-gray-500">
                            You'll receive instructions to set up your online and mobile banking access.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="border-t bg-gray-50">
        <div className="container px-4 py-8 md:px-6">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 Dade County Federal Credit Union. All rights reserved.</p>
            <p className="mt-2">
              <Link href="#" className="text-navy-700 hover:underline">
                Privacy Policy
              </Link>{" "}
              |
              <Link href="#" className="text-navy-700 hover:underline ml-2">
                Terms of Service
              </Link>{" "}
              |
              <Link href="#" className="text-navy-700 hover:underline ml-2">
                Contact Us
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
