import Link from "next/link"
import { ArrowUpDown, Check, Clock, Download, FileText, Filter, Search, Settings, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import HelocApplicationsTable from "@/components/HelocApplicationsTable"
import Logo from "@/components/logo"

export default function BackOfficePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="ml-2 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">Back Office</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#" className="text-sm font-medium text-navy-700">
              Dashboard
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-navy-800">
              Applications
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-navy-800">
              Member Management
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-navy-800">
              Reports
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-navy-800">
              Admin
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50 md:block">
          <div className="flex h-full flex-col">
            <div className="p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-navy-100 p-1">
                  <User className="h-6 w-6 text-navy-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">John Smith</p>
                  <p className="text-xs text-gray-500">Loan Officer</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 p-2">
              <div className="space-y-1">
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md bg-navy-50 px-3 py-2 text-sm font-medium text-navy-700"
                >
                  <FileText className="h-4 w-4" />
                  Applications
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <User className="h-4 w-4" />
                  Member Management
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <Clock className="h-4 w-4" />
                  Pending Tasks
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <Download className="h-4 w-4" />
                  Reports
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </div>
            </nav>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Application Management</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search applications..." className="pl-8" />
              </div>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </div>

            <Tabs defaultValue="heloc">
              <TabsList>
                <TabsTrigger value="heloc">HELOC Applications</TabsTrigger>
                <TabsTrigger value="membership">Membership Applications</TabsTrigger>
                <TabsTrigger value="loans">Loan Applications</TabsTrigger>
              </TabsList>
              <TabsContent value="heloc" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>HELOC Applications</CardTitle>
                    <CardDescription>Manage and process Home Equity Line of Credit applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HelocApplicationsTable />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="membership" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Membership Applications</CardTitle>
                    <CardDescription>Manage and process new membership applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Application ID</TableHead>
                          <TableHead>Applicant</TableHead>
                          <TableHead>Submission Date</TableHead>
                          <TableHead>Account Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>ID Verification</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">MEM-2025-5678</TableCell>
                          <TableCell>Tyler Wilson</TableCell>
                          <TableCell>May 12, 2025</TableCell>
                          <TableCell>Checking & Savings</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                              Pending Review
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Verified
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                Review
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Check className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <X className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">MEM-2025-5677</TableCell>
                          <TableCell>Emma Martinez</TableCell>
                          <TableCell>May 11, 2025</TableCell>
                          <TableCell>Savings</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                              In Progress
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                              Pending
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                Review
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">MEM-2025-5676</TableCell>
                          <TableCell>David Thompson</TableCell>
                          <TableCell>May 10, 2025</TableCell>
                          <TableCell>Checking</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Approved
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Verified
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="loans" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Applications</CardTitle>
                    <CardDescription>Manage and process loan applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Application ID</TableHead>
                          <TableHead>Applicant</TableHead>
                          <TableHead>Submission Date</TableHead>
                          <TableHead>Loan Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">LOAN-2025-9012</TableCell>
                          <TableCell>Jessica Lee</TableCell>
                          <TableCell>May 12, 2025</TableCell>
                          <TableCell>Auto Loan</TableCell>
                          <TableCell>$25,000</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                              Pending Review
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                Review
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">LOAN-2025-9011</TableCell>
                          <TableCell>Kevin Brown</TableCell>
                          <TableCell>May 11, 2025</TableCell>
                          <TableCell>Personal Loan</TableCell>
                          <TableCell>$10,000</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Approved
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">LOAN-2025-9010</TableCell>
                          <TableCell>Maria Gonzalez</TableCell>
                          <TableCell>May 10, 2025</TableCell>
                          <TableCell>Student Loan</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                              In Progress
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                Review
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Application Statistics</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Applications</p>
                        <p className="text-2xl font-bold">124</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">+12%</p>
                        <p className="text-xs text-gray-500">vs. previous period</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Approval Rate</p>
                        <p className="text-2xl font-bold">78%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">+5%</p>
                        <p className="text-xs text-gray-500">vs. previous period</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Average Processing Time</p>
                        <p className="text-2xl font-bold">2.3 days</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">-0.5 days</p>
                        <p className="text-xs text-gray-500">vs. previous period</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Pending tasks content */}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
