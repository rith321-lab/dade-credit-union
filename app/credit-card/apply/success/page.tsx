'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Clock, CreditCard, ShieldCheck, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/logo';

export default function CreditCardSuccessPage() {
  const searchParams = useSearchParams();
  const cardType = searchParams.get('type') || 'rewards';
  
  // Generate a random application ID
  const applicationId = 'CC-' + Math.floor(100000 + Math.random() * 900000);
  
  // Get card details based on the card type
  const cardDetails = getCardDetails(cardType);
  
  // Format submission date
  const submissionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b py-4">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="font-bold text-lg text-navy-700">
            <Logo />
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="/credit-card" className="text-sm font-medium hover:underline">
              Credit Cards
            </Link>
            <Link href="/heloc" className="text-sm font-medium hover:underline">
              HELOC
            </Link>
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
              <h1 className="text-3xl font-bold text-navy-700">Application Submitted!</h1>
              <p className="mt-2 text-lg text-gray-600 max-w-xl">
                Thank you for applying for the {cardDetails.name} with Dade Credit Union.
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
                <CardDescription>Your application has been received and is now being processed.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Application ID</p>
                      <p className="font-medium">{applicationId}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Date Submitted</p>
                      <p className="font-medium">{submissionDate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Status</p>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-amber-600 mr-1" />
                        <p className="font-medium text-amber-600">Under Review</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Card Type</p>
                      <p className="font-medium">{cardDetails.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Annual Fee</p>
                      <p className="font-medium">{cardDetails.annualFee}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Reward Program</p>
                      <p className="font-medium">{cardDetails.rewardProgram}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Application Timeline</h3>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Application Submitted</span>
                          <span className="text-navy-700 font-medium">Completed</span>
                        </div>
                        <Progress className="h-2 bg-gray-200" value={100} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Credit Review</span>
                          <span className="text-amber-600 font-medium">In Progress</span>
                        </div>
                        <Progress className="h-2 bg-gray-200" value={50} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Decision</span>
                          <span className="text-gray-400 font-medium">Pending</span>
                        </div>
                        <Progress className="h-2 bg-gray-200" value={0} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Card Issuance</span>
                          <span className="text-gray-400 font-medium">Pending</span>
                        </div>
                        <Progress className="h-2 bg-gray-200" value={0} />
                      </div>
                    </div>
                  </div>
                </div>
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
                      <h3 className="font-medium">Application Review (2-3 business days)</h3>
                      <p className="mt-1 text-gray-500">
                        Our team will review your application and perform a credit check.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Decision Notification</h3>
                      <p className="mt-1 text-gray-500">
                        You'll receive an email with our decision. If approved, it will include your credit limit
                        and final terms.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Card Issuance (7-10 business days)</h3>
                      <p className="mt-1 text-gray-500">
                        Your new card will be mailed to your address. You'll need to activate it upon receipt.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                      <span className="font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Online Account Setup</h3>
                      <p className="mt-1 text-gray-500">
                        Once your card is activated, you can set up online access to manage your account.
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Helpful Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center rounded-lg border p-4 text-center">
                    <CreditCard className="h-8 w-8 text-navy-700 mb-2" />
                    <h3 className="font-medium">Card Benefits</h3>
                    <p className="mt-1 text-sm text-gray-500">Learn about your card features</p>
                    <Link href={`/credit-card#${cardType}`} className="mt-2 text-navy-700 hover:underline">
                      View Benefits
                    </Link>
                  </div>
                  <div className="flex flex-col items-center rounded-lg border p-4 text-center">
                    <ShieldCheck className="h-8 w-8 text-navy-700 mb-2" />
                    <h3 className="font-medium">Security Tips</h3>
                    <p className="mt-1 text-sm text-gray-500">Protect your new card</p>
                    <Link href="#" className="mt-2 text-navy-700 hover:underline">
                      Read More
                    </Link>
                  </div>
                  <div className="flex flex-col items-center rounded-lg border p-4 text-center">
                    <Wallet className="h-8 w-8 text-navy-700 mb-2" />
                    <h3 className="font-medium">Application Status</h3>
                    <p className="mt-1 text-sm text-gray-500">Check your application</p>
                    <Link href="/dashboard" className="mt-2 text-navy-700 hover:underline">
                      View Status
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
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Dade Credit Union. All Rights Reserved. NMLS #12345.
          </p>
        </div>
      </footer>
    </div>
  );
}

function getCardDetails(cardType: string) {
  const cardDetails = {
    'rewards': {
      name: 'Dade Rewards Platinum Card',
      annualFee: '$0',
      rewardProgram: 'Earn 1.5% cash back on all purchases',
    },
    'travel': {
      name: 'Dade Travel Elite Card',
      annualFee: '$95',
      rewardProgram: '3x points on travel, 2x on dining',
    },
    'secured': {
      name: 'Dade Secured Credit Builder Card',
      annualFee: '$0',
      rewardProgram: 'Build credit with responsible use',
    },
    'business': {
      name: 'Dade Business Advantage Card',
      annualFee: '$0 first year, then $95',
      rewardProgram: '2% cash back on business expenses',
    },
    'cashback': {
      name: 'Dade Cash Back Signature Card',
      annualFee: '$0',
      rewardProgram: '2% cash back on groceries and gas',
    },
  };
  
  return cardDetails[cardType as keyof typeof cardDetails] || cardDetails['rewards'];
}