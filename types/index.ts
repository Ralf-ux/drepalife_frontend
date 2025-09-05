export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  avatar?: string;
  verified: boolean;
  createdAt: string;
}

export type UserRole = 'patient' | 'health_expert' | 'admin' | 'visitor';

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  avatar: string;
  available: boolean;
  consultationFee: number;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  type: 'outpatient' | 'emergency' | 'telemedicine';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  medications: string[];
  nextVisit?: string;
}

export interface HealthMetric {
  id: string;
  type: 'blood_pressure' | 'heart_rate' | 'temperature' | 'weight' | 'glucose';
  value: number | string;
  unit: string;
  date: string;
  patientId: string;
}
