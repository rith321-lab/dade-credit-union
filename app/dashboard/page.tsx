'use client';

import { useState } from 'react';
import Link from "next/link";
import { 
  ArrowRight, 
  ArrowUpRight,
  BarChart3, 
  BellRing,
  ChevronUp,
  Clock,
  CreditCard, 
  DollarSign,
  Download, 
  FileText, 
  Home,
  LineChart,
  PieChart, 
  Plus,
  Search,
  Settings, 
  Target,
  User, 
  Users, 
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/logo";
import { ResponsiveContainer, PieChart as PieChartComponent, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Simulated data - in a real app this would come from an API
const accountData = [
  { name: 'Checking', accountNumber: '****1234', balance: 3456.78 },
  { name: 'Savings', accountNumber: '****5678', balance: 12345.67 },
  { name: 'HELOC', accountNumber: '****9012', balance: 50000.00, available: 35000.00 },
  { name: 'Auto Loan', accountNumber: '****3456', balance: -15678.90, nextPayment: '06/15/2025' }
];

const spendingData = [
  { name: 'Housing', value: 1200, color: '#0088FE' },
  { name: 'Food', value: 550, color: '#00C49F' },
  { name: 'Transport', value: 450, color: '#FFBB28' },
  { name: 'Utilities', value: 320, color: '#FF8042' },
  { name: 'Entertainment', value: 280, color: '#A28CFF' },
  { name: 'Other', value: 190, color: '#FF6B6B' }
];

const incomeVsExpense = [
  { name: 'Jan', income: 5300, expense: 4500 },
  { name: 'Feb', income: 5400, expense: 4800 },
  { name: 'Mar', income: 5200, expense: 4300 },
  { name: 'Apr', income: 5800, expense: 4900 },
  { name: 'May', income: 5600, expense: 4700 },
  { name: 'Jun', income: 5900, expense: 5100 }
];

const transactions = [
  { id: 1, description: 'Grocery Store', date: 'May 12, 2025', amount: -78.45, account: 'Checking' },
  { id: 2, description: 'Direct Deposit - Employer', date: 'May 10, 2025', amount: 1250.00, account: 'Checking' },
  { id: 3, description: 'Electric Bill', date: 'May 8, 2025', amount: -124.56, account: 'Checking' },
  { id: 4, description: 'Transfer to Savings', date: 'May 5, 2025', amount: -500.00, account: 'Checking' },
  { id: 5, description: 'Coffee Shop', date: 'May 3, 2025', amount: -5.75, account: 'Checking' }
];

const goals = [
  { id: 1, name: 'Vacation Fund', current: 3250, target: 5000, dueDate: 'Aug 2025', category: 'Lifestyle' },
  { id: 2, name: 'Emergency Fund', current: 6500, target: 10000, dueDate: 'Dec 2025', category: 'Security' },
  { id: 3, name: 'Home Down Payment', current: 12500, target: 30000, dueDate: 'Jun 2026', category: 'Housing' }
];

const financialJourney = [
  { step: 1, name: 'Build Emergency Fund', progress: 100, status: 'completed' },
  { step: 2, name: 'Reduce High-Interest Debt', progress: 75, status: 'in-progress' },
  { step: 3, name: 'Maximize Retirement Contributions', progress: 30, status: 'in-progress' },
  { step: 4, name: 'Diversify Investments', progress: 10, status: 'not-started' }
];

const upcomingBills = [
  { id: 1, name: 'Mortgage Payment', amount: 1450.00, dueDate: 'May 25, 2025', status: 'scheduled' },
  { id: 2, name: 'Auto Loan', amount: 385.75, dueDate: 'May 28, 2025', status: 'scheduled' },
  { id: 3, name: 'Internet Service', amount: 79.99, dueDate: 'May 30, 2025', status: 'not-scheduled' },
  { id: 4, name: 'Phone Bill', amount: 95.50, dueDate: 'Jun 3, 2025', status: 'not-scheduled' }
];

export default function DashboardPage() {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [quickTransferAmount, setQuickTransferAmount] = useState('');
  const [quickTransferAccount, setQuickTransferAccount] = useState('Savings');
  const [showFinancialAssessmentDialog, setShowFinancialAssessmentDialog] = useState(false);

  const handleQuickTransfer = () => {
    // This would connect to an API in a real application
    alert(`Transfer of $${quickTransferAmount} to ${quickTransferAccount} initiated successfully!`);
    setQuickTransferAmount('');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Logo />
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-navy-700">
              Dashboard
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-navy-700">
              Accounts
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-navy-700">
              Transfers
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-navy-700">
              Bill Pay
            </Link>
            <Link href="/education" className="text-sm font-medium hover:text-navy-700">
              Financial Wellness
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <BellRing className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
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
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">Member since 2022</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 p-2">
              <div className="space-y-1">
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md bg-navy-50 px-3 py-2 text-sm font-medium text-navy-700"
                >
                  <BarChart3 className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <CreditCard className="h-4 w-4" />
                  Accounts
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <ArrowRight className="h-4 w-4" />
                  Transfers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <FileText className="h-4 w-4" />
                  Bill Pay
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <Target className="h-4 w-4" />
                  Financial Goals
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <PieChart className="h-4 w-4" />
                  Financial Wellness
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <Users className="h-4 w-4" />
                  Member Services
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
            <div className="border-t p-4">
              <Card className="bg-navy-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Financial Wellness Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-navy-700">72/100</div>
                    <div className="text-xs text-navy-700">Good</div>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-navy-100">
                    <div className="h-2 w-[72%] rounded-full bg-navy-700"></div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-xs text-navy-700 hover:underline"
                    onClick={() => setShowFinancialAssessmentDialog(true)}
                  >
                    Take financial assessment
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="container py-6 px-4 md:px-6">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Financial Dashboard</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-navy-700 hover:bg-navy-800">
                      <Plus className="mr-2 h-4 w-4" />
                      New Transfer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Quick Transfer</DialogTitle>
                      <DialogDescription>
                        Transfer money between your accounts quickly and easily.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="from-account">From Account</Label>
                        <select className="w-full rounded-md border border-gray-300 p-2">
                          <option>Checking (****1234)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="to-account">To Account</Label>
                        <select 
                          className="w-full rounded-md border border-gray-300 p-2"
                          value={quickTransferAccount}
                          onChange={(e) => setQuickTransferAccount(e.target.value)}
                        >
                          <option value="Savings">Savings (****5678)</option>
                          <option value="HELOC">HELOC (****9012)</option>
                          <option value="Auto Loan">Auto Loan (****3456)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                          <Input 
                            id="amount" 
                            placeholder="0.00" 
                            className="pl-7" 
                            value={quickTransferAmount}
                            onChange={(e) => setQuickTransferAmount(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Transfer Date</Label>
                        <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleQuickTransfer}>Transfer Funds</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            {/* Accounts Summary */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {accountData.map((account, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">{account.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      {account.name === 'Checking' && <Wallet className="h-5 w-5 text-blue-600" />}
                      {account.name === 'Savings' && <DollarSign className="h-5 w-5 text-green-600" />}
                      {account.name === 'HELOC' && <Home className="h-5 w-5 text-purple-600" />}
                      {account.name === 'Auto Loan' && <CreditCard className="h-5 w-5 text-red-600" />}
                      <div className="text-2xl font-bold">
                        {account.balance < 0 ? '-' : ''}${Math.abs(account.balance).toFixed(2)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Account #: {account.accountNumber}</p>
                    {account.available && (
                      <p className="text-xs text-gray-500">Available: ${account.available.toFixed(2)}</p>
                    )}
                    {account.nextPayment && (
                      <p className="text-xs text-gray-500">Next payment: {account.nextPayment}</p>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link href="#" className="text-xs text-navy-700 hover:underline flex items-center gap-1">
                      View details <ArrowRight className="h-3 w-3" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Main Content Tabs */}
            <div className="mt-6">
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="goals">Financial Goals</TabsTrigger>
                  <TabsTrigger value="bills">Bill Pay</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>Last 5 transactions across all accounts</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {transactions.slice(0, 3).map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between border-b pb-2">
                              <div>
                                <p className="font-medium">{transaction.description}</p>
                                <p className="text-sm text-gray-500">{transaction.date}</p>
                              </div>
                              <div className="text-right">
                                <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-500">{transaction.account}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button variant="link" className="mt-2 p-0 h-auto">
                          View all transactions <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Monthly Spending</CardTitle>
                        <CardDescription>Breakdown of your expenses this month</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChartComponent>
                              <Pie
                                data={spendingData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={2}
                                dataKey="value"
                              >
                                {spendingData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                            </PieChartComponent>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                          {spendingData.map((category, index) => (
                            <div key={index} className="flex items-center">
                              <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                              <span>{category.name} (${category.value})</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>Income vs. Expenses</CardTitle>
                        <CardDescription>Last 6 months trends</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[240px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={incomeVsExpense} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip formatter={(value) => [`$${value}`, undefined]} />
                              <Legend />
                              <Bar dataKey="income" fill="#4CAF50" name="Income" />
                              <Bar dataKey="expense" fill="#FF5722" name="Expenses" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Upcoming Bills</CardTitle>
                        <CardDescription>Due in the next 30 days</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {upcomingBills.slice(0, 3).map((bill) => (
                            <div key={bill.id} className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{bill.name}</p>
                                <p className="text-sm text-gray-500">${bill.amount.toFixed(2)} · {bill.dueDate}</p>
                              </div>
                              <Badge variant={bill.status === 'scheduled' ? 'outline' : 'secondary'}>
                                {bill.status === 'scheduled' ? 'Scheduled' : 'Pay Now'}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <Button variant="link" className="mt-3 p-0 h-auto">
                          View all bills <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Transactions Tab */}
                <TabsContent value="transactions" className="mt-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Transaction History</CardTitle>
                        <div className="flex items-center gap-2">
                          <select className="rounded-md border border-gray-300 p-1 text-sm">
                            <option>All Accounts</option>
                            <option>Checking</option>
                            <option>Savings</option>
                            <option>HELOC</option>
                          </select>
                          <select className="rounded-md border border-gray-300 p-1 text-sm">
                            <option>Last 30 Days</option>
                            <option>Last 90 Days</option>
                            <option>Year to Date</option>
                            <option>Custom Range</option>
                          </select>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search transactions..."
                          className="w-full rounded-md border border-gray-300 pl-10 py-2"
                        />
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Account</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="font-medium">{transaction.description}</TableCell>
                              <TableCell>{transaction.date}</TableCell>
                              <TableCell>{transaction.account}</TableCell>
                              <TableCell className={`text-right ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="mt-4 flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          Previous
                        </Button>
                        <span className="text-sm text-gray-500">Page 1 of 12</span>
                        <Button variant="outline" size="sm">
                          Next
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t">
                      <div className="flex w-full justify-between">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Export CSV
                        </Button>
                        <Button variant="outline" size="sm">
                          Print Statement
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Financial Goals Tab */}
                <TabsContent value="goals" className="mt-4">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>Your Financial Goals</CardTitle>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" className="bg-navy-700 hover:bg-navy-800">
                                  <Plus className="mr-2 h-4 w-4" />
                                  New Goal
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Create New Financial Goal</DialogTitle>
                                  <DialogDescription>
                                    Set a new financial goal and track your progress.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="goal-name">Goal Name</Label>
                                    <Input id="goal-name" placeholder="e.g., New Car" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="goal-amount">Target Amount</Label>
                                    <div className="relative">
                                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                                      <Input id="goal-amount" placeholder="0.00" className="pl-7" />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="goal-date">Target Date</Label>
                                    <Input id="goal-date" type="date" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="goal-category">Category</Label>
                                    <select className="w-full rounded-md border border-gray-300 p-2">
                                      <option>Savings</option>
                                      <option>Housing</option>
                                      <option>Transportation</option>
                                      <option>Education</option>
                                      <option>Lifestyle</option>
                                      <option>Security</option>
                                    </select>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Create Goal</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {goals.map((goal) => (
                              <div key={goal.id} className="rounded-lg border p-4 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedGoal(goal)}>
                                <div className="flex items-center justify-between mb-2">
                                  <div>
                                    <h3 className="font-semibold">{goal.name}</h3>
                                    <p className="text-sm text-gray-500">Due: {goal.dueDate}</p>
                                  </div>
                                  <Badge>{goal.category}</Badge>
                                </div>
                                <div className="mb-1 flex items-center justify-between">
                                  <p className="text-sm text-gray-600">Progress</p>
                                  <p className="text-sm font-medium">${goal.current.toLocaleString()} <span className="text-gray-500">/ ${goal.target.toLocaleString()}</span></p>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                  <div
                                    className="h-full rounded-full bg-navy-700"
                                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                                  />
                                </div>
                                <p className="mt-1 text-right text-xs text-gray-500">
                                  {Math.round((goal.current / goal.target) * 100)}% Complete
                                </p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <Card>
                        <CardHeader>
                          <CardTitle>Goal Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {selectedGoal ? (
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-lg font-semibold">{selectedGoal.name}</h3>
                                <Badge className="mt-1">{selectedGoal.category}</Badge>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Target Amount</p>
                                <p className="text-xl font-bold">${selectedGoal.target.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Current Progress</p>
                                <p className="text-xl font-bold">${selectedGoal.current.toLocaleString()} <span className="text-sm text-gray-500">({Math.round((selectedGoal.current / selectedGoal.target) * 100)}%)</span></p>
                                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                  <div
                                    className="h-full rounded-full bg-navy-700"
                                    style={{ width: `${(selectedGoal.current / selectedGoal.target) * 100}%` }}
                                  />
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Remaining</p>
                                <p className="text-xl font-bold">${(selectedGoal.target - selectedGoal.current).toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Target Date</p>
                                <p className="font-medium">{selectedGoal.dueDate}</p>
                              </div>
                              <div className="pt-4 space-y-2">
                                <Button className="w-full bg-navy-700 hover:bg-navy-800">
                                  Add Funds
                                </Button>
                                <Button variant="outline" className="w-full">
                                  Edit Goal
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center p-8 text-center">
                              <Target className="h-12 w-12 text-gray-300 mb-2" />
                              <h3 className="text-lg font-semibold">No Goal Selected</h3>
                              <p className="text-sm text-gray-500">Select a goal to view details</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="mt-6">
                        <CardHeader>
                          <CardTitle>Suggested Goals</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="rounded-lg border p-3 hover:bg-gray-50 cursor-pointer">
                              <h3 className="font-semibold">Emergency Fund</h3>
                              <p className="text-sm text-gray-500">Recommended: $15,000</p>
                            </div>
                            <div className="rounded-lg border p-3 hover:bg-gray-50 cursor-pointer">
                              <h3 className="font-semibold">Retirement Savings</h3>
                              <p className="text-sm text-gray-500">Boost your long-term security</p>
                            </div>
                            <div className="rounded-lg border p-3 hover:bg-gray-50 cursor-pointer">
                              <h3 className="font-semibold">Debt Payoff</h3>
                              <p className="text-sm text-gray-500">Accelerate loan repayment</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Bill Pay Tab */}
                <TabsContent value="bills" className="mt-4">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>Upcoming Bills</CardTitle>
                            <Button size="sm" className="bg-navy-700 hover:bg-navy-800">
                              <Plus className="mr-2 h-4 w-4" />
                              Add Payee
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Bill</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {upcomingBills.map((bill) => (
                                <TableRow key={bill.id}>
                                  <TableCell className="font-medium">{bill.name}</TableCell>
                                  <TableCell>${bill.amount.toFixed(2)}</TableCell>
                                  <TableCell>{bill.dueDate}</TableCell>
                                  <TableCell>
                                    <Badge variant={bill.status === 'scheduled' ? 'default' : 'outline'}>
                                      {bill.status === 'scheduled' ? 'Scheduled' : 'Not Scheduled'}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {bill.status === 'scheduled' ? (
                                      <Button variant="ghost" size="sm">
                                        Modify
                                      </Button>
                                    ) : (
                                      <Button size="sm" className="bg-navy-700 hover:bg-navy-800">
                                        Pay Now
                                      </Button>
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>

                      <Card className="mt-6">
                        <CardHeader>
                          <CardTitle>Payment History</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Payee</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date Paid</TableHead>
                                <TableHead>From Account</TableHead>
                                <TableHead className="text-right">Receipt</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">Electric Company</TableCell>
                                <TableCell>$124.56</TableCell>
                                <TableCell>Apr 15, 2025</TableCell>
                                <TableCell>Checking</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Water Utility</TableCell>
                                <TableCell>$68.75</TableCell>
                                <TableCell>Apr 10, 2025</TableCell>
                                <TableCell>Checking</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Internet Service</TableCell>
                                <TableCell>$79.99</TableCell>
                                <TableCell>Apr 5, 2025</TableCell>
                                <TableCell>Checking</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <Card>
                        <CardHeader>
                          <CardTitle>Quick Pay</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="quick-pay-payee">Select Payee</Label>
                              <select className="w-full rounded-md border border-gray-300 p-2">
                                <option>Select a payee</option>
                                <option>Mortgage Company</option>
                                <option>Electric Company</option>
                                <option>Water Utility</option>
                                <option>Internet Service</option>
                                <option>Phone Company</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quick-pay-amount">Amount</Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                                <Input id="quick-pay-amount" placeholder="0.00" className="pl-7" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quick-pay-date">Payment Date</Label>
                              <Input id="quick-pay-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quick-pay-account">From Account</Label>
                              <select className="w-full rounded-md border border-gray-300 p-2">
                                <option>Checking (****1234)</option>
                                <option>Savings (****5678)</option>
                              </select>
                            </div>
                            <Button className="w-full bg-navy-700 hover:bg-navy-800">
                              Schedule Payment
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="mt-6">
                        <CardHeader>
                          <CardTitle>Automatic Payments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Mortgage</p>
                                <p className="text-sm text-gray-500">Monthly on the 1st</p>
                              </div>
                              <Badge variant="outline">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Auto Loan</p>
                                <p className="text-sm text-gray-500">Monthly on the 15th</p>
                              </div>
                              <Badge variant="outline">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Netflix</p>
                                <p className="text-sm text-gray-500">Monthly on the 22nd</p>
                              </div>
                              <Badge variant="outline">Active</Badge>
                            </div>
                            <Button variant="outline" className="w-full">
                              Manage Automatic Payments
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Insights Tab */}
                <TabsContent value="insights" className="mt-4">
                  <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>Financial Wellness Journey</CardTitle>
                        <CardDescription>Your path to financial freedom</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {financialJourney.map((step) => (
                            <div key={step.step} className="flex items-start">
                              <div className={`mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                step.status === 'completed' ? 'bg-navy-700' : 
                                step.status === 'in-progress' ? 'bg-navy-500' : 'bg-gray-300'
                              } text-white`}>
                                {step.step}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium">{step.name}</p>
                                  <p className="text-sm font-medium">
                                    {step.progress}% Complete
                                  </p>
                                </div>
                                <div className="mt-1 h-2 w-full rounded-full bg-navy-100">
                                  <div 
                                    className="h-2 rounded-full bg-navy-700"
                                    style={{ width: `${step.progress}%` }}
                                  ></div>
                                </div>
                                {step.status === 'in-progress' && (
                                  <Link href="#" className="mt-2 text-sm text-navy-700 hover:underline inline-flex items-center">
                                    Continue your progress <ArrowRight className="ml-1 h-3 w-3" />
                                  </Link>
                                )}
                                {step.status === 'not-started' && (
                                  <Link href="#" className="mt-2 text-sm text-navy-700 hover:underline inline-flex items-center">
                                    Get started <ArrowRight className="ml-1 h-3 w-3" />
                                  </Link>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Financial Insights</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                              <div className="rounded-full bg-blue-50 p-1">
                                <ArrowUpRight className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">Spending Trend Alert</p>
                                <p className="text-sm text-gray-500">Your dining expenses increased by 15% compared to last month.</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="rounded-full bg-green-50 p-1">
                                <ChevronUp className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium">Savings Opportunity</p>
                                <p className="text-sm text-gray-500">You could save $45/month by refinancing your auto loan at current rates.</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="rounded-full bg-yellow-50 p-1">
                                <Clock className="h-5 w-5 text-yellow-600" />
                              </div>
                              <div>
                                <p className="font-medium">Bill Alert</p>
                                <p className="text-sm text-gray-500">Your mortgage payment is due in 5 days. Ensure sufficient funds are available.</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="rounded-full bg-purple-50 p-1">
                                <LineChart className="h-5 w-5 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium">Credit Score Update</p>
                                <p className="text-sm text-gray-500">Your credit score improved by 15 points in the last 3 months.</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Recommended For You</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="rounded-lg border p-3">
                              <h3 className="font-semibold">High-Yield Savings</h3>
                              <p className="text-sm text-gray-500">Earn 4.25% APY with our premium savings account</p>
                              <Link href="#" className="mt-2 text-sm text-blue-600 hover:underline inline-flex items-center">
                                Learn more <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </div>
                            <div className="rounded-lg border p-3">
                              <h3 className="font-semibold">Debt Consolidation</h3>
                              <p className="text-sm text-gray-500">Simplify payments and potentially save on interest</p>
                              <Link href="#" className="mt-2 text-sm text-blue-600 hover:underline inline-flex items-center">
                                Learn more <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </div>
                            <div className="rounded-lg border p-3">
                              <h3 className="font-semibold">Financial Coaching</h3>
                              <p className="text-sm text-gray-500">Free 30-minute session with a certified advisor</p>
                              <Link href="#" className="mt-2 text-sm text-blue-600 hover:underline inline-flex items-center">
                                Schedule now <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      {/* Financial Assessment Dialog */}
      <Dialog open={showFinancialAssessmentDialog} onOpenChange={setShowFinancialAssessmentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Financial Wellness Assessment</DialogTitle>
            <DialogDescription>
              Take our 5-minute assessment to get personalized recommendations.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>What are your top financial priorities?</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="priority-1" />
                    <label htmlFor="priority-1">Building emergency savings</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="priority-2" />
                    <label htmlFor="priority-2">Paying off debt</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="priority-3" />
                    <label htmlFor="priority-3">Saving for retirement</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="priority-4" />
                    <label htmlFor="priority-4">Buying a home</label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>How comfortable are you with your current financial situation?</Label>
                <select className="w-full rounded-md border border-gray-300 p-2">
                  <option>Very uncomfortable</option>
                  <option>Somewhat uncomfortable</option>
                  <option>Neutral</option>
                  <option>Somewhat comfortable</option>
                  <option>Very comfortable</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Do you have a monthly budget?</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="budget-yes" name="has-budget" />
                    <label htmlFor="budget-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="budget-no" name="has-budget" />
                    <label htmlFor="budget-no">No</label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>How much do you save each month?</Label>
                <select className="w-full rounded-md border border-gray-300 p-2">
                  <option>I don't save regularly</option>
                  <option>Less than $100</option>
                  <option>$100 - $250</option>
                  <option>$251 - $500</option>
                  <option>$501 - $1,000</option>
                  <option>More than $1,000</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowFinancialAssessmentDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-navy-700 hover:bg-navy-800">
              Continue to Next Questions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}