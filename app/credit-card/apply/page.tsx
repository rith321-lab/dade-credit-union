'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, CreditCard, FileText, LockKeyhole, User, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from '@/components/logo';

// Card types in system
interface CardType {
  id: string;
  name: string;
  description: string;
  annualFee: number;
  introAPR: string;
  creditNeeded: string;
  image: string;
}

const creditCards: CardType[] = [
  {
    id: "cash-rewards",
    name: "Cash Rewards Visa®",
    description: "Earn cash back on every purchase, every day.",
    annualFee: 0,
    introAPR: "0% for 15 months",
    creditNeeded: "Good to Excellent",
    image: "/placeholder.svg",
  },
  {
    id: "travel-rewards",
    name: "Travel Rewards Signature®",
    description: "Earn miles on every purchase to use toward travel.",
    annualFee: 95,
    introAPR: "0% for 12 months on purchases",
    creditNeeded: "Excellent",
    image: "/placeholder.svg",
  },
  {
    id: "secure-starter",
    name: "Secure Starter Visa®",
    description: "Build or rebuild your credit with responsible use.",
    annualFee: 49,
    introAPR: "None",
    creditNeeded: "Fair to Good",
    image: "/placeholder.svg",
  },
  {
    id: "platinum-business",
    name: "Platinum Business Visa®",
    description: "Designed for small business owners to manage expenses and earn rewards.",
    annualFee: 0,
    introAPR: "0% for 12 months on purchases and balance transfers",
    creditNeeded: "Good to Excellent",
    image: "/placeholder.svg",
  },
];

// Application step types
type ApplicationStep = 'card-selection' | 'personal' | 'financial' | 'review' | 'security' | 'success';

function CreditCardApplyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardIdParam = searchParams.get('id');
  
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('card-selection');
  const [selectedCard, setSelectedCard] = useState<string | null>(cardIdParam);
  const [completedSteps, setCompletedSteps] = useState<ApplicationStep[]>([]);
  
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    ssn: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    housingStatus: 'own',
    rentMortgagePayment: '',
    timeAtResidence: '',
    
    // Financial Information
    employmentStatus: 'employed',
    employerName: '',
    jobTitle: '',
    annualIncome: '',
    additionalIncome: '',
    sourceOfAdditionalIncome: '',
    
    // Card Details
    creditLimit: '',
    balanceTransfer: 'no',
    balanceTransferAmount: '',
    balanceTransferFromBank: '',
    balanceTransferAccountNumber: '',
    
    // Security Information
    securityQuestion: '',
    securityAnswer: '',
    mothersMaidenName: '',
    
    // Terms
    agreeToTerms: false,
    agreeToRates: false,
    optInPromotions: false,
  });
  
  // Move to card selection if no card was pre-selected from URL
  useEffect(() => {
    if (cardIdParam) {
      setSelectedCard(cardIdParam);
      setCurrentStep('personal');
      setCompletedSteps(['card-selection']);
    }
  }, [cardIdParam]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSelectChange = (id: string, value: string) => {
    setFormData({
      ...formData,
      [id]: value
    });
  };
  
  const handleCardSelection = (cardId: string) => {
    setSelectedCard(cardId);
  };
  
  const isStepComplete = (step: ApplicationStep): boolean => {
    switch (step) {
      case 'card-selection':
        return selectedCard !== null;
      case 'personal':
        return !!formData.firstName && !!formData.lastName && !!formData.email && 
               !!formData.phone && !!formData.dateOfBirth && !!formData.ssn && 
               !!formData.address && !!formData.city && !!formData.state && !!formData.zipCode;
      case 'financial':
        return (formData.employmentStatus === 'employed' || formData.employmentStatus === 'self_employed') 
               ? (!!formData.employerName && !!formData.jobTitle && !!formData.annualIncome)
               : !!formData.annualIncome;
      case 'review':
        return true;
      case 'security':
        return !!formData.securityQuestion && !!formData.securityAnswer && !!formData.mothersMaidenName && 
               formData.agreeToTerms && formData.agreeToRates;
      default:
        return false;
    }
  };
  
  const markStepComplete = (step: ApplicationStep) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };
  
  const goToNextStep = () => {
    if (currentStep === 'card-selection' && selectedCard) {
      markStepComplete('card-selection');
      setCurrentStep('personal');
    } else if (currentStep === 'personal') {
      markStepComplete('personal');
      setCurrentStep('financial');
    } else if (currentStep === 'financial') {
      markStepComplete('financial');
      setCurrentStep('review');
    } else if (currentStep === 'review') {
      markStepComplete('review');
      setCurrentStep('security');
    } else if (currentStep === 'security') {
      handleSubmit();
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep === 'personal') {
      setCurrentStep('card-selection');
    } else if (currentStep === 'financial') {
      setCurrentStep('personal');
    } else if (currentStep === 'review') {
      setCurrentStep('financial');
    } else if (currentStep === 'security') {
      setCurrentStep('review');
    }
  };
  
  const handleSubmit = () => {
    // Simulate API call to submit application
    console.log('Application submitted:', { selectedCard, ...formData });
    
    // Redirect to success page with card type
    const cardType = selectedCard?.split('-')[0] || 'rewards'; // Extract type from ID (e.g., 'cash-rewards' -> 'cash')
    router.push(`/credit-card/apply/success?type=${cardType}`);
  };
  
  const getCardDetails = () => {
    if (!selectedCard) return null;
    return creditCards.find(card => card.id === selectedCard);
  };
  
  const cardDetails = getCardDetails();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b py-4">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="font-bold text-lg text-navy-700">
            <Logo />
          </Link>
          <div className="hidden md:block">
            <p className="text-sm text-gray-500">Need help? Call (305) 555-1234</p>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4 md:px-6">
          {currentStep !== 'success' ? (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => router.push('/credit-card')}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                  <h1 className="text-2xl font-bold text-navy-700">Credit Card Application</h1>
                </div>
                <p className="mt-2 text-gray-600">
                  {cardDetails ? cardDetails.name : 'Choose a card to apply for'}
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <Tabs value={currentStep} onValueChange={(v) => setCurrentStep(v as ApplicationStep)}>
                        <TabsList className="grid w-full grid-cols-5">
                          <TabsTrigger 
                            value="card-selection"
                            disabled={currentStep !== 'card-selection' && !completedSteps.includes('card-selection')}
                          >
                            Card
                          </TabsTrigger>
                          <TabsTrigger 
                            value="personal" 
                            disabled={currentStep !== 'personal' && !completedSteps.includes('personal')}
                          >
                            Personal
                          </TabsTrigger>
                          <TabsTrigger 
                            value="financial"
                            disabled={currentStep !== 'financial' && !completedSteps.includes('financial')}
                          >
                            Financial
                          </TabsTrigger>
                          <TabsTrigger 
                            value="review"
                            disabled={currentStep !== 'review' && !completedSteps.includes('review')}
                          >
                            Review
                          </TabsTrigger>
                          <TabsTrigger 
                            value="security"
                            disabled={currentStep !== 'security' && !completedSteps.includes('security')}
                          >
                            Submit
                          </TabsTrigger>
                        </TabsList>

                        {/* Card Selection Tab */}
                        <TabsContent value="card-selection" className="pt-6">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-xl font-semibold mb-2 flex items-center">
                                <CreditCard className="mr-2 h-5 w-5 text-navy-700" />
                                Choose Your Credit Card
                              </h2>
                              <p className="text-sm text-gray-500">
                                Select the card that best fits your lifestyle and financial needs.
                              </p>
                            </div>

                            <div className="space-y-4">
                              {creditCards.map((card) => (
                                <div
                                  key={card.id}
                                  className={`rounded-lg border p-4 cursor-pointer transition-all ${
                                    selectedCard === card.id ? 'border-navy-600 ring-1 ring-navy-600' : 'hover:border-navy-300'
                                  }`}
                                  onClick={() => handleCardSelection(card.id)}
                                >
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-4">
                                      <RadioGroupItem
                                        value={card.id}
                                        id={card.id}
                                        checked={selectedCard === card.id}
                                        className="sr-only"
                                      />
                                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                                        selectedCard === card.id ? 'border-navy-600 bg-navy-600' : 'border-gray-300'
                                      }`}>
                                        {selectedCard === card.id && <Check className="h-3 w-3 text-white" />}
                                      </div>
                                      <div>
                                        <h3 className="font-medium">{card.name}</h3>
                                        <p className="text-sm text-gray-500">{card.description}</p>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="text-gray-500">Annual Fee</p>
                                      <p className="font-medium">{card.annualFee === 0 ? 'No annual fee' : `$${card.annualFee}`}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-500">Intro APR</p>
                                      <p className="font-medium">{card.introAPR}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-500">Credit Needed</p>
                                      <p className="font-medium">{card.creditNeeded}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        {/* Personal Information Tab */}
                        <TabsContent value="personal" className="pt-6">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-xl font-semibold mb-2 flex items-center">
                                <User className="mr-2 h-5 w-5 text-navy-700" />
                                Personal Information
                              </h2>
                              <p className="text-sm text-gray-500">
                                Please provide your personal details for your credit card application.
                              </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input 
                                  id="firstName" 
                                  value={formData.firstName} 
                                  onChange={handleChange} 
                                  required 
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input 
                                  id="lastName" 
                                  value={formData.lastName} 
                                  onChange={handleChange} 
                                  required 
                                />
                              </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input 
                                  id="email" 
                                  type="email" 
                                  value={formData.email} 
                                  onChange={handleChange} 
                                  required 
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input 
                                  id="phone" 
                                  type="tel" 
                                  value={formData.phone} 
                                  onChange={handleChange} 
                                  required 
                                />
                              </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                <Input 
                                  id="dateOfBirth" 
                                  type="date" 
                                  value={formData.dateOfBirth} 
                                  onChange={handleChange} 
                                  required 
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="ssn">Social Security Number</Label>
                                <Input 
                                  id="ssn" 
                                  placeholder="XXX-XX-XXXX" 
                                  value={formData.ssn} 
                                  onChange={handleChange} 
                                  required 
                                />
                              </div>
                            </div>

                            <Separator className="my-6" />

                            <div>
                              <h3 className="text-lg font-semibold mb-4">Address Information</h3>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="address">Street Address</Label>
                                  <Input 
                                    id="address" 
                                    value={formData.address} 
                                    onChange={handleChange} 
                                    required 
                                  />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                  <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input 
                                      id="city" 
                                      value={formData.city} 
                                      onChange={handleChange} 
                                      required 
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Select
                                      onValueChange={(value) => handleSelectChange('state', value)}
                                      value={formData.state}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="FL">Florida</SelectItem>
                                        <SelectItem value="GA">Georgia</SelectItem>
                                        <SelectItem value="NC">North Carolina</SelectItem>
                                        <SelectItem value="SC">South Carolina</SelectItem>
                                        <SelectItem value="AL">Alabama</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="zipCode">ZIP Code</Label>
                                    <Input 
                                      id="zipCode" 
                                      value={formData.zipCode} 
                                      onChange={handleChange} 
                                      required 
                                    />
                                  </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                  <div className="space-y-2">
                                    <Label htmlFor="housingStatus">Housing Status</Label>
                                    <Select
                                      onValueChange={(value) => handleSelectChange('housingStatus', value)}
                                      value={formData.housingStatus}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="own">Own</SelectItem>
                                        <SelectItem value="rent">Rent</SelectItem>
                                        <SelectItem value="with_parents">Live with Parents</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  
                                  {(formData.housingStatus === 'own' || formData.housingStatus === 'rent') && (
                                    <div className="space-y-2">
                                      <Label htmlFor="rentMortgagePayment">Monthly Rent/Mortgage Payment</Label>
                                      <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                        <Input 
                                          id="rentMortgagePayment" 
                                          className="pl-7" 
                                          value={formData.rentMortgagePayment} 
                                          onChange={handleChange} 
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="timeAtResidence">Time at Current Residence</Label>
                                  <Select
                                    onValueChange={(value) => handleSelectChange('timeAtResidence', value)}
                                    value={formData.timeAtResidence}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="less_than_1_year">Less than 1 year</SelectItem>
                                      <SelectItem value="1_to_2_years">1-2 years</SelectItem>
                                      <SelectItem value="2_to_5_years">2-5 years</SelectItem>
                                      <SelectItem value="5_plus_years">5+ years</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        {/* Financial Information Tab */}
                        <TabsContent value="financial" className="pt-6">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-xl font-semibold mb-2 flex items-center">
                                <FileText className="mr-2 h-5 w-5 text-navy-700" />
                                Financial Information
                              </h2>
                              <p className="text-sm text-gray-500">
                                Please provide your employment and income details.
                              </p>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Employment Status</Label>
                                <RadioGroup
                                  value={formData.employmentStatus}
                                  onValueChange={(value) => handleSelectChange('employmentStatus', value)}
                                  className="grid grid-cols-2 gap-2"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="employed" id="employed" />
                                    <Label htmlFor="employed" className="font-normal">Employed</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="self_employed" id="self_employed" />
                                    <Label htmlFor="self_employed" className="font-normal">Self-Employed</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="retired" id="retired" />
                                    <Label htmlFor="retired" className="font-normal">Retired</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="student" id="student" />
                                    <Label htmlFor="student" className="font-normal">Student</Label>
                                  </div>
                                </RadioGroup>
                              </div>

                              {(formData.employmentStatus === 'employed' || formData.employmentStatus === 'self_employed') && (
                                <>
                                  <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                      <Label htmlFor="employerName">
                                        {formData.employmentStatus === 'self_employed' ? 'Business Name' : 'Employer Name'}
                                      </Label>
                                      <Input 
                                        id="employerName" 
                                        value={formData.employerName} 
                                        onChange={handleChange} 
                                        required 
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="jobTitle">Job Title</Label>
                                      <Input 
                                        id="jobTitle" 
                                        value={formData.jobTitle} 
                                        onChange={handleChange} 
                                        required 
                                      />
                                    </div>
                                  </div>
                                </>
                              )}

                              <Separator className="my-6" />

                              <div>
                                <h3 className="text-lg font-semibold mb-4">Income Information</h3>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="annualIncome">Annual Gross Income</Label>
                                    <div className="relative">
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                      <Input 
                                        id="annualIncome" 
                                        className="pl-7" 
                                        placeholder="0.00" 
                                        value={formData.annualIncome} 
                                        onChange={handleChange} 
                                        required 
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="additionalIncome">Additional Annual Income (Optional)</Label>
                                    <div className="relative">
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                      <Input 
                                        id="additionalIncome" 
                                        className="pl-7" 
                                        placeholder="0.00" 
                                        value={formData.additionalIncome} 
                                        onChange={handleChange} 
                                      />
                                    </div>
                                  </div>
                                  
                                  {formData.additionalIncome && (
                                    <div className="space-y-2">
                                      <Label htmlFor="sourceOfAdditionalIncome">Source of Additional Income</Label>
                                      <Select
                                        onValueChange={(value) => handleSelectChange('sourceOfAdditionalIncome', value)}
                                        value={formData.sourceOfAdditionalIncome}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="investments">Investments</SelectItem>
                                          <SelectItem value="retirement">Retirement</SelectItem>
                                          <SelectItem value="social_security">Social Security</SelectItem>
                                          <SelectItem value="alimony">Alimony</SelectItem>
                                          <SelectItem value="child_support">Child Support</SelectItem>
                                          <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <Separator className="my-6" />

                              <div>
                                <h3 className="text-lg font-semibold mb-4">Card Details</h3>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="creditLimit">Requested Credit Limit</Label>
                                    <div className="relative">
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                      <Input 
                                        id="creditLimit" 
                                        className="pl-7" 
                                        placeholder="0.00" 
                                        value={formData.creditLimit} 
                                        onChange={handleChange} 
                                      />
                                    </div>
                                    <p className="text-xs text-gray-500">
                                      Leave blank for us to assign a credit limit based on your application.
                                    </p>
                                  </div>

                                  <div className="space-y-2">
                                    <Label>Would you like to transfer a balance from another credit card?</Label>
                                    <RadioGroup
                                      value={formData.balanceTransfer}
                                      onValueChange={(value) => handleSelectChange('balanceTransfer', value)}
                                      className="flex space-x-4"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="transfer_yes" />
                                        <Label htmlFor="transfer_yes" className="font-normal">Yes</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="transfer_no" />
                                        <Label htmlFor="transfer_no" className="font-normal">No</Label>
                                      </div>
                                    </RadioGroup>
                                  </div>
                                  
                                  {formData.balanceTransfer === 'yes' && (
                                    <div className="space-y-4 rounded-md bg-gray-50 p-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="balanceTransferAmount">Balance Transfer Amount</Label>
                                        <div className="relative">
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                          <Input 
                                            id="balanceTransferAmount" 
                                            className="pl-7" 
                                            placeholder="0.00" 
                                            value={formData.balanceTransferAmount} 
                                            onChange={handleChange} 
                                          />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="balanceTransferFromBank">Current Card Issuer</Label>
                                        <Input 
                                          id="balanceTransferFromBank" 
                                          placeholder="e.g., Chase, Bank of America" 
                                          value={formData.balanceTransferFromBank} 
                                          onChange={handleChange} 
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="balanceTransferAccountNumber">Account Number</Label>
                                        <Input 
                                          id="balanceTransferAccountNumber" 
                                          placeholder="XXXX-XXXX-XXXX-XXXX" 
                                          value={formData.balanceTransferAccountNumber} 
                                          onChange={handleChange} 
                                        />
                                      </div>
                                      <div className="flex items-center rounded-md bg-blue-50 p-3 text-sm text-blue-700">
                                        <AlertTriangle className="mr-2 h-4 w-4" />
                                        <p>Balance transfers may incur a fee of 3% (minimum $5).</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        {/* Review Tab */}
                        <TabsContent value="review" className="pt-6">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-xl font-semibold mb-2 flex items-center">
                                <FileText className="mr-2 h-5 w-5 text-navy-700" />
                                Review Your Application
                              </h2>
                              <p className="text-sm text-gray-500">
                                Please review your information before submitting.
                              </p>
                            </div>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg flex items-center">
                                  <CreditCard className="mr-2 h-5 w-5" />
                                  Card Selection
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                  <div>
                                    <dt className="text-gray-500">Selected Card</dt>
                                    <dd className="font-medium">{cardDetails?.name}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-gray-500">Annual Fee</dt>
                                    <dd>{cardDetails?.annualFee === 0 ? 'No annual fee' : `$${cardDetails?.annualFee}`}</dd>
                                  </div>
                                </dl>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="mt-4 text-navy-700"
                                  onClick={() => setCurrentStep('card-selection')}
                                >
                                  Edit
                                </Button>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg flex items-center">
                                  <User className="mr-2 h-5 w-5" />
                                  Personal Information
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                  <div>
                                    <dt className="text-gray-500">Name</dt>
                                    <dd>{formData.firstName} {formData.lastName}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-gray-500">Email</dt>
                                    <dd>{formData.email}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-gray-500">Phone</dt>
                                    <dd>{formData.phone}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-gray-500">Date of Birth</dt>
                                    <dd>{formData.dateOfBirth}</dd>
                                  </div>
                                  <div className="col-span-2">
                                    <dt className="text-gray-500">Address</dt>
                                    <dd>{formData.address}, {formData.city}, {formData.state} {formData.zipCode}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-gray-500">Housing Status</dt>
                                    <dd className="capitalize">{formData.housingStatus.replace('_', ' ')}</dd>
                                  </div>
                                </dl>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="mt-4 text-navy-700"
                                  onClick={() => setCurrentStep('personal')}
                                >
                                  Edit
                                </Button>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg flex items-center">
                                  <FileText className="mr-2 h-5 w-5" />
                                  Financial Information
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                  <div>
                                    <dt className="text-gray-500">Employment Status</dt>
                                    <dd className="capitalize">{formData.employmentStatus.replace('_', ' ')}</dd>
                                  </div>
                                  {(formData.employmentStatus === 'employed' || formData.employmentStatus === 'self_employed') && (
                                    <>
                                      <div>
                                        <dt className="text-gray-500">Employer</dt>
                                        <dd>{formData.employerName}</dd>
                                      </div>
                                      <div>
                                        <dt className="text-gray-500">Job Title</dt>
                                        <dd>{formData.jobTitle}</dd>
                                      </div>
                                    </>
                                  )}
                                  <div>
                                    <dt className="text-gray-500">Annual Income</dt>
                                    <dd>${parseFloat(formData.annualIncome || '0').toLocaleString()}</dd>
                                  </div>
                                  {formData.additionalIncome && (
                                    <div>
                                      <dt className="text-gray-500">Additional Income</dt>
                                      <dd>${parseFloat(formData.additionalIncome || '0').toLocaleString()}</dd>
                                    </div>
                                  )}
                                  {formData.creditLimit && (
                                    <div>
                                      <dt className="text-gray-500">Requested Credit Limit</dt>
                                      <dd>${parseFloat(formData.creditLimit || '0').toLocaleString()}</dd>
                                    </div>
                                  )}
                                  {formData.balanceTransfer === 'yes' && (
                                    <div>
                                      <dt className="text-gray-500">Balance Transfer</dt>
                                      <dd>${parseFloat(formData.balanceTransferAmount || '0').toLocaleString()} from {formData.balanceTransferFromBank}</dd>
                                    </div>
                                  )}
                                </dl>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="mt-4 text-navy-700"
                                  onClick={() => setCurrentStep('financial')}
                                >
                                  Edit
                                </Button>
                              </CardContent>
                            </Card>

                            <div className="flex items-center rounded-md bg-blue-50 p-4 text-blue-700">
                              <AlertTriangle className="mr-3 h-5 w-5" />
                              <div>
                                <h3 className="font-medium">Almost done!</h3>
                                <p className="text-sm">In the next step, you'll set up security information and agree to terms.</p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        {/* Security & Submit Tab */}
                        <TabsContent value="security" className="pt-6">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-xl font-semibold mb-2 flex items-center">
                                <LockKeyhole className="mr-2 h-5 w-5 text-navy-700" />
                                Security & Agreement
                              </h2>
                              <p className="text-sm text-gray-500">
                                Set up security information and review terms and conditions.
                              </p>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">Security Information</h3>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="securityQuestion">Security Question</Label>
                                  <Select
                                    onValueChange={(value) => handleSelectChange('securityQuestion', value)}
                                    value={formData.securityQuestion}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a security question" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="first_pet">What was the name of your first pet?</SelectItem>
                                      <SelectItem value="childhood_street">What street did you grow up on?</SelectItem>
                                      <SelectItem value="first_car">What was your first car?</SelectItem>
                                      <SelectItem value="favorite_teacher">Who was your favorite teacher?</SelectItem>
                                      <SelectItem value="birthplace">What city were you born in?</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="securityAnswer">Security Answer</Label>
                                  <Input 
                                    id="securityAnswer" 
                                    value={formData.securityAnswer} 
                                    onChange={handleChange} 
                                    required 
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="mothersMaidenName">Mother's Maiden Name</Label>
                                  <Input 
                                    id="mothersMaidenName" 
                                    value={formData.mothersMaidenName} 
                                    onChange={handleChange} 
                                    required 
                                  />
                                </div>
                              </div>
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">Terms and Conditions</h3>
                              
                              <div className="max-h-60 overflow-y-auto rounded-md border p-4 text-sm text-gray-600">
                                <p className="mb-4">
                                  <strong>CREDIT CARD AGREEMENT</strong>
                                </p>
                                <p className="mb-2">
                                  This agreement is for your credit card account with Dade Credit Union. By applying for and using your card, you agree to the following terms:
                                </p>
                                <ol className="list-decimal space-y-2 pl-5">
                                  <li>
                                    <strong>Promise to Pay.</strong> You promise to pay all amounts due on your account. This includes amounts where you did not sign a purchase slip or other documents for the transaction.
                                  </li>
                                  <li>
                                    <strong>Interest Rates and Fees.</strong> The interest rates and fees for your account are contained in the Disclosure that accompanies this Agreement. The Disclosure is part of this Agreement.
                                  </li>
                                  <li>
                                    <strong>Credit Limit.</strong> We will assign a Credit Limit to your account. Your Credit Limit will appear on your monthly billing statement. You agree not to let the account balance exceed this Credit Limit.
                                  </li>
                                  <li>
                                    <strong>Credit Reporting.</strong> We may report information about your account to credit bureaus. Late payments, missed payments, or other defaults on your account may be reflected in your credit report.
                                  </li>
                                </ol>
                                <p className="mt-4">
                                  For full terms and conditions, please refer to the Cardholder Agreement that will accompany your card.
                                </p>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300"
                                    required
                                  />
                                  <Label htmlFor="agreeToTerms" className="text-sm font-normal">
                                    I have read and agree to the <Link href="#" className="text-navy-700 underline">Terms and Conditions</Link> and <Link href="#" className="text-navy-700 underline">Privacy Policy</Link>.
                                  </Label>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="agreeToRates"
                                    checked={formData.agreeToRates}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300"
                                    required
                                  />
                                  <Label htmlFor="agreeToRates" className="text-sm font-normal">
                                    I understand and agree to the Interest Rates, Fees, and Terms of this credit card.
                                  </Label>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="optInPromotions"
                                    checked={formData.optInPromotions}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300"
                                  />
                                  <Label htmlFor="optInPromotions" className="text-sm font-normal">
                                    I would like to receive information about special offers and promotions. (Optional)
                                  </Label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <div className="mt-8 flex justify-between">
                        {currentStep !== 'card-selection' && (
                          <Button
                            variant="outline"
                            onClick={goToPreviousStep}
                          >
                            Previous
                          </Button>
                        )}
                        
                        {currentStep === 'card-selection' && (
                          <div></div> // Empty div to maintain flex layout
                        )}

                        <Button
                          onClick={goToNextStep}
                          disabled={!isStepComplete(currentStep)}
                          className="bg-navy-700 hover:bg-navy-800"
                        >
                          {currentStep === 'security' ? 'Submit Application' : 'Continue'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-1">
                  <div className="sticky top-8 space-y-6">
                    {cardDetails && (
                      <Card>
                        <CardHeader>
                          <CardTitle>{cardDetails.name}</CardTitle>
                          <CardDescription>{cardDetails.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Annual Fee</span>
                              <span className="font-medium">{cardDetails.annualFee === 0 ? 'No annual fee' : `$${cardDetails.annualFee}`}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Intro APR</span>
                              <span className="font-medium">{cardDetails.introAPR}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Credit Needed</span>
                              <span className="font-medium">{cardDetails.creditNeeded}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Card>
                      <CardHeader>
                        <CardTitle>Application Steps</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className={`mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                              completedSteps.includes('card-selection') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {completedSteps.includes('card-selection') ? <Check className="h-3 w-3" /> : 1}
                            </div>
                            <div>
                              <p className={`font-medium ${currentStep === 'card-selection' ? 'text-navy-700' : ''}`}>Select Card</p>
                              <p className="text-xs text-gray-500">Choose your credit card</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className={`mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                              completedSteps.includes('personal') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {completedSteps.includes('personal') ? <Check className="h-3 w-3" /> : 2}
                            </div>
                            <div>
                              <p className={`font-medium ${currentStep === 'personal' ? 'text-navy-700' : ''}`}>Personal Info</p>
                              <p className="text-xs text-gray-500">Your contact and personal details</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className={`mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                              completedSteps.includes('financial') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {completedSteps.includes('financial') ? <Check className="h-3 w-3" /> : 3}
                            </div>
                            <div>
                              <p className={`font-medium ${currentStep === 'financial' ? 'text-navy-700' : ''}`}>Financial Info</p>
                              <p className="text-xs text-gray-500">Employment and income details</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className={`mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                              completedSteps.includes('review') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {completedSteps.includes('review') ? <Check className="h-3 w-3" /> : 4}
                            </div>
                            <div>
                              <p className={`font-medium ${currentStep === 'review' ? 'text-navy-700' : ''}`}>Review</p>
                              <p className="text-xs text-gray-500">Verify your application details</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className={`mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                              completedSteps.includes('security') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {completedSteps.includes('security') ? <Check className="h-3 w-3" /> : 5}
                            </div>
                            <div>
                              <p className={`font-medium ${currentStep === 'security' ? 'text-navy-700' : ''}`}>Submit</p>
                              <p className="text-xs text-gray-500">Security setup and final submission</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Need Assistance?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">
                            Our credit card specialists are here to help you with your application.
                          </p>
                          <div className="space-y-2 text-sm">
                            <p>Call us at <span className="font-medium">(305) 555-1234</span></p>
                            <p>Monday-Friday: 9am-5pm ET</p>
                            <p>Saturday: 9am-1pm ET</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center py-12">
              <Card className="mx-auto max-w-2xl w-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center pb-6">
                    <div className="mb-4 rounded-full bg-green-100 p-3">
                      <Check className="h-12 w-12 text-green-600" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-navy-700">Application Submitted!</h2>
                    <p className="mb-6 text-gray-600">
                      Thank you for applying for the {cardDetails?.name} with Dade Credit Union.
                    </p>
                    <div className="w-full max-w-md rounded-lg bg-gray-50 p-6">
                      <h3 className="mb-4 text-lg font-semibold">Application Details</h3>
                      <dl className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <dt className="text-gray-500">Application ID</dt>
                          <dd className="font-medium">CC-2025-4321</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Date Submitted</dt>
                          <dd className="font-medium">{new Date().toLocaleDateString()}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Card Type</dt>
                          <dd className="font-medium">{cardDetails?.name}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  <div className="space-y-4 border-t pt-6">
                    <h3 className="text-lg font-semibold">What's Next?</h3>
                    <ol className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-100 text-xs font-medium text-navy-700">1</span>
                        <div>
                          <p className="font-medium">Application Review</p>
                          <p className="text-sm text-gray-600">We're reviewing your application and will process it within 1-2 business days.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-100 text-xs font-medium text-navy-700">2</span>
                        <div>
                          <p className="font-medium">Decision Notification</p>
                          <p className="text-sm text-gray-600">We'll notify you of our decision via email at {formData.email}.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-100 text-xs font-medium text-navy-700">3</span>
                        <div>
                          <p className="font-medium">Card Delivery</p>
                          <p className="text-sm text-gray-600">If approved, you'll receive your new card in the mail within 7-10 business days.</p>
                        </div>
                      </li>
                    </ol>
                    <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                      <Button className="bg-navy-700 hover:bg-navy-800" asChild>
                        <Link href="/dashboard">Go to Dashboard</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/">Return to Home</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Dade Credit Union. All Rights Reserved. Equal Housing Lender. Federally Insured by NCUA.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function CreditCardApplyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreditCardApplyContent />
    </Suspense>
  );
}