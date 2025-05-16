import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-navy-800 to-navy-600 py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
              Banking That Grows With You
            </h1>
            <p className="mx-auto max-w-[800px] text-white/90 text-lg md:text-xl">
              Join Dade County Federal Credit Union and discover financial solutions designed for every stage of your
              life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link href="/join">
                <Button size="lg" className="bg-white text-navy-700 hover:bg-gray-100 px-8">
                  Join Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/heloc">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Explore HELOC
                </Button>
              </Link>
            </div>
            <p className="text-white/80 mt-4">New members can open an account in less than 10 minutes.</p>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-navy-900/20 to-transparent"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-navy-500/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-navy-500/10 blur-3xl"></div>
      </div>
    </section>
  )
}
