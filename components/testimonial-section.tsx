import { Card, CardContent } from "@/components/ui/card"

export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "The financial education resources helped me understand how to build credit as a college student. Now I'm on track to buy my first home!",
      name: "Maya J.",
      role: "Member since 2022",
      avatar: "/young-woman-curly-hair.png",
    },
    {
      quote:
        "The HELOC application process was incredibly smooth. I was approved within days and used the funds to renovate my kitchen.",
      name: "Carlos R.",
      role: "Member since 2018",
      avatar: "/middle-aged-man-glasses.png",
    },
    {
      quote:
        "As a Gen Z member, I appreciate how Dade County FCU makes banking accessible through their mobile app and educational content.",
      name: "Tyler W.",
      role: "Member since 2023",
      avatar: "/placeholder-user.jpg",
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Members Say</h2>
          <p className="mt-4 text-gray-500">
            Hear from members who have transformed their financial lives with Dade County FCU.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-md hover:border-navy-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-navy-200">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <blockquote className="mt-4">
                    <p className="text-gray-700">"{testimonial.quote}"</p>
                  </blockquote>
                  <div className="mt-4">
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
