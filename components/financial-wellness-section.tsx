import Link from "next/link"
import { ArrowRight, BookOpen, Calculator, LineChart, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function FinancialWellnessSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Financial Wellness Center</h2>
          <p className="mt-4 text-gray-500">
            Take control of your financial future with our comprehensive education and planning resources.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-all hover:shadow-md hover:border-navy-300">
            <CardHeader className="pb-2">
              <BookOpen className="h-8 w-8 text-navy-700" />
              <CardTitle className="mt-2 text-navy-700">Learning Center</CardTitle>
              <CardDescription>Educational articles and guides</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                <li>• Budgeting basics</li>
                <li>• Credit score improvement</li>
                <li>• Debt management</li>
                <li>• Investment fundamentals</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/education" className="text-sm text-navy-700 hover:underline">
                Browse Articles <ArrowRight className="ml-1 h-3 w-3 inline" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="transition-all hover:shadow-md hover:border-navy-300">
            <CardHeader className="pb-2">
              <Video className="h-8 w-8 text-navy-700" />
              <CardTitle className="mt-2 text-navy-700">Video Courses</CardTitle>
              <CardDescription>On-demand financial education</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                <li>• First-time homebuyer</li>
                <li>• Retirement planning</li>
                <li>• Student loan strategies</li>
                <li>• Building wealth in your 20s</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/education" className="text-sm text-navy-700 hover:underline">
                Watch Now <ArrowRight className="ml-1 h-3 w-3 inline" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="transition-all hover:shadow-md hover:border-navy-300">
            <CardHeader className="pb-2">
              <Calculator className="h-8 w-8 text-navy-700" />
              <CardTitle className="mt-2 text-navy-700">Financial Tools</CardTitle>
              <CardDescription>Interactive calculators and planners</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                <li>• Loan payment calculator</li>
                <li>• Retirement savings planner</li>
                <li>• Debt payoff calculator</li>
                <li>• Budget worksheet</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/education" className="text-sm text-navy-700 hover:underline">
                Use Tools <ArrowRight className="ml-1 h-3 w-3 inline" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="transition-all hover:shadow-md hover:border-navy-300">
            <CardHeader className="pb-2">
              <LineChart className="h-8 w-8 text-navy-700" />
              <CardTitle className="mt-2 text-navy-700">Personal Coaching</CardTitle>
              <CardDescription>One-on-one financial guidance</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                <li>• Personalized action plan</li>
                <li>• Goal setting assistance</li>
                <li>• Progress tracking</li>
                <li>• Regular check-ins</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/financial-wellness" className="text-sm text-navy-700 hover:underline">
                Book Session <ArrowRight className="ml-1 h-3 w-3 inline" />
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="mt-12 text-center">
          <Link href="/financial-wellness">
            <Button size="lg" className="bg-navy-700 hover:bg-navy-800">
              Explore All Financial Wellness Resources
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
