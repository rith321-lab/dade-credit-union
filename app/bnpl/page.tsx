import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { AlertTriangle, CheckCircle, CreditCardIcon, ExternalLink, ShieldCheck } from 'lucide-react';

export default function BnplPage() {
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
            <Link href="/education" className="text-sm font-medium hover:underline">
              Financial Education
            </Link>
            <Link href="/bnpl" className="text-sm font-medium text-navy-700 underline">
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
        <section className="bg-navy-700 text-white py-12 md:py-16">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Understanding Buy Now, Pay Later (BNPL)</h1>
            <p className="mt-4 max-w-3xl mx-auto md:text-xl">
              Learn about the popular "Buy Now, Pay Later" services, their benefits, potential pitfalls, and how to use them responsibly.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6 space-y-10">

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold tracking-tight text-navy-800 mb-4">What is Buy Now, Pay Later?</h2>
              <p className="text-gray-700 leading-relaxed">
                "Buy Now, Pay Later" (BNPL) services (like Affirm, Afterpay, Klarna) have gained immense popularity as an alternative to traditional credit cards. They allow consumers to purchase goods and services immediately and pay for them over a period through fixed installments. Often, these plans are advertised as interest-free if payments are made on time, making them an attractive option for managing expenses without a large upfront cost.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="text-xl font-semibold text-green-700 mb-2">The Appeal of BNPL</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li><strong>Immediate Gratification:</strong> Get what you want now without waiting or saving up.</li>
                  <li><strong>Budget-Friendly Payments:</strong> Spread the cost over several smaller, often interest-free, installments.</li>
                  <li><strong>Simple Approval:</strong> Often easier and quicker to get approved than traditional credit.</li>
                  <li><strong>Convenience:</strong> Integrated into many online checkout processes.</li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <AlertTriangle className="h-8 w-8 text-red-600 mb-3" />
                <h3 className="text-xl font-semibold text-red-700 mb-2">Potential Downsides & Hidden Costs</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li><strong>Late Fees:</strong> Missed payments can result in significant late fees, increasing the total cost.</li>
                  <li><strong>Credit Score Impact:</strong> Some BNPL providers report to credit bureaus, so missed payments can negatively affect your credit score.</li>
                  <li><strong>Overspending Temptation:</strong> The ease of BNPL can encourage impulse buys and lead to debt accumulation.</li>
                  <li><strong>Overdraft Risk:</strong> Automatic payments can lead to overdrafts if your account balance is low.</li>
                  <li><strong>Complex Terms:</strong> It's crucial to read and understand the fine print of each BNPL agreement.</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold tracking-tight text-navy-800 mb-4">Using BNPL Wisely & Exploring Alternatives</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While BNPL can be a useful tool, it's essential to approach it with caution. Treat BNPL as any other form of credit and ensure you can comfortably afford the repayments within your budget. Avoid using it for non-essential impulse purchases. 
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Dade County Federal Credit Union, we offer financial tools that provide flexibility and security, such as our <Link href="#dcfcu-credit-card" className="text-navy-600 hover:underline font-medium">DCFCU Visa Platinum credit card</Link>. With features like low interest rates and rewards, a traditional credit card can be a reliable way to manage purchases while building a strong credit history.
              </p>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                 <ShieldCheck className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Need Guidance?</h3>
                <p className="text-gray-700">
                  If you find yourself struggling with BNPL payments or want to create a healthier budget, connect with our trusted nonprofit partner, <Link href="https://www.dcfcu.org/blog/2020/12/1/the-importance-of-being-financially-fit" target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:underline font-medium">GreenPath Financial Wellness</Link>. Their certified financial experts can provide free, confidential counseling and help you achieve your financial goals.
                </p>
                <Button asChild className="mt-4 bg-navy-700 hover:bg-navy-800">
                  <Link href="https://www.dcfcu.org/blog/buy-now-pay-later-the-cost-of-convenience" target="_blank">
                    Read Our BNPL Article <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
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
                <li><Link href="/heloc" className="hover:underline">HELOC</Link></li>
                <li><Link href="#" className="hover:underline">Checking Accounts</Link></li>
                <li><Link href="#" className="hover:underline">Savings Accounts</Link></li>
                <li><Link href="#" className="hover:underline">Auto Loans</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Resources</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-500">
                <li><Link href="/education" className="hover:underline">Financial Wellness</Link></li>
                <li><Link href="https://www.dcfcu.org/blog/2020/12/1/the-importance-of-being-financially-fit" target="_blank" className="hover:underline">Greepath Planning</Link></li>
                <li><Link href="#" className="hover:underline">Gen Z Financial Guide</Link></li>
                <li><Link href="/heloc#calculator" className="hover:underline">Calculators</Link></li>
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