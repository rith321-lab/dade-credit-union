'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Clock, DollarSign, Home, Target, Car, GraduationCap, Gem, TrendingUp, AlertTriangle, FileEdit, Trash2, Plus, BarChart, Calendar, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/logo';

// Types for goals
interface GoalData {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  frequency: 'weekly' | 'biweekly' | 'monthly';
  autoContribution: boolean;
  contributionAmount: number;
}

// Mock initial goals data
const initialGoals: GoalData[] = [
  {
    id: 'goal1',
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 3500,
    targetDate: '2025-12-31',
    category: 'security',
    priority: 'high',
    frequency: 'monthly',
    autoContribution: true,
    contributionAmount: 300,
  },
  {
    id: 'goal2',
    name: 'Vacation to Europe',
    targetAmount: 5000,
    currentAmount: 2000,
    targetDate: '2025-07-15',
    category: 'travel',
    priority: 'medium',
    frequency: 'biweekly',
    autoContribution: true,
    contributionAmount: 150,
  },
  {
    id: 'goal3',
    name: 'New Car Down Payment',
    targetAmount: 8000,
    currentAmount: 1200,
    targetDate: '2026-03-01',
    category: 'transportation',
    priority: 'medium',
    frequency: 'monthly',
    autoContribution: true,
    contributionAmount: 200,
  },
  {
    id: 'goal4',
    name: 'Down Payment for House',
    targetAmount: 50000,
    currentAmount: 15000,
    targetDate: '2027-06-30',
    category: 'housing',
    priority: 'high',
    frequency: 'monthly',
    autoContribution: true,
    contributionAmount: 500,
  },
];

// Goal categories with icons and colors
const goalCategories = [
  { id: 'security', name: 'Emergency Fund', icon: Shield, color: 'bg-blue-500', textColor: 'text-blue-500', description: 'Build financial security' },
  { id: 'housing', name: 'Housing', icon: Home, color: 'bg-green-500', textColor: 'text-green-500', description: 'Save for a home or improvements' },
  { id: 'transportation', name: 'Transportation', icon: Car, color: 'bg-orange-500', textColor: 'text-orange-500', description: 'Vehicle purchase or repair' },
  { id: 'education', name: 'Education', icon: GraduationCap, color: 'bg-purple-500', textColor: 'text-purple-500', description: 'Tuition and learning expenses' },
  { id: 'travel', name: 'Travel', icon: Plane, color: 'bg-pink-500', textColor: 'text-pink-500', description: 'Vacation and travel funds' },
  { id: 'retirement', name: 'Retirement', icon: Gem, color: 'bg-amber-500', textColor: 'text-amber-500', description: 'Supplement retirement savings' },
  { id: 'investment', name: 'Investment', icon: TrendingUp, color: 'bg-cyan-500', textColor: 'text-cyan-500', description: 'Investment opportunities' },
  { id: 'other', name: 'Other', icon: Target, color: 'bg-gray-500', textColor: 'text-gray-500', description: 'Custom savings goals' },
];

// Contribution template suggestions
const contributionTemplates = [
  { name: 'Aggressive Saving', description: 'Reach your goal quickly', percentOfIncome: 15, minAmount: 200 },
  { name: 'Balanced Approach', description: 'Consistent steady progress', percentOfIncome: 10, minAmount: 100 },
  { name: 'Gentle Start', description: 'Start small and build up', percentOfIncome: 5, minAmount: 50 },
];

// Dashboard statistics
const dashboardStats = {
  totalSaved: 21700,
  totalGoals: 4,
  activeGoals: 4,
  completedGoals: 0,
  averageProgress: 32,
  shortestGoal: 'Vacation to Europe',
  monthlyContributions: 1150,
  projectedYearlySavings: 13800,
};

function Shield(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>;
}

