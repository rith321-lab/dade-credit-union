'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X } from 'lucide-react';

interface HelocApplication {
  id: string;
  firstName: string;
  lastName: string;
  submissionDate: string;
  requestedLine: number;
  status: string;
  zestScore: number;
}

export default function HelocApplicationsTable() {
  const [apps, setApps] = useState<HelocApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = async () => {
    setLoading(true);
    const res = await fetch('/api/heloc/applications');
    const data = await res.json();
    setApps(data);
    setLoading(false);
  };

  useEffect(() => { fetchApps(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/heloc/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchApps();
  };

  if (loading) return <p>Loading...</p>;

  if (!apps.length) return <p className="text-sm text-gray-500">No applications yet.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Applicant</TableHead>
          <TableHead>Submission Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Zest AI Score</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apps.map((app) => (
          <TableRow key={app.id}>
            <TableCell className="font-medium">{app.id}</TableCell>
            <TableCell>{app.firstName} {app.lastName}</TableCell>
            <TableCell>{new Date(app.submissionDate).toLocaleDateString()}</TableCell>
            <TableCell>${app.requestedLine.toLocaleString()}</TableCell>
            <TableCell>{app.status}</TableCell>
            <TableCell>{app.zestScore}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => updateStatus(app.id, 'Approved')} className="h-8 w-8 p-0">
                  <Check className="h-4 w-4 text-green-600" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => updateStatus(app.id, 'Declined')} className="h-8 w-8 p-0">
                  <X className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 