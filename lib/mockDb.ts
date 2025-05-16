export interface HelocApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  propertyValue: number;
  mortgageBalance: number;
  requestedLine: number;
  submissionDate: string; // ISO string
  status: 'Pending' | 'In Progress' | 'Approved' | 'Declined';
  zestScore: number; // 0-100 risk score simulation
}

export const helocApplications: HelocApplication[] = [];

export interface MembershipApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  submissionDate: string;
  status: 'Pending' | 'In Progress' | 'Approved' | 'Declined';
  idVerified: boolean;
}

export const membershipApplications: MembershipApplication[] = []; 