function Plane(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" /></svg>;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<GoalData[]>(initialGoals);
  const [selectedGoal, setSelectedGoal] = useState<GoalData | null>(null);
  const [isNewGoalDialogOpen, setIsNewGoalDialogOpen] = useState(false);
  const [isEditGoalDialogOpen, setIsEditGoalDialogOpen] = useState(false);
  const [isContributeDialogOpen, setIsContributeDialogOpen] = useState(false);
  const [isGoalDetailDialogOpen, setIsGoalDetailDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newGoalData, setNewGoalData] = useState<Partial<GoalData>>({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    targetDate: '',
    category: '',
    priority: 'medium',
    frequency: 'monthly',
    autoContribution: false,
    contributionAmount: 0,
  });
  const [contributionAmount, setContributionAmount] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Handle selecting a goal
  const handleSelectGoal = (goal: GoalData) => {
    setSelectedGoal(goal);
    setIsGoalDetailDialogOpen(true);
  };
  
  // Handle create new goal
  const handleCreateGoal = () => {
    // Create a new goal with unique ID
    const newGoal: GoalData = {
      id: `goal${goals.length + 1}`,
      name: newGoalData.name || 'New Goal',
      targetAmount: newGoalData.targetAmount || 1000,
      currentAmount: newGoalData.currentAmount || 0,
      targetDate: newGoalData.targetDate || '2025-12-31',
      category: newGoalData.category || 'other',
      priority: newGoalData.priority || 'medium',
      frequency: newGoalData.frequency || 'monthly',
      autoContribution: newGoalData.autoContribution || false,
      contributionAmount: newGoalData.contributionAmount || 0,
    };
    
    // Add to goals list
    setGoals([...goals, newGoal]);
    
    // Reset form and close dialog
    setNewGoalData({});
    setIsNewGoalDialogOpen(false);
  };
  
  // Handle edit goal
  const handleEditGoal = () => {
    if (!selectedGoal) return;
    
    // Update the goal data
    const updatedGoals = goals.map(goal => 
      goal.id === selectedGoal.id ? { ...selectedGoal } : goal
    );
    
    setGoals(updatedGoals);
    setIsEditGoalDialogOpen(false);
  };
  
  // Handle delete goal
  const handleDeleteGoal = () => {
    if (!selectedGoal) return;
    
    const updatedGoals = goals.filter(goal => goal.id !== selectedGoal.id);
    setGoals(updatedGoals);
    
    setIsDeleteDialogOpen(false);
    setIsGoalDetailDialogOpen(false);
    setSelectedGoal(null);
  };
  
  // Handle make contribution
  const handleContribute = () => {
    if (!selectedGoal || !contributionAmount) return;
    
    const amount = parseFloat(contributionAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    // Update the goal with the contribution
    const updatedGoal = {
      ...selectedGoal,
      currentAmount: selectedGoal.currentAmount + amount
    };
    
    // Update goals list
    const updatedGoals = goals.map(goal => 
      goal.id === selectedGoal.id ? updatedGoal : goal
    );
    
    setGoals(updatedGoals);
    setSelectedGoal(updatedGoal);
    setContributionAmount('');
    setIsContributeDialogOpen(false);
  };
  
  // Apply contribution template
  const applyTemplate = (template: any) => {
    // Assuming a monthly income of $5000 for this example
    const monthlyIncome = 5000;
    const suggestedAmount = Math.max(
      template.minAmount,
      (monthlyIncome * template.percentOfIncome) / 100
    );
    
    setNewGoalData({
      ...newGoalData,
      autoContribution: true,
      contributionAmount: suggestedAmount,
      frequency: 'monthly'
    });
  };
  
  // Calculate days remaining until target date
  const getDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const timeDiff = target.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  };
  
  // Calculate progress percentage
  const getProgressPercentage = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    return Math.min(percentage, 100);
  };
  
  // Get estimated completion date based on contribution rate
  const getEstimatedCompletionDate = (goal: GoalData) => {
    if (!goal.autoContribution || goal.contributionAmount <= 0) {
      return 'Unknown - no auto-contributions set';
    }
    
    const remaining = goal.targetAmount - goal.currentAmount;
    if (remaining <= 0) return 'Goal complete!';
    
    let contributionsPerYear;
    switch (goal.frequency) {
      case 'weekly':
        contributionsPerYear = 52;
        break;
      case 'biweekly':
        contributionsPerYear = 26;
        break;
      case 'monthly':
      default:
        contributionsPerYear = 12;
        break;
    }
    
    const yearlyContribution = goal.contributionAmount * contributionsPerYear;
    const yearsToComplete = remaining / yearlyContribution;
    const monthsToComplete = Math.ceil(yearsToComplete * 12);
    
    const today = new Date();
    const estimatedDate = new Date(today);
    estimatedDate.setMonth(today.getMonth() + monthsToComplete);
    
    return estimatedDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };
  
  // Get category icon
  const getCategoryIcon = (categoryId: string) => {
    const category = goalCategories.find(cat => cat.id === categoryId);
    if (!category) return Target;
    return category.icon;
  };
  
  // Get category color
  const getCategoryColor = (categoryId: string) => {
    const category = goalCategories.find(cat => cat.id === categoryId);
    if (!category) return 'bg-gray-500';
    return category.color;
  };
  
  // Get category text color
  const getCategoryTextColor = (categoryId: string) => {
    const category = goalCategories.find(cat => cat.id === categoryId);
    if (!category) return 'text-gray-500';
    return category.textColor;
  };
  
  // Get category name
  const getCategoryName = (categoryId: string) => {
    const category = goalCategories.find(cat => cat.id === categoryId);
    if (!category) return 'Other';
    return category.name;
  };
  
  // Filter goals by category
  const filteredGoals = filterCategory === 'all' 
    ? goals 
    : goals.filter(goal => goal.category === filterCategory);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b py-4">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="font-bold text-lg text-navy-700">
            <Logo />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:text-navy-700">
              Dashboard
            </Link>
            <Link href="/goals" className="text-sm font-medium text-navy-700">
              Financial Goals
            </Link>
            <Link href="/education" className="text-sm font-medium hover:text-navy-700">
              Financial Education
            </Link>
          </nav>
          <div>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-navy-700">Financial Goals</h1>
              <p className="text-gray-600">Track and manage your savings goals</p>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {goalCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isNewGoalDialogOpen} onOpenChange={setIsNewGoalDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-navy-700 hover:bg-navy-800">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Goal
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Create a New Financial Goal</DialogTitle>
                    <DialogDescription>
                      Set up a new savings goal to track your progress towards your financial objectives.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="goal-name">Goal Name</Label>
                        <Input 
                          id="goal-name" 
                          placeholder="e.g., Emergency Fund" 
                          value={newGoalData.name || ''}
                          onChange={(e) => setNewGoalData({...newGoalData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="goal-category">Category</Label>
                        <Select 
                          value={newGoalData.category || ''}
                          onValueChange={(value) => setNewGoalData({...newGoalData, category: value})}
                        >
                          <SelectTrigger id="goal-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {goalCategories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="target-amount">Target Amount</Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                          <Input 
                            id="target-amount" 
                            className="pl-7" 
                            type="number" 
                            placeholder="0.00"
                            value={newGoalData.targetAmount || ''}
                            onChange={(e) => setNewGoalData({...newGoalData, targetAmount: parseFloat(e.target.value)})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="initial-amount">Initial Deposit (Optional)</Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                          <Input 
                            id="initial-amount" 
                            className="pl-7" 
                            type="number" 
                            placeholder="0.00"
                            value={newGoalData.currentAmount || ''}
                            onChange={(e) => setNewGoalData({...newGoalData, currentAmount: parseFloat(e.target.value)})}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="target-date">Target Completion Date</Label>
                        <Input 
                          id="target-date" 
                          type="date" 
                          value={newGoalData.targetDate || ''}
                          onChange={(e) => setNewGoalData({...newGoalData, targetDate: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select 
                          value={newGoalData.priority || 'medium'}
                          onValueChange={(value: any) => setNewGoalData({...newGoalData, priority: value})}
                        >
                          <SelectTrigger id="priority">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />
                    
                    <div>
                      <Label>Auto-Contribution Plan (Optional)</Label>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {contributionTemplates.map((template, index) => (
                          <div
                            key={index}
                            className="rounded-lg border p-3 text-center cursor-pointer hover:border-navy-600 hover:bg-gray-50"
                            onClick={() => applyTemplate(template)}
                          >
                            <h4 className="font-medium">{template.name}</h4>
                            <p className="text-xs text-gray-500">{template.description}</p>
                            <p className="mt-1 text-sm font-semibold">{template.percentOfIncome}% of income</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="auto-contribution"
                        className="h-4 w-4 rounded border-gray-300"
                        checked={newGoalData.autoContribution || false}
                        onChange={(e) => setNewGoalData({...newGoalData, autoContribution: e.target.checked})}
                      />
                      <Label htmlFor="auto-contribution" className="font-normal">
                        Enable automatic contributions
                      </Label>
                    </div>
                    
                    {newGoalData.autoContribution && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contribution-amount">Contribution Amount</Label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                            <Input 
                              id="contribution-amount" 
                              className="pl-7" 
                              type="number" 
                              placeholder="0.00"
                              value={newGoalData.contributionAmount || ''}
                              onChange={(e) => setNewGoalData({...newGoalData, contributionAmount: parseFloat(e.target.value)})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="frequency">Frequency</Label>
                          <Select 
                            value={newGoalData.frequency || 'monthly'}
                            onValueChange={(value: any) => setNewGoalData({...newGoalData, frequency: value})}
                          >
                            <SelectTrigger id="frequency">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="biweekly">Bi-weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewGoalDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-navy-700 hover:bg-navy-800" onClick={handleCreateGoal}>
                      Create Goal
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Total Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboardStats.totalSaved.toLocaleString()}</div>
                <p className="text-xs text-gray-500">Across {dashboardStats.totalGoals} goals</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Monthly Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboardStats.monthlyContributions.toLocaleString()}</div>
                <p className="text-xs text-gray-500">${dashboardStats.projectedYearlySavings.toLocaleString()} annually</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Average Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.averageProgress}%</div>
                <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${dashboardStats.averageProgress}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Next Goal Due</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.shortestGoal}</div>
                <p className="text-xs text-gray-500">In ~60 days</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="current">
            <TabsList>
              <TabsTrigger value="current">Current Goals</TabsTrigger>
              <TabsTrigger value="completed">Completed Goals</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="mt-6">
              {filteredGoals.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredGoals.map((goal) => {
                    const progressPercentage = getProgressPercentage(goal.currentAmount, goal.targetAmount);
                    const CategoryIcon = getCategoryIcon(goal.category);
                    const categoryColor = getCategoryColor(goal.category);
                    const categoryTextColor = getCategoryTextColor(goal.category);
                    const daysRemaining = getDaysRemaining(goal.targetDate);
                    
                    return (
                      <Card key={goal.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleSelectGoal(goal)}>
                        <div className={`h-2 w-full ${categoryColor}`}></div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <div className={`mr-2 rounded-full p-1 ${categoryColor} bg-opacity-20`}>
                                <CategoryIcon className={`h-5 w-5 ${categoryTextColor}`} />
                              </div>
                              <CardTitle>{goal.name}</CardTitle>
                            </div>
                            <Badge className={goal.priority === 'high' ? 'bg-red-100 text-red-700' : goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}>
                              {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
                            </Badge>
                          </div>
                          <CardDescription>{getCategoryName(goal.category)}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 pb-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Progress</span>
                            <span className="text-sm font-medium">{progressPercentage.toFixed(0)}%</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                          <div className="flex justify-between pt-1">
                            <span className="text-sm font-medium">${goal.currentAmount.toLocaleString()}</span>
                            <span className="text-sm text-gray-500">of ${goal.targetAmount.toLocaleString()}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 pt-2 text-sm">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">{new Date(goal.targetDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1 justify-end">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">{daysRemaining} days left</span>
                            </div>
                          </div>
                          
                          {goal.autoContribution && (
                            <div className="flex items-center pt-1">
                              <Wallet className="mr-1 h-4 w-4 text-green-500" />
                              <span className="text-xs text-gray-600">
                                Auto: ${goal.contributionAmount} {goal.frequency}
                              </span>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Button variant="ghost" size="sm" className="w-full">
                            View Details <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <Target className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium">No goals found</h3>
                  <p className="mb-4 text-sm text-gray-500">
                    {filterCategory === 'all' 
                      ? "You haven't created any financial goals yet."
                      : `You don't have any goals in the ${getCategoryName(filterCategory)} category.`}
                  </p>
                  <Button className="bg-navy-700 hover:bg-navy-800" onClick={() => setIsNewGoalDialogOpen(true)}>
                    <Plus className="mr-1 h-4 w-4" />
                    Create Your First Goal
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              <div className="rounded-lg border border-dashed p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <Check className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="mb-1 text-lg font-medium">No completed goals yet</h3>
                <p className="mb-4 text-sm text-gray-500">
                  Keep working towards your financial goals. You'll get there!
                </p>
                <Button variant="outline" onClick={() => setIsNewGoalDialogOpen(true)}>
                  Create a New Goal
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Goals by Category</CardTitle>
                    <CardDescription>Breakdown of your financial goals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {goalCategories
                        .filter(category => goals.some(goal => goal.category === category.id))
                        .map(category => {
                          const categoryGoals = goals.filter(goal => goal.category === category.id);
                          const totalAmount = categoryGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
                          const savedAmount = categoryGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
                          const percentage = (savedAmount / totalAmount) * 100;
                          
                          return (
                            <div key={category.id}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className={`rounded-full p-1 ${category.color} bg-opacity-20`}>
                                    <category.icon className={`h-4 w-4 ${category.textColor}`} />
                                  </div>
                                  <span className="font-medium">{category.name}</span>
                                </div>
                                <div className="text-sm">
                                  <span className="font-medium">${savedAmount.toLocaleString()}</span>
                                  <span className="text-gray-500"> / ${totalAmount.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                                <div 
                                  className={`h-2 rounded-full ${category.color}`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <div className="mt-1 text-xs text-gray-500">
                                {categoryGoals.length} {categoryGoals.length === 1 ? 'goal' : 'goals'} · {percentage.toFixed(0)}% funded
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Contributions</CardTitle>
                    <CardDescription>Your automatic contributions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Total Monthly</span>
                          <span className="text-xl font-bold">${dashboardStats.monthlyContributions.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {goals
                          .filter(goal => goal.autoContribution)
                          .map(goal => {
                            let monthlyEquivalent;
                            if (goal.frequency === 'weekly') {
                              monthlyEquivalent = goal.contributionAmount * 4.33;
                            } else if (goal.frequency === 'biweekly') {
                              monthlyEquivalent = goal.contributionAmount * 2.17;
                            } else {
                              monthlyEquivalent = goal.contributionAmount;
                            }
                            
                            return (
                              <div key={goal.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className={`h-3 w-3 rounded-full ${getCategoryColor(goal.category)}`}></div>
                                  <span>{goal.name}</span>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">${monthlyEquivalent.toFixed(2)}</div>
                                  <div className="text-xs text-gray-500">
                                    ${goal.contributionAmount} {goal.frequency}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      
                      <div className="rounded-lg border border-dashed p-4 text-center">
                        <BarChart className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                        <h4 className="text-sm font-medium">Want to see more detailed analytics?</h4>
                        <p className="mt-1 text-xs text-gray-500">
                          View your financial health dashboard for comprehensive insights.
                        </p>
                        <Button variant="link" size="sm" asChild className="mt-2">
                          <Link href="/dashboard">
                            Go to Dashboard <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Goals</CardTitle>
                <CardDescription>Based on your financial profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg border p-4 hover:border-navy-600 hover:shadow-sm cursor-pointer transition-all" onClick={() => setIsNewGoalDialogOpen(true)}>
                    <div className="mb-2 rounded-full bg-blue-100 p-2 w-fit">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">Emergency Fund</h3>
                    <p className="mb-2 text-sm text-gray-600">Financial experts recommend saving 3-6 months of expenses.</p>
                    <div className="text-sm font-medium text-navy-700">Recommended target: $15,000</div>
                  </div>
                  
                  <div className="rounded-lg border p-4 hover:border-navy-600 hover:shadow-sm cursor-pointer transition-all" onClick={() => setIsNewGoalDialogOpen(true)}>
                    <div className="mb-2 rounded-full bg-green-100 p-2 w-fit">
                      <Home className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold">Home Down Payment</h3>
                    <p className="mb-2 text-sm text-gray-600">Save for a 20% down payment on your future home.</p>
                    <div className="text-sm font-medium text-navy-700">Recommended target: $60,000</div>
                  </div>
                  
                  <div className="rounded-lg border p-4 hover:border-navy-600 hover:shadow-sm cursor-pointer transition-all" onClick={() => setIsNewGoalDialogOpen(true)}>
                    <div className="mb-2 rounded-full bg-amber-100 p-2 w-fit">
                      <Gem className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold">Retirement Boost</h3>
                    <p className="mb-2 text-sm text-gray-600">Supplement your retirement accounts with additional savings.</p>
                    <div className="text-sm font-medium text-navy-700">Recommended: $5,000 annually</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Goal Detail Dialog */}
      <Dialog open={isGoalDetailDialogOpen} onOpenChange={setIsGoalDetailDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          {selectedGoal && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  {(() => {
                    const CategoryIcon = getCategoryIcon(selectedGoal.category);
                    const categoryColor = getCategoryColor(selectedGoal.category);
                    const categoryTextColor = getCategoryTextColor(selectedGoal.category);
                    
                    return (
                      <div className={`rounded-full p-1 ${categoryColor} bg-opacity-20`}>
                        <CategoryIcon className={`h-5 w-5 ${categoryTextColor}`} />
                      </div>
                    );
                  })()}
                  <DialogTitle>{selectedGoal.name}</DialogTitle>
                </div>
                <DialogDescription>
                  {getCategoryName(selectedGoal.category)} · Created on {new Date().toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="text-sm font-medium">
                      {getProgressPercentage(selectedGoal.currentAmount, selectedGoal.targetAmount).toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={getProgressPercentage(selectedGoal.currentAmount, selectedGoal.targetAmount)} className="h-2" />
                  <div className="flex justify-between pt-1 text-sm">
                    <div className="font-medium">
                      ${selectedGoal.currentAmount.toLocaleString()} 
                      <span className="text-gray-500"> saved</span>
                    </div>
                    <div className="text-gray-500">
                      Goal: ${selectedGoal.targetAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center">
                        <Calendar className="mb-1 h-5 w-5 text-navy-700" />
                        <div className="text-sm font-medium">Target Date</div>
                        <div className="text-sm">{new Date(selectedGoal.targetDate).toLocaleDateString()}</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center">
                        <Clock className="mb-1 h-5 w-5 text-navy-700" />
                        <div className="text-sm font-medium">Days Remaining</div>
                        <div className="text-sm">{getDaysRemaining(selectedGoal.targetDate)} days</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Auto-Contribution</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    {selectedGoal.autoContribution ? (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Amount:</span>
                          <span className="text-sm font-medium">${selectedGoal.contributionAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Frequency:</span>
                          <span className="text-sm font-medium capitalize">{selectedGoal.frequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Est. Completion:</span>
                          <span className="text-sm font-medium">{getEstimatedCompletionDate(selectedGoal)}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed p-3 text-center">
                        <p className="text-sm text-gray-500">No automatic contributions set up</p>
                        <Button variant="link" size="sm" className="mt-1" onClick={() => {
                          setIsGoalDetailDialogOpen(false);
                          setIsEditGoalDialogOpen(true);
                        }}>
                          Set up contributions
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <div className="flex space-x-3">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700" 
                    onClick={() => {
                      setIsGoalDetailDialogOpen(false);
                      setIsContributeDialogOpen(true);
                    }}
                  >
                    <DollarSign className="mr-1 h-4 w-4" />
                    Add Money
                  </Button>
                  <div className="flex flex-1 space-x-2">
                    <Button variant="outline" className="flex-1" onClick={() => {
                      setIsGoalDetailDialogOpen(false);
                      setIsEditGoalDialogOpen(true);
                    }}>
                      <FileEdit className="mr-1 h-4 w-4" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => {
                        setIsGoalDetailDialogOpen(false);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Goal Dialog */}
      <Dialog open={isEditGoalDialogOpen} onOpenChange={setIsEditGoalDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          {selectedGoal && (
            <>
              <DialogHeader>
                <DialogTitle>Edit Goal: {selectedGoal.name}</DialogTitle>
                <DialogDescription>
                  Update details for your savings goal.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-goal-name">Goal Name</Label>
                    <Input 
                      id="edit-goal-name" 
                      value={selectedGoal.name} 
                      onChange={(e) => setSelectedGoal({...selectedGoal, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-goal-category">Category</Label>
                    <Select 
                      value={selectedGoal.category}
                      onValueChange={(value) => setSelectedGoal({...selectedGoal, category: value})}
                    >
                      <SelectTrigger id="edit-goal-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {goalCategories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-target-amount">Target Amount</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <Input 
                        id="edit-target-amount" 
                        className="pl-7" 
                        type="number" 
                        value={selectedGoal.targetAmount}
                        onChange={(e) => setSelectedGoal({...selectedGoal, targetAmount: parseFloat(e.target.value)})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-current-amount">Current Amount</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <Input 
                        id="edit-current-amount" 
                        className="pl-7" 
                        type="number" 
                        value={selectedGoal.currentAmount}
                        onChange={(e) => setSelectedGoal({...selectedGoal, currentAmount: parseFloat(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-target-date">Target Completion Date</Label>
                    <Input 
                      id="edit-target-date" 
                      type="date" 
                      value={selectedGoal.targetDate}
                      onChange={(e) => setSelectedGoal({...selectedGoal, targetDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-priority">Priority</Label>
                    <Select 
                      value={selectedGoal.priority}
                      onValueChange={(value: any) => setSelectedGoal({...selectedGoal, priority: value})}
                    >
                      <SelectTrigger id="edit-priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-auto-contribution"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={selectedGoal.autoContribution}
                    onChange={(e) => setSelectedGoal({...selectedGoal, autoContribution: e.target.checked})}
                  />
                  <Label htmlFor="edit-auto-contribution" className="font-normal">
                    Enable automatic contributions
                  </Label>
                </div>
                
                {selectedGoal.autoContribution && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-contribution-amount">Contribution Amount</Label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                        <Input 
                          id="edit-contribution-amount" 
                          className="pl-7" 
                          type="number" 
                          value={selectedGoal.contributionAmount}
                          onChange={(e) => setSelectedGoal({...selectedGoal, contributionAmount: parseFloat(e.target.value)})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-frequency">Frequency</Label>
                      <Select 
                        value={selectedGoal.frequency}
                        onValueChange={(value: any) => setSelectedGoal({...selectedGoal, frequency: value})}
                      >
                        <SelectTrigger id="edit-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditGoalDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-navy-700 hover:bg-navy-800" onClick={handleEditGoal}>
                  Save Changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Contribute Dialog */}
      <Dialog open={isContributeDialogOpen} onOpenChange={setIsContributeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedGoal && (
            <>
              <DialogHeader>
                <DialogTitle>Add Money to Goal</DialogTitle>
                <DialogDescription>
                  Make a one-time contribution to your "{selectedGoal.name}" goal.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contribution-amount">Contribution Amount</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <Input 
                        id="contribution-amount" 
                        className="pl-7" 
                        type="number" 
                        placeholder="0.00"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" onClick={() => setContributionAmount('25')}>$25</Button>
                    <Button variant="outline" size="sm" onClick={() => setContributionAmount('50')}>$50</Button>
                    <Button variant="outline" size="sm" onClick={() => setContributionAmount('100')}>$100</Button>
                    <Button variant="outline" size="sm" onClick={() => setContributionAmount('200')}>$200</Button>
                    <Button variant="outline" size="sm" onClick={() => setContributionAmount('500')}>$500</Button>
                    <Button variant="outline" size="sm" onClick={() => setContributionAmount('1000')}>$1,000</Button>
                  </div>
                  
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-500">Current Balance</div>
                        <div className="font-medium">${selectedGoal.currentAmount.toLocaleString()}</div>
                      </div>
                      <div className="text-2xl">+</div>
                      <div>
                        <div className="text-sm text-gray-500">Contribution</div>
                        <div className="font-medium">${parseFloat(contributionAmount || '0').toLocaleString()}</div>
                      </div>
                      <div className="text-2xl">=</div>
                      <div>
                        <div className="text-sm text-gray-500">New Balance</div>
                        <div className="font-medium">${(selectedGoal.currentAmount + parseFloat(contributionAmount || '0')).toLocaleString()}</div>
                      </div>
                    </div>
                    
                    {parseFloat(contributionAmount || '0') > 0 && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress: {getProgressPercentage(selectedGoal.currentAmount, selectedGoal.targetAmount).toFixed(0)}%</span>
                          <span>After: {getProgressPercentage(selectedGoal.currentAmount + parseFloat(contributionAmount || '0'), selectedGoal.targetAmount).toFixed(0)}%</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                          <div 
                            className="h-2 rounded-full bg-navy-700"
                            style={{ width: `${getProgressPercentage(selectedGoal.currentAmount + parseFloat(contributionAmount || '0'), selectedGoal.targetAmount)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsContributeDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700" 
                  onClick={handleContribute}
                  disabled={!contributionAmount || parseFloat(contributionAmount) <= 0}
                >
                  Add Funds
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Goal Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedGoal && (
            <>
              <DialogHeader>
                <DialogTitle>Delete Goal</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the "{selectedGoal.name}" goal?
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="rounded-lg bg-red-50 p-4 flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-600">This action cannot be undone</p>
                    <p className="mt-1 text-sm text-red-700">
                      Any funds currently in this goal will remain in your account but will no longer be tracked toward this goal.
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="destructive"
                  onClick={handleDeleteGoal}
                >
                  Delete Goal
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <footer className="border-t py-6 mt-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Dade Credit Union</h3>
              <p className="text-sm text-gray-600">
                Serving our community with financial solutions since 1974.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact</h3>
              <p className="text-sm text-gray-600">
                123 Financial Way<br />
                Miami, FL 33101<br />
                (305) 555-1234<br />
                info@dadecreditunion.com
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Hours</h3>
              <p className="text-sm text-gray-600">
                Monday - Friday: 9:00 AM - 5:00 PM<br />
                Saturday: 9:00 AM - 1:00 PM<br />
                Sunday: Closed
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-navy-700">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-600 hover:text-navy-700">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-navy-700">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-navy-700">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-sm text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Dade Credit Union. All rights reserved. Federally insured by NCUA.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}