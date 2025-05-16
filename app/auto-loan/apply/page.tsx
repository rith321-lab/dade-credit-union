'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Car, CheckCircle2, CreditCard, FileText, UserRound, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from '@/components/logo';

type FormStatus = 'personal' | 'vehicle' | 'employment' | 'financial' | 'review';

export default function AutoLoanApplyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loanType = searchParams.get('type') || 'standard';

  const [activeStep, setActiveStep] = useState<FormStatus>('personal');
  const [completedSteps, setCompletedSteps] = useState<FormStatus[]>([]);
  
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    ssn: '',
    driversLicense: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    housingStatus: 'own',
    monthlyHousingPayment: '',
    timeAtResidence: '',
    
    // Vehicle Information
    loanPurpose: loanType === 'refinance' ? 'refinance' : 'purchase',
    vehicleType: loanType === 'green' ? 'electric' : 'new',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleVin: '',
    vehiclePrice: '',
    downPayment: '',
    tradeInValue: '',
    loanAmount: '',
    loanTerm: '60',
    
    // Employment Information
    employmentStatus: 'employed',
    employerName: '',
    jobTitle: '',
    employmentLength: '',
    annualIncome: '',
    otherIncome: '',
    
    // Financial Information
    creditScore: 'excellent',
    bankName: '',
    accountType: 'checking',
    accountNumber: '',
    routingNumber: '',
    bankruptcyHistory: 'no',
    
    // Consent
    agreeToTerms: false,
    agreeToCredit: false,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleSelectChange = (id: string, value: string) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  
  const isStepComplete = (step: FormStatus): boolean => {
    switch (step) {
      case 'personal':
        return !!formData.firstName && !!formData.lastName && !!formData.email && !!formData.phone && !!formData.address;
      case 'vehicle':
        return !!formData.vehicleYear && !!formData.vehicleMake && !!formData.vehicleModel && !!formData.loanAmount;
      case 'employment':
        return !!formData.employerName && !!formData.annualIncome;
      case 'financial':
        return !!formData.bankName && !!formData.accountNumber && !!formData.routingNumber;
      case 'review':
        return formData.agreeToTerms && formData.agreeToCredit;
      default:
        return false;
    }
  };
  
  const markStepComplete = (step: FormStatus) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };
  
  const goToNextStep = () => {
    if (activeStep === 'personal') {
      markStepComplete('personal');
      setActiveStep('vehicle');
    } else if (activeStep === 'vehicle') {
      markStepComplete('vehicle');
      setActiveStep('employment');
    } else if (activeStep === 'employment') {
      markStepComplete('employment');
      setActiveStep('financial');
    } else if (activeStep === 'financial') {
      markStepComplete('financial');
      setActiveStep('review');
    } else if (activeStep === 'review') {
      handleSubmit();
    }
  };
  
  const goToPreviousStep = () => {
    if (activeStep === 'vehicle') {
      setActiveStep('personal');
    } else if (activeStep === 'employment') {
      setActiveStep('vehicle');
    } else if (activeStep === 'financial') {
      setActiveStep('employment');
    } else if (activeStep === 'review') {
      setActiveStep('financial');
    }
  };
  
  const handleSubmit = async () => {
    // In a real application, this would submit to an API
    console.log('Submitting application:', formData);
    
    // Simulate API call delay
    setTimeout(() => {
      // Redirect to success page with query parameters
      const params = new URLSearchParams({
        type: formData.loanPurpose === 'refinance' ? 'refinance' : formData.vehicleType === 'electric' ? 'green' : 'standard',
        amount: formData.loanAmount,
        term: formData.loanTerm,
        vehicle: `${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel}`
      });
      
      router.push(`/auto-loan/apply/success?${params.toString()}`);
    }, 1500);
  };
  
  const calculateMonthlyPayment = () => {
    const principal = parseFloat(formData.loanAmount) || 0;
    const term = parseInt(formData.loanTerm) || 60;
    const rate = 0.0349; // Example rate of 3.49%
    
    if (principal === 0) return '$0.00';
    
    const monthlyRate = rate / 12;
    const months = term;
    const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    
    return `$${payment.toFixed(2)}`;
  };
  
  const getLoanTypeInfo = () => {
    switch (loanType) {
      case 'green':
        return {
          title: 'Green Vehicle Loan',
          rate: '2.99%',
          description: 'For electric or hybrid vehicles',
        };
      case 'refinance':
        return {
          title: 'Auto Refinance',
          rate: '3.89%',
          description: 'Lower your current auto loan rate',
        };
      case 'used':
        return {
          title: 'Used Auto Loan',
          rate: '4.19%',
          description: 'For vehicles up to 5 years old',
        };
      case 'first-time':
        return {
          title: 'First-Time Buyer Loan',
          rate: '4.49%',
          description: 'For members with limited credit history',
        };
      default:
        return {
          title: 'New Auto Loan',
          rate: '3.49%',
          description: 'For new vehicles from dealerships',
        };
    }
  };
  
  const loanInfo = getLoanTypeInfo();
  
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
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => router.push('/auto-loan')}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="text-2xl font-bold text-navy-700">Auto Loan Application</h1>
            </div>
            <p className="mt-2 text-gray-600">
              {loanInfo.title} - As low as {loanInfo.rate} APR
            </p>
          </div>

              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <Tabs value={activeStep} onValueChange={(value) => setActiveStep(value as FormStatus)}>
                        <TabsList className="grid w-full grid-cols-5">
                          <TabsTrigger 
                            value="personal"
                            disabled={activeStep !== 'personal' && !completedSteps.includes('personal')}
                          >
                            Personal
                          </TabsTrigger>
                          <TabsTrigger 
                            value="vehicle" 
                            disabled={activeStep !== 'vehicle' && !completedSteps.includes('vehicle')}
                          >
                            Vehicle
                          </TabsTrigger>
                          <TabsTrigger 
                            value="employment"
                            disabled={activeStep !== 'employment' && !completedSteps.includes('employment')}
                          >
                            Employment
                          </TabsTrigger>
                          <TabsTrigger 
                            value="financial"
                            disabled={activeStep !== 'financial' && !completedSteps.includes('financial')}
                          >
                            Financial
                          </TabsTrigger>
                          <TabsTrigger 
                            value="review"
                            disabled={activeStep !== 'review' && !completedSteps.includes('review')}
                          >
                            Review
                          </TabsTrigger>
                        </TabsList>

                        {/* Personal Information Tab */}
                        <TabsContent value="personal" className="pt-6">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-xl font-semibold mb-2 flex items-center">
                                <UserRound className="mr-2 h-5 w-5 text-navy-700" />
                                Personal Information
                              </h2>
                              <p className="text-sm text-gray-500">
                                Please provide your personal details for your auto loan application.
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

                            <div className="space-y-2">
                              <Label htmlFor="driversLicense">Driver's License Number</Label>
                              <Input 
                                id="driversLicense" 
                                value={formData.driversLicense} 
                                onChange={handleChange} 
                                required 
                              />
                            </div>

                            <Separator className="my-6" />

                            <div>
                              <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <Home className="mr-2 h-5 w-5 text-navy-700" />
                                Address Information
                              </h3>
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
                                        <SelectItem value="living_with_family">Living with Family</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="monthlyHousingPayment">Monthly Housing Payment</Label>
                                    <div className="relative">
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                      <Input 
                                        id="monthlyHousingPayment" 
                                        className="pl-7" 
                                        value={formData.monthlyHousingPayment} 
                                        onChange={handleChange} 
                                        required 
                                      />
                                    </div>
                                  </div>
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

                        {/* Vehicle Information Tab */}
                        <TabsContent value="vehicle" className="pt-6">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-xl font-semibold mb-2 flex items-center">
                                <Car className="mr-2 h-5 w-5 text-navy-700" />
                                Vehicle Information
                              </h2>
                              <p className="text-sm text-gray-500">
                                Please provide details about the vehicle you're financing.
                              </p>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Loan Purpose</Label>
                                <RadioGroup
                                  value={formData.loanPurpose}
                                  onValueChange={(value) => handleSelectChange('loanPurpose', value)}
                                  className="flex flex-col space-y-1"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="purchase" id="purchase" />
                                    <Label htmlFor="purchase" className="font-normal">Purchase a vehicle</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="refinance" id="refinance" />
                                    <Label htmlFor="refinance" className="font-normal">Refinance an existing auto loan</Label>
                                  </div>
                                </RadioGroup>
                              </div>

                              {formData.loanPurpose === 'purchase' && (
                                <div className="space-y-2">
                                  <Label>Vehicle Type</Label>
                                  <RadioGroup
                                    value={formData.vehicleType}
                                    onValueChange={(value) => handleSelectChange('vehicleType', value)}
                                    className="flex flex-col space-y-1"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="new" id="new" />
                                      <Label htmlFor="new" className="font-normal">New Vehicle</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="used" id="used" />
                                      <Label htmlFor="used" className="font-normal">Used Vehicle</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="electric" id="electric" />
                                      <Label htmlFor="electric" className="font-normal">Electric/Hybrid Vehicle</Label>
                                    </div>
                                  </RadioGroup>
                                </div>
                              )}

                              <div className="grid gap-4 sm:grid-cols-3">
                                <div className="space-y-2">
                                  <Label htmlFor="vehicleYear">Year</Label>
                                  <Input 
                                    id="vehicleYear" 
                                    placeholder="e.g., 2024" 
                                    value={formData.vehicleYear} 
                                    onChange={handleChange} 
                                    required 
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="vehicleMake">Make</Label>
                                  <Input 
                                    id="vehicleMake" 
                                    placeholder="e.g., Toyota" 
                                    value={formData.vehicleMake} 
                                    onChange={handleChange} 
                                    required 
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="vehicleModel">Model</Label>
                                  <Input 
                                    id="vehicleModel" 
                                    placeholder="e.g., Camry" 
                                    value={formData.vehicleModel} 
                                    onChange={handleChange} 
                                    required 
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="vehicleVin">Vehicle Identification Number (VIN)</Label>
                                <Input 
                                  id="vehicleVin" 
                                  placeholder="Optional for new vehicle purchase" 
                                  value={formData.vehicleVin} 
                                  onChange={handleChange} 
                                />
                                <p className="text-xs text-gray-500">
                                  Required for refinance or used vehicle purchase.
                                </p>
                              </div>

                              <Separator className="my-6" />

                              <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                  <DollarSign className="mr-2 h-5 w-5 text-navy-700" />
                                  Loan Details
                                </h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                  <div className="space-y-2">
                                    <Label htmlFor="vehiclePrice">Vehicle Price</Label>
                                    <div className="relative">
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                      <Input 
                                        id="vehiclePrice" 
                                        className="pl-7" 
                                        placeholder="0.00" 
                                        value={formData.vehiclePrice} 
                                        onChange={handleChange} 
                                        required 
                                      />
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label htmlFor="downPayment">Down Payment</Label>
                                    <div className="relative">
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                      <Input 
                                        id="downPayment" 
                                        className="pl-7" 
                                        placeholder="0.00" 
                                        value={formData.downPayment} 
                                        onChange={handleChange} 
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                  <div className="space-y-2">
                                    <Label htmlFor="tradeInValue">Trade-In Value (if applicable)</Label>
                                    <div className="relative">
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                      <Input 
                                        id="tradeInValue" 
                                        className="pl-7" 
                                        placeholder="0.00" 
                                        value={formData.tradeInValue} 
                                        onChange={handleChange} 
                                      />
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label htmlFor="loanAmount">Requested Loan Amount</Label>
                                    <div className="relative">
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                      <Input 
                                        id="loanAmount" 
                                        className="pl-7" 
                                        placeholder="0.00" 
                                        value={formData.loanAmount} 
                                        onChange={handleChange} 
                                        required 
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-4 space-y-2">
                                  <Label htmlFor="loanTerm">Loan Term</Label>
                                  <Select
                                    onValueChange={(value) => handleSelectChange('loanTerm', value)}
                                    value={formData.loanTerm}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="36">36 months (3 years)</SelectItem>
                                      <SelectItem value="48">48 months (4 years)</SelectItem>
                                      <SelectItem value="60">60 months (5 years)</SelectItem>
                                      <SelectItem value="72">72 months (6 years)</SelectItem>
                                      <SelectItem value="84">84 months (7 years)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        {/* Employment Information Tab */}
                        <TabsContent value="employment" className="pt-6">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-xl font-semibold mb-2 flex items-center">
                                <FileText className="mr-2 h-5 w-5 text-navy-700" />
                                Employment Information
                              </h2>
                              <p className="text-sm text-gray-500">
                                Please provide details about your current employment.
                              </p>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Employment Status</Label>
                                <RadioGroup
                                  value={formData.employmentStatus}
                                  onValueChange={(value) => handleSelectChange('employmentStatus', value)}
                                  className="flex flex-col space-y-1"
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
                                    <RadioGroupItem value="unemployed" id="unemployed" />
                                    <Label htmlFor="unemployed" className="font-normal">Unemployed</Label>
                                  </div>
                                </RadioGroup>
                              </div>

                              {(formData.employmentStatus === 'employed' || formData.employmentStatus === 'self_employed') && (
                                <>
                                  <div className="space-y-2">
                                    <Label htmlFor="employerName">Employer Name</Label>
                                    <Input 
                                      id="employerName" 
                                      value={formData.employerName} 
                                      onChange={handleChange} 
                                      required 
                                    />
                                  </div>

                                  <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                      <Label htmlFor="jobTitle">Job Title</Label>
                                      <Input 
                                        id="jobTitle" 
                                        value={formData.jobTitle} 
                                        onChange={handleChange} 
                                        required 
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="employmentLength">Length of Employment</Label>
                                      <Select
                                        onValueChange={(value) => handleSelectChange('employmentLength', value)}
                                        value={formData.employmentLength}
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
                                </>
                              )}

                              <Separator className="my-6" />

                              <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                  <DollarSign className="mr-2 h-5 w-5 text-navy-700" />
                                  Income Information
                                </h3>
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
                                    <Label htmlFor="otherIncome">Other Income (Optional)</Label>
                                    <div className="relative">
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                      <Input 
                                        id="otherIncome" 
                                        className="pl-7" 
                                        placeholder="0.00" 
                                        value={formData.otherIncome} 
                                        onChange={handleChange} 
                                      />
                                    </div>
                                    <p className="text-xs text-gray-500">
                                      Include other sources of income such as alimony, child support, or rental income.
                                    </p>
                                  </div>
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
                                <CreditCard className="mr-2 h-5 w-5 text-navy-700" />
                                Financial Information
                              </h2>
                              <p className="text-sm text-gray-500">
                                Please provide your banking and credit information.
                              </p>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Estimated Credit Score</Label>
                                <RadioGroup
                                  value={formData.creditScore}
                                  onValueChange={(value) => handleSelectChange('creditScore', value)}
                                  className="grid grid-cols-2 gap-2"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="excellent" id="excellent" />
                                    <Label htmlFor="excellent" className="font-normal">Excellent (750+)</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="good" id="good" />
                                    <Label htmlFor="good" className="font-normal">Good (700-749)</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="fair" id="fair" />
                                    <Label htmlFor="fair" className="font-normal">Fair (650-699)</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="poor" id="poor" />
                                    <Label htmlFor="poor" className="font-normal">Poor (below 650)</Label>
                                  </div>
                                </RadioGroup>
                              </div>

                              <Separator className="my-6" />

                              <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                  <DollarSign className="mr-2 h-5 w-5 text-navy-700" />
                                  Banking Information
                                </h3>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="bankName">Bank Name</Label>
                                    <Input 
                                      id="bankName" 
                                      value={formData.bankName} 
                                      onChange={handleChange} 
                                      required 
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="accountType">Account Type</Label>
                                    <Select
                                      onValueChange={(value) => handleSelectChange('accountType', value)}
                                      value={formData.accountType}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="checking">Checking</SelectItem>
                                        <SelectItem value="savings">Savings</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                      <Label htmlFor="accountNumber">Account Number</Label>
                                      <Input 
                                        id="accountNumber" 
                                        value={formData.accountNumber} 
                                        onChange={handleChange} 
                                        required 
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="routingNumber">Routing Number</Label>
                                      <Input 
                                        id="routingNumber" 
                                        value={formData.routingNumber} 
                                        onChange={handleChange} 
                                        required 
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Separator className="my-6" />

                              <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                  <FileText className="mr-2 h-5 w-5 text-navy-700" />
                                  Additional Information
                                </h3>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label>Have you had a bankruptcy in the past 7 years?</Label>
                                    <RadioGroup
                                      value={formData.bankruptcyHistory}
                                      onValueChange={(value) => handleSelectChange('bankruptcyHistory', value)}
                                      className="flex space-x-4"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="bankruptcy_yes" />
                                        <Label htmlFor="bankruptcy_yes" className="font-normal">Yes</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="bankruptcy_no" />
                                        <Label htmlFor="bankruptcy_no" className="font-normal">No</Label>
                                      </div>
                                    </RadioGroup>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        {/* Review and Submit Tab */}
                        <TabsContent value="review" className="pt-6">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-xl font-semibold mb-2 flex items-center">
                                <CheckCircle2 className="mr-2 h-5 w-5 text-navy-700" />
                                Review and Submit
                              </h2>
                              <p className="text-sm text-gray-500">
                                Please review your application before submitting.
                              </p>
                            </div>

                            <div className="space-y-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Personal Information</CardTitle>
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
                                  </dl>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mt-4 text-navy-700"
                                    onClick={() => setActiveStep('personal')}
                                  >
                                    Edit
                                  </Button>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Vehicle Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                    <div>
                                      <dt className="text-gray-500">Loan Purpose</dt>
                                      <dd className="capitalize">{formData.loanPurpose.replace('_', ' ')}</dd>
                                    </div>
                                    <div>
                                      <dt className="text-gray-500">Vehicle</dt>
                                      <dd>{formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel}</dd>
                                    </div>
                                    <div>
                                      <dt className="text-gray-500">Loan Amount</dt>
                                      <dd>${parseFloat(formData.loanAmount || '0').toLocaleString()}</dd>
                                    </div>
                                    <div>
                                      <dt className="text-gray-500">Loan Term</dt>
                                      <dd>{formData.loanTerm} months</dd>
                                    </div>
                                    <div>
                                      <dt className="text-gray-500">Down Payment</dt>
                                      <dd>${parseFloat(formData.downPayment || '0').toLocaleString()}</dd>
                                    </div>
                                    <div>
                                      <dt className="text-gray-500">Estimated Monthly Payment</dt>
                                      <dd className="font-semibold">{calculateMonthlyPayment()}</dd>
                                    </div>
                                  </dl>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mt-4 text-navy-700"
                                    onClick={() => setActiveStep('vehicle')}
                                  >
                                    Edit
                                  </Button>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Employment & Financial Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                    <div>
                                      <dt className="text-gray-500">Employment Status</dt>
                                      <dd className="capitalize">{formData.employmentStatus.replace('_', ' ')}</dd>
                                    </div>
                                    <div>
                                      <dt className="text-gray-500">Employer</dt>
                                      <dd>{formData.employerName}</dd>
                                    </div>
                                    <div>
                                      <dt className="text-gray-500">Annual Income</dt>
                                      <dd>${parseFloat(formData.annualIncome || '0').toLocaleString()}</dd>
                                    </div>
                                    <div>
                                      <dt className="text-gray-500">Credit Score Range</dt>
                                      <dd className="capitalize">{formData.creditScore}</dd>
                                    </div>
                                  </dl>
                                  <div className="flex space-x-4">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="mt-4 text-navy-700"
                                      onClick={() => setActiveStep('employment')}
                                    >
                                      Edit Employment
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="mt-4 text-navy-700"
                                      onClick={() => setActiveStep('financial')}
                                    >
                                      Edit Financial
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>

                              <div className="space-y-4 rounded-lg border p-6">
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
                                      I agree to the <Link href="#" className="text-navy-700 underline">Terms and Conditions</Link> and <Link href="#" className="text-navy-700 underline">Privacy Policy</Link>.
                                    </Label>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id="agreeToCredit"
                                      checked={formData.agreeToCredit}
                                      onChange={handleChange}
                                      className="h-4 w-4 rounded border-gray-300"
                                      required
                                    />
                                    <Label htmlFor="agreeToCredit" className="text-sm font-normal">
                                      I authorize Dade Credit Union to obtain my credit report and verify the information provided in this application.
                                    </Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <div className="mt-8 flex justify-between">
                        {activeStep !== 'personal' && (
                          <Button
                            variant="outline"
                            onClick={goToPreviousStep}
                          >
                            Previous
                          </Button>
                        )}
                        
                        {activeStep === 'personal' && (
                          <div></div> // Empty div to maintain flex layout
                        )}

                        <Button
                          onClick={goToNextStep}
                          disabled={!isStepComplete(activeStep)}
                          className="bg-navy-700 hover:bg-navy-800"
                        >
                          {activeStep === 'review' ? 'Submit Application' : 'Continue'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-1">
                  <div className="sticky top-8 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>{loanInfo.title}</CardTitle>
                        <CardDescription>{loanInfo.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Rate as low as</span>
                            <span className="text-2xl font-bold text-navy-700">{loanInfo.rate} APR*</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Estimated Payment</span>
                            <span className="text-lg font-semibold">
                              {formData.loanAmount ? calculateMonthlyPayment() : '$0.00'}
                            </span>
                          </div>
                          <Separator />
                          <div className="text-xs text-gray-500">
                            *APR = Annual Percentage Rate. Rates are based on creditworthiness and are subject to change without notice.
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
                            Our loan specialists are here to help you through the application process.
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-navy-700" />
                              <span className="text-sm">Fill out the form at your pace</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-navy-700" />
                              <span className="text-sm">Save and return anytime</span>
                            </div>
                            <div className="flex items-center">
                              <UserRound className="mr-2 h-4 w-4 text-navy-700" />
                              <span className="text-sm">Personal assistance available</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm font-medium">Call us</p>
                            <p className="text-lg font-semibold text-navy-700">(305) 555-1234</p>
                            <p className="text-xs text-gray-500">Monday-Friday, 9am-5pm ET</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
        </div>
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Dade Credit Union. All Rights Reserved. NMLS #12345. Equal Housing Lender.
          </p>
        </div>
      </footer>
    </div>
  );
}