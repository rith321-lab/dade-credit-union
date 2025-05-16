import { NextRequest, NextResponse } from 'next/server';
import { helocApplications, HelocApplication } from '@/lib/mockDb';
import { randomUUID } from 'crypto';

// GET /api/heloc/applications
export async function GET() {
  return NextResponse.json(helocApplications);
}

// POST /api/heloc/applications
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<HelocApplication>;
    const newApp: HelocApplication = {
      id: randomUUID(),
      firstName: body.firstName || '',
      lastName: body.lastName || '',
      email: body.email || '',
      phone: body.phone || '',
      propertyAddress: body.propertyAddress || '',
      propertyValue: Number(body.propertyValue) || 0,
      mortgageBalance: Number(body.mortgageBalance) || 0,
      requestedLine: Number(body.requestedLine) || 0,
      submissionDate: new Date().toISOString(),
      status: 'Pending',
      zestScore: Math.floor(Math.random() * 21) + 80, // 80-100
    };

    helocApplications.unshift(newApp);

    return NextResponse.json(newApp, { status: 201 });
  } catch (error) {
    console.error('Error creating HELOC application:', error);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
} 