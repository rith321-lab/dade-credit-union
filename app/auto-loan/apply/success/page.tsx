'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Download, FileText, Home, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/logo';

export default function AutoLoanSuccessPage() {
  const searchParams = useSearchParams();
  const [applicationDetails, setApplicationDetails] = useState({
    id: 'AL-' + Math.floor(1000000 + Math.random() * 9000000),
    date: new Date().toLocaleDateString(),
    type: searchParams.get('type') || 'standard',
    amount: searchParams.get('amount') || '15,000',
    term: searchParams.get('term') || '60',
    rate: getRate(searchParams.get('type') || 'standard'),
    vehicle: searchParams.get('vehicle') || 'New Vehicle',
    payment: calculatePayment(
      parseFloat((searchParams.get('amount') || '15000').replace(/,/g, '')),
      parseInt(searchParams.get('term') || '60'),
      getRate(searchParams.get('type') || 'standard')
    ),
  });

  function getRate(loanType: string): number {
    switch (loanType) {
      case 'green':
        return 2.99;
      case 'refinance':
        return 3.89;
      case 'used':
        return 4.19;
      case 'first-time':
        return 4.49;
      default:
        return 3.49;
    }
  }

  function calculatePayment(principal: number, term: number, rate: number): string {
    const monthlyRate = rate / 100 / 12;
    const payment = principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -term));
    return payment.toFixed(2);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b py-4">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="font-bold text-lg text-navy-700">
            <Logo />
          </Link>
          <div className="hidden md:block">
            <p className="text-sm text-gray-500">Need help? Call (305) 555-1234</p>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="mb-4 rounded-full bg-green-100 p-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-navy-700">Application Submitted Successfully!</h1>
              <p className="mt-2 text-lg text-gray-600">
                Thank you for applying for an auto loan with Dade Credit Union.
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
                <CardDescription>Your application has been received and is now being processed.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Application ID</p>
                    <p className="font-medium">{applicationDetails.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Submission Date</p>
                    <p className="font-medium">{applicationDetails.date}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium text-amber-600">Under Review</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Loan Type</p>
                    <p className="font-medium">Auto Loan - {getLoanTypeName(applicationDetails.type)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Loan Amount</p>
                    <p className="font-medium">${applicationDetails.amount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Term</p>
                    <p className="font-medium">{applicationDetails.term} months</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Interest Rate</p>
                    <p className="font-medium">{applicationDetails.rate}% APR*</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Est. Monthly Payment</p>
                    <p className="font-medium">${applicationDetails.payment}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Vehicle</p>
                    <p className="font-medium">{applicationDetails.vehicle}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  *APR = Annual Percentage Rate. Final rate may vary based on credit evaluation and loan terms.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What Happens Next</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-6">
                  <li className="flex">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Application Review (1-2 business days)</h3>
                      <p className="mt-1 text-gray-500">
                        Our loan team will review your application and perform an initial credit evaluation.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Documentation & Verification</h3>
                      <p className="mt-1 text-gray-500">
                        We may contact you to request additional documentation such as proof of income, vehicle information, 
                        or identification. You'll receive an email with instructions.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Loan Decision</h3>
                      <p className="mt-1 text-gray-500">
                        Once your application is fully reviewed, we'll notify you of the decision. If approved, 
                        you'll receive your loan offer with final terms.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                      <span className="font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Closing & Funding</h3>
                      <p className="mt-1 text-gray-500">
                        Sign your loan documents electronically or in-branch. For vehicle purchases, we can work 
                        directly with the dealer to complete the transaction.
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Confirmation & Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="font-medium">Application Confirmation</h3>
                      <p className="text-sm text-gray-500">A confirmation has been emailed to you</p>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="flex flex-col items-center rounded-lg border p-4 text-center">
                      <Phone className="h-8 w-8 text-navy-700 mb-2" />
                      <h3 className="font-medium">Contact Us</h3>
                      <p className="mt-1 text-sm text-gray-500">Have questions about your application?</p>
                      <p className="mt-2 font-medium text-navy-700">(305) 555-1234</p>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border p-4 text-center">
                      <FileText className="h-8 w-8 text-navy-700 mb-2" />
                      <h3 className="font-medium">Application Status</h3>
                      <p className="mt-1 text-sm text-gray-500">Check your application status online</p>
                      <Link href="/dashboard" className="mt-2 text-navy-700 hover:underline">
                        View Status
                      </Link>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border p-4 text-center">
                      <Home className="h-8 w-8 text-navy-700 mb-2" />
                      <h3 className="font-medium">Visit a Branch</h3>
                      <p className="mt-1 text-sm text-gray-500">Meet with a loan specialist in person</p>
                      <Link href="#" className="mt-2 text-navy-700 hover:underline">
                        Find Locations
                      </Link>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
                    <Button className="bg-navy-700 hover:bg-navy-800" asChild>
                      <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/">Return to Home</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Dade Credit Union. All Rights Reserved. NMLS #12345. Equal Housing Lender.
          </p>
        </div>
      </footer>
    </div>
  );
}

function getLoanTypeName(type: string): string {
  switch (type) {
    case 'green':
      return 'Green Vehicle';
    case 'refinance':
      return 'Refinance';
    case 'used':
      return 'Used Vehicle';
    case 'first-time':
      return 'First-Time Buyer';
    default:
      return 'New Vehicle';
  }
}