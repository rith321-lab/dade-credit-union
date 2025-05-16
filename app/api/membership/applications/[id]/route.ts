import { NextRequest, NextResponse } from 'next/server';
import { membershipApplications } from '@/lib/mockDb';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const idx = membershipApplications.findIndex((m) => m.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    membershipApplications[idx] = { ...membershipApplications[idx], ...body };
    return NextResponse.json(membershipApplications[idx]);
  } catch (error) {
    console.error('Error updating membership application:', error);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
} 