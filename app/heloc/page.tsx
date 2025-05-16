import Link from "next/link"
import { ArrowRight, Check, HelpCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/logo"
import HelocCalculator from '@/components/HelocCalculator'

export default function HelocPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Logo />
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="/heloc" className="text-sm font-medium text-navy-700 underline">
              HELOC
            </Link>
            <Link href="/education" className="text-sm font-medium hover:underline">
              Financial Education
            </Link>
            <Link href="/bnpl" className="text-sm font-medium hover:underline">
              Buy Now, Pay Later
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
        <section className="bg-gradient-to-r from-navy-800 to-navy-600 py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 md:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                    Home Equity Line of Credit
                  </h1>
                  <p className="max-w-[600px] text-white/90 md:text-xl">
                    Access the equity in your home with competitive rates and flexible terms.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/heloc/apply">
                    <Button size="lg" className="bg-white text-navy-700 hover:bg-gray-100">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#calculator">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Calculate Payments
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center space-x-4 text-white">
                  <div className="flex items-center">
                    <Check className="mr-1 h-4 w-4" />
                    <span className="text-sm">No application fees</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-1 h-4 w-4" />
                    <span className="text-sm">Fast approval</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-1 h-4 w-4" />
                    <span className="text-sm">Low rates</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-white/10 p-2">
                  <img
                    src="/modern-family-home.png"
                    alt="Home with family"
                    className="h-full w-full rounded-md object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Our HELOC?</h2>
              <p className="mt-4 text-gray-500">
                Our Home Equity Line of Credit offers flexibility and competitive rates to help you achieve your goals.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto rounded-full bg-navy-100 p-3 w-12 h-12 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-navy-700" />
                  </div>
                  <CardTitle className="mt-4">Low Rates</CardTitle>
                  <CardDescription>Competitive variable rates starting at 5.25% APR</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-500">
                    Our rates are consistently below the national average, helping you save money over the life of your
                    loan.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto rounded-full bg-navy-100 p-3 w-12 h-12 flex items-center justify-center">
                    <ArrowRight className="h-6 w-6 text-navy-700" />
                  </div>
                  <CardTitle className="mt-4">Flexible Terms</CardTitle>
                  <CardDescription>10-year draw period with 20-year repayment</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-500">
                    Access your funds when you need them during the draw period, then transition to a predictable
                    repayment schedule.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto rounded-full bg-navy-100 p-3 w-12 h-12 flex items-center justify-center">
                    <HelpCircle className="h-6 w-6 text-navy-700" />
                  </div>
                  <CardTitle className="mt-4">Expert Guidance</CardTitle>
                  <CardDescription>Personalized support throughout the process</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-500">
                    Our HELOC specialists will help you understand your options and guide you through every step of the
                    application.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-12 md:py-16" id="calculator">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">HELOC Calculator</h2>
              <p className="mt-4 text-center text-gray-500">
                Estimate your potential line of credit and monthly payments.
              </p>

              <div className="mt-8">
                <HelocCalculator />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Get Started?</h2>
              <p className="mt-4 text-gray-500">
                Our streamlined application process makes it easy to access your home\'s equity.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/heloc/apply">
                  <Button size="lg" className="bg-navy-700 hover:bg-navy-800">
                    Apply Now
                  </Button>
                </Link>
                <Link href="/heloc/consultation">
                  <Button size="lg" variant="outline">
                    Schedule a Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-gray-50">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-medium">Dade County FCU</h3>
              <p className="mt-2 text-sm text-gray-500">Serving our community with financial solutions since 1953.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Products</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="/heloc" className="hover:underline">
                    HELOC
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Checking Accounts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Savings Accounts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Auto Loans
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Resources</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="/education" className="hover:underline">
                    Financial Wellness
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Greepath Planning
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Gen Z Financial Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Calculators
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Contact</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-500">
                <li>1500 NW 107th Ave</li>
                <li>Miami, FL 33172</li>
                <li>(305) 471-5080</li>
                <li>support@dadecountyfcu.org</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
            <p>© 2025 Dade County Federal Credit Union. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
