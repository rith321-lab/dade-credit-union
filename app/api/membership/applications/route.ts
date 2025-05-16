import { NextRequest, NextResponse } from 'next/server';
import { membershipApplications, MembershipApplication } from '@/lib/mockDb';
import { randomUUID } from 'crypto';

export async function GET() {
  return NextResponse.json(membershipApplications);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<MembershipApplication>;
    const newApp: MembershipApplication = {
      id: randomUUID(),
      firstName: body.firstName || '',
      lastName: body.lastName || '',
      email: body.email || '',
      phone: body.phone || '',
      submissionDate: new Date().toISOString(),
      status: 'Pending',
      idVerified: false,
    };

    membershipApplications.unshift(newApp);
    return NextResponse.json(newApp, { status: 201 });
  } catch (error) {
    console.error('Error creating membership application:', error);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
} 