import { NextRequest, NextResponse } from 'next/server';
import { helocApplications } from '@/lib/mockDb';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const appIndex = helocApplications.findIndex((a) => a.id === id);
    if (appIndex === -1) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    helocApplications[appIndex] = { ...helocApplications[appIndex], ...body };
    return NextResponse.json(helocApplications[appIndex]);
  } catch (error) {
    console.error('Error updating HELOC application:', error);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
} 