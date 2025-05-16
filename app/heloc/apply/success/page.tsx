'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HelocSuccessPage() {
  const params = useSearchParams();
  const id = params.get('id');
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-navy-700">Application Submitted</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Thank you for applying for a Home Equity Line of Credit. Your application ID is <span className="font-medium">{id}</span>.
        Our lending specialists will review your request and contact you within 1 business day.
      </p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
} 