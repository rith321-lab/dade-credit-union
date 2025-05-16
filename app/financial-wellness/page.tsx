import Link from "next/link"
import { ArrowLeft, BookOpen, Calendar, Calculator, ChevronRight, GraduationCap, LineChart, Presentation, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FinancialWellnessPage() {
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
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Financial Wellness Programs
              </h1>
              <p className="mt-4 text-gray-500 max-w-3xl mx-auto">
                Comprehensive resources to help you achieve financial health and build a secure future.
              </p>
            </div>

            <div className="mb-12">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All Resources</TabsTrigger>
                  <TabsTrigger value="beginners">Beginners</TabsTrigger>
                  <TabsTrigger value="intermediate">Building Wealth</TabsTrigger>
                  <TabsTrigger value="advanced">Planning Ahead</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
                    <ResourceCard 
                      icon={<BookOpen className="h-8 w-8 text-navy-700" />}
                      title="Debt Freedom Guide"
                      description="Learn strategies to eliminate debt and build financial freedom"
                      category="Guide"
                      level="Beginner"
                      link="#"
                    />
                    <ResourceCard 
                      icon={<Video className="h-8 w-8 text-navy-700" />}
                      title="First-Time Homebuyer Course"
                      description="Everything you need to know about buying your first home"
                      category="Video Course"
                      level="Intermediate"
                      link="#"
                    />
                    <ResourceCard 
                      icon={<Calculator className="h-8 w-8 text-navy-700" />}
                      title="Retirement Calculator"
                      description="See how your savings today will grow for tomorrow"
                      category="Tool"
                      level="All Levels"
                      link="#"
                    />
                    <ResourceCard 
                      icon={<Presentation className="h-8 w-8 text-navy-700" />}
                      title="Investing Fundamentals"
                      description="Learn the basics of investing for long-term growth"
                      category="Workshop"
                      level="Beginner"
                      link="#"
                    />
                    <ResourceCard 
                      icon={<GraduationCap className="h-8 w-8 text-navy-700" />}
                      title="College Planning Workshop"
                      description="Strategies for funding higher education"
                      category="Workshop"
                      level="Intermediate"
                      link="#"
                    />
                    <ResourceCard 
                      icon={<LineChart className="h-8 w-8 text-navy-700" />}
                      title="Financial Health Assessment"
                      description="Get a personalized evaluation of your financial situation"
                      category="Tool"
                      level="All Levels"
                      link="#"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="beginners">
                  <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
                    <ResourceCard 
                      icon={<BookOpen className="h-8 w-8 text-navy-700" />}
                      title="Debt Freedom Guide"
                      description="Learn strategies to eliminate debt and build financial freedom"
                      category="Guide"
                      level="Beginner"
                      link="#"
                    />
                    <ResourceCard 
                      icon={<Presentation className="h-8 w-8 text-navy-700" />}
                      title="Investing Fundamentals"
                      description="Learn the basics of investing for long-term growth"
                      category="Workshop"
                      level="Beginner"
                      link="#"
                    />
                    <ResourceCard 
                      icon={<Calculator className="h-8 w-8 text-navy-700" />}
                      title="Budget Builder Tool"
                      description="Create your first budget with our interactive tool"
                      category="Tool"
                      level="Beginner"
                      link="#"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="intermediate">
                  <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
                    <ResourceCard 
                      icon={<Video className="h-8 w-8 text-navy-700" />}
                      title="First-Time Homebuyer Course"
                      description="Everything you need to know about buying your first home"
                      category="Video Course"
                      level="Intermediate"
                      link="#"
                    />
                    <ResourceCard 
                      icon={<GraduationCap className="h-8 w-8 text-navy-700" />}
                      title="College Planning Workshop"
                      description="Strategies for funding higher education"
                      category="Workshop"
                      level="Intermediate"
                      link="#"
                    />
                    <ResourceCard 
                      icon={<Calendar className="h-8 w-8 text-navy-700" />}
                      title="Financial Check-up Session"
                      description="One-on-one session with a financial counselor"
                      category="Service"
                      level="Intermediate"
                      link="#"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="advanced">
                  <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
                    <ResourceCard 
                      icon={<Calculator className="h-8 w-8 text-navy-700" />}
                      title="Retirement Calculator"
                      description="See how your savings today will grow for tomorrow"
                      category="Tool"
                      level="All Levels"
                      link="#"
                    />
                    <ResourceCard 
                      icon={<LineChart className="h-8 w-8 text-navy-700" />}
                      title="Estate Planning Basics"
                      description="Protect your assets and plan for the future"
                      category="Guide"
                      level="Advanced"
                      link="#"
                    />
                    <ResourceCard 
                      icon={<Presentation className="h-8 w-8 text-navy-700" />}
                      title="Tax Strategy Workshop"
                      description="Learn to optimize your tax situation"
                      category="Workshop"
                      level="Advanced"
                      link="#"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Upcoming Financial Wellness Events</h2>
                <p className="text-gray-500 mt-2">Join us for these free events to boost your financial knowledge</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="transition-all hover:shadow-md hover:border-navy-300">
                  <CardHeader className="pb-2">
                    <p className="text-sm font-medium text-navy-700">Jun 15, 2025 • 6:00 PM</p>
                    <CardTitle className="mt-1">First-Time Homebuyers Workshop</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">Learn about down payments, mortgages, and the home buying process.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">Register Now</Button>
                  </CardFooter>
                </Card>
                <Card className="transition-all hover:shadow-md hover:border-navy-300">
                  <CardHeader className="pb-2">
                    <p className="text-sm font-medium text-navy-700">Jun 22, 2025 • 12:00 PM</p>
                    <CardTitle className="mt-1">Lunch & Learn: Credit Building</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">Virtual workshop on understanding and improving your credit score.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">Register Now</Button>
                  </CardFooter>
                </Card>
                <Card className="transition-all hover:shadow-md hover:border-navy-300">
                  <CardHeader className="pb-2">
                    <p className="text-sm font-medium text-navy-700">Jul 8, 2025 • 7:00 PM</p>
                    <CardTitle className="mt-1">Retirement Planning Seminar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">Strategies for maximizing retirement savings at any age.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">Register Now</Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="text-center mt-6">
                <Link href="#" className="text-sm text-navy-700 hover:underline inline-flex items-center">
                  View All Upcoming Events <ChevronRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready for Personalized Financial Guidance?</h2>
              <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
                Schedule a one-on-one session with our certified financial counselors to create a customized plan.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-navy-700 hover:bg-navy-800">
                  Schedule a Consultation
                </Button>
                <Button size="lg" variant="outline">
                  Explore More Resources
                </Button>
              </div>
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

function ResourceCard({ icon, title, description, category, level, link }) {
  return (
    <Card className="transition-all hover:shadow-md hover:border-navy-300">
      <CardHeader className="pb-3">
        {icon}
        <div className="flex items-center justify-between">
          <CardTitle className="mt-2">{title}</CardTitle>
        </div>
        <div className="flex gap-2 mt-1">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-navy-100 text-navy-700 rounded-md">
            {category}
          </span>
          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
            {level}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
      <CardFooter>
        <Link href={link} className="text-sm text-navy-700 hover:underline inline-flex items-center">
          Access Resource <ChevronRight className="ml-1 h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  )
}