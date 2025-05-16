"use client";

import Link from "next/link";
import { ArrowLeft, Check, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/logo";

export default function JoinSuccessPage() {
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
        <div className="container px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Application Submitted Successfully!</h1>
            <p className="mt-4 text-xl text-gray-500">
              Thank you for choosing to join Dade County Federal Credit Union.
            </p>

            <div className="mt-12 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>What Happens Next</CardTitle>
                  <CardDescription>
                    Here's what you can expect in the coming days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-6">
                    <li className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                        <span className="font-bold">1</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="font-medium">Application Review</h3>
                        <p className="mt-1 text-gray-500">
                          Our team will review your application within 1 business day.
                          You'll receive an email confirmation shortly.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                        <span className="font-bold">2</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="font-medium">Account Setup</h3>
                        <p className="mt-1 text-gray-500">
                          Once approved, we'll set up your account and process your initial deposit.
                          This typically takes 1-2 business days.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                        <span className="font-bold">3</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="font-medium">Welcome Package</h3>
                        <p className="mt-1 text-gray-500">
                          You'll receive your welcome package with debit card and account details
                          by mail within 5-7 business days.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                        <span className="font-bold">4</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="font-medium">Online Access</h3>
                        <p className="mt-1 text-gray-500">
                          You'll receive an email with instructions to set up your online
                          and mobile banking access.
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Get a Head Start</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-background hover:bg-muted/50">
                      <div className="rounded-full bg-navy-100 p-2 mb-3">
                        <User className="h-6 w-6 text-navy-700" />
                      </div>
                      <h3 className="font-medium">Prepare Your Login</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Think about your secure password and security questions ahead of time.
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-background hover:bg-muted/50">
                      <div className="rounded-full bg-navy-100 p-2 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-navy-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="font-medium">Explore Our Resources</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Check out our financial resources and education materials.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12">
              <div className="inline-flex items-center justify-center">
                <p className="mr-4 text-sm text-gray-500">Application Reference #: DCU-2025-38194</p>
                <Link href="/">
                  <Button variant="default" className="bg-navy-700 hover:bg-navy-800">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </div>
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
  );
}