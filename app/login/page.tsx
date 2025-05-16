"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

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
            <Link href="/auto-loan" className="text-sm font-medium hover:underline">
              Auto Loans
            </Link>
            <Link href="/credit-card" className="text-sm font-medium hover:underline">
              Credit Cards
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

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login to your account</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Account Number</Label>
                <Input id="email" placeholder="name@example.com" type="text" autoComplete="username" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-xs text-navy-700 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-1"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              <Button className="w-full bg-navy-700 hover:bg-navy-800" disabled={isLoading} type="submit">
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center w-full text-sm">
              Don't have an account?{" "}
              <Link href="/join" className="text-navy-700 hover:underline font-medium">
                Join Today
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>

      <footer className="border-t bg-gray-50">
        <div className="container px-4 py-8 md:px-6">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 Dade County Federal Credit Union. All rights reserved.</p>
            <p className="mt-2">
              <Link href="#" className="text-navy-700 hover:underline">
                Privacy Policy
              </Link>{" "}
              |
              <Link href="#" className="text-navy-700 hover:underline ml-2">
                Terms of Service
              </Link>{" "}
              |
              <Link href="#" className="text-navy-700 hover:underline ml-2">
                Contact Us
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}