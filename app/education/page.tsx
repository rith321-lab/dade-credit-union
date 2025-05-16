import Link from "next/link"
import { ArrowLeft, BookOpen, Calculator, LineChart, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function EducationPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Link href="/" className="flex items-center text-sm text-navy-700 hover:underline">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Link>
          </div>
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Financial Education Center
              </h1>
              <p className="mt-4 text-gray-500 max-w-3xl mx-auto">
                Access expert resources, calculators, and personalized coaching to improve your financial literacy
                and achieve your financial goals.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <Card className="transition-all hover:shadow-md hover:border-navy-300">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-navy-700" />
                  <CardTitle className="mt-2 text-navy-700">Learning Center</CardTitle>
                  <CardDescription>
                    Educational articles and guides to help you understand financial concepts and make informed decisions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Understanding Credit Scores and Reports</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Budgeting Basics: Creating a Plan That Works</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Saving for Major Life Events</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Debt Management and Reduction Strategies</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Investment Fundamentals for Beginners</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Browse All Articles</Button>
                </CardFooter>
              </Card>

              <Card className="transition-all hover:shadow-md hover:border-navy-300">
                <CardHeader>
                  <Video className="h-8 w-8 text-navy-700" />
                  <CardTitle className="mt-2 text-navy-700">Video Courses</CardTitle>
                  <CardDescription>
                    On-demand video courses covering essential financial topics for all life stages.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>First-Time Homebuyer's Guide</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Retirement Planning: Start Early, Finish Strong</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Student Loan Repayment Strategies</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Building Wealth in Your 20s and 30s</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Teaching Kids About Money Management</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Access Video Library</Button>
                </CardFooter>
              </Card>

              <Card className="transition-all hover:shadow-md hover:border-navy-300">
                <CardHeader>
                  <Calculator className="h-8 w-8 text-navy-700" />
                  <CardTitle className="mt-2 text-navy-700">Financial Tools</CardTitle>
                  <CardDescription>
                    Interactive calculators and planners to help you visualize and plan your financial decisions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Loan Payment Calculator</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Retirement Savings Calculator</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Debt Payoff Calculator</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Home Affordability Calculator</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Budget Worksheet</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Use Financial Tools</Button>
                </CardFooter>
              </Card>

              <Card className="transition-all hover:shadow-md hover:border-navy-300">
                <CardHeader>
                  <LineChart className="h-8 w-8 text-navy-700" />
                  <CardTitle className="mt-2 text-navy-700">Personal Coaching</CardTitle>
                  <CardDescription>
                    One-on-one guidance from certified financial counselors to help you achieve your goals.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Personalized Financial Action Plan</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Goal Setting and Prioritization</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Progress Tracking and Accountability</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Life Transition Planning</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-navy-700" />
                      <span>Debt Management Counseling</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Schedule a Session</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Take Control of Your Financial Future?</h2>
              <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
                Access all our educational resources, attend webinars, and connect with our financial experts.
              </p>
              <Button size="lg" className="bg-navy-700 hover:bg-navy-800">
                Become a Member Today
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container px-4 py-6 md:px-6 text-center text-sm text-gray-500">
          <p>© 2025 Dade County Federal Credit Union. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}