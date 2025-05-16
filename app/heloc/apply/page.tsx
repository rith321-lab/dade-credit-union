'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  propertyValue: string;
  mortgageBalance: string;
  requestedLine: string;
}

const steps = ['Personal Info', 'Property Info', 'Review'];

export default function HelocApplyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    propertyValue: '',
    mortgageBalance: '',
    requestedLine: '',
  });
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/heloc/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          propertyValue: Number(formData.propertyValue),
          mortgageBalance: Number(formData.mortgageBalance),
          requestedLine: Number(formData.requestedLine),
        }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      router.push(`/heloc/apply/success?id=${data.id}`);
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="font-bold text-lg text-navy-700">Dade County FCU</Link>
          <span className="text-sm text-gray-500">HELOC Application</span>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto max-w-2xl px-4 py-8 md:px-6">
          <h1 className="text-2xl font-bold mb-4">Step {currentStep + 1}: {steps[currentStep]}</h1>

          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={formData.firstName} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="propertyAddress">Property Address</Label>
                <Input id="propertyAddress" value={formData.propertyAddress} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyValue">Estimated Property Value ($)</Label>
                <Input id="propertyValue" type="number" value={formData.propertyValue} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mortgageBalance">Current Mortgage Balance ($)</Label>
                <Input id="mortgageBalance" type="number" value={formData.mortgageBalance} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requestedLine">Requested Credit Line ($)</Label>
                <Input id="requestedLine" type="number" value={formData.requestedLine} onChange={handleChange} />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Property:</strong> {formData.propertyAddress}</p>
              <p><strong>Value:</strong> ${formData.propertyValue}</p>
              <p><strong>Mortgage Balance:</strong> ${formData.mortgageBalance}</p>
              <p><strong>Requested Line:</strong> ${formData.requestedLine}</p>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button variant="outline" disabled={currentStep === 0} onClick={back}>Back</Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={next}>Continue</Button>
            ) : (
              <Button className="bg-navy-700 hover:bg-navy-800" onClick={handleSubmit}>Submit Application</Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 