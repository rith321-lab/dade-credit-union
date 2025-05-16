import Link from "next/link"
import { ArrowRight, BarChart3, CreditCard, GraduationCap, Home, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import FinancialWellnessSection from "@/components/financial-wellness-section"
import HeroSection from "@/components/hero-section"
import TestimonialSection from "@/components/testimonial-section"
import Logo from "@/components/logo"
import WorkflowSection from '@/components/WorkflowSection'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Logo />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Dashboard
          </Link>
          <Link
            href="/heloc"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            HELOC
          </Link>
          <Link
            href="/auto-loan"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Auto Loans
          </Link>
          <Link
            href="/credit-card"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Credit Cards
          </Link>
          <Link
            href="/goals"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Goals
          </Link>
          <Link
            href="/join"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Join
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <HeroSection />
        <WorkflowSection />
        <FinancialWellnessSection />
        <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Streamlined Member Experience</h2>
              <p className="mt-4 text-gray-500">
                We've redesigned our digital experience to make banking easier, faster, and more accessible.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-navy-700 mb-4" />
                <h3 className="text-xl font-bold">Member Onboarding</h3>
                <p className="mt-2 text-gray-500">
                  Join in minutes with our simplified digital application process. Verify your identity online and start
                  banking right away.
                </p>
                <Link href="/join" className="mt-4 text-navy-700 hover:underline">
                  Join Now
                </Link>
              </div>
              <div className="flex flex-col items-center text-center">
                <BarChart3 className="h-12 w-12 text-navy-700 mb-4" />
                <h3 className="text-xl font-bold">Financial Analytics</h3>
                <p className="mt-2 text-gray-500">
                  Gain insights into your spending habits and financial health with our AI-powered analytics dashboard.
                </p>
                <Link href="/analytics" className="mt-4 text-navy-700 hover:underline">
                  Explore Analytics
                </Link>
              </div>
            </div>
          </div>
        </section>

        <TestimonialSection />
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
                  <Link href="/auto-loan" className="hover:underline">
                    Auto Loans
                  </Link>
                </li>
                <li>
                  <Link href="/credit-card" className="hover:underline">
                    Credit Cards
                  </Link>
                </li>
                <li>
                  <Link href="/join" className="hover:underline">
                    Join Membership
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Tools</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="/dashboard" className="hover:underline">
                    Financial Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/goals" className="hover:underline">
                    Goal Setting
                  </Link>
                </li>
                <li>
                  <Link href="/education" className="hover:underline">
                    Financial Education
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
  )
}
