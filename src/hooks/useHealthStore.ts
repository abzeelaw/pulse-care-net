import { useState, useEffect } from 'react';
import { Doctor, Hospital, Appointment, EmergencyRequest } from '../data/mockData';

export interface Prescription {
  id: string;
  doctorName: string;
  medicine: string;
  date: string;
}

export interface HealthState {
  id: string;
  name: string;
  phone: string;
  location: string;
  ruralMode: boolean;
  appointments: Appointment[];
  emergencies: EmergencyRequest[];
  medicalHistory: string[];
  prescriptions: Prescription[];
}

export function useHealthStore() {
  const [state, setState] = useState<HealthState>(() => {
    const saved = localStorage.getItem('kaduna-health-store');
    if (saved) return JSON.parse(saved);
    return {
      id: 'u1',
      name: 'John Doe',
      phone: '08012345678',
      location: 'Kaduna South',
      ruralMode: false,
      appointments: [],
      emergencies: [],
      medicalHistory: ['No known allergies', 'Blood Type: O+'],
      prescriptions: [
        { id: 'p1', doctorName: 'Dr. Bello Aminu', medicine: 'Paracetamol 500mg', date: '2023-10-20' }
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem('kaduna-health-store', JSON.stringify(state));
  }, [state]);

  const setRuralMode = (ruralMode: boolean) => setState(prev => ({ ...prev, ruralMode }));
  
  const addAppointment = (appointment: Appointment) => 
    setState(prev => ({ ...prev, appointments: [appointment, ...prev.appointments] }));
    
  const cancelAppointment = (id: string) =>
    setState(prev => ({ ...prev, appointments: prev.appointments.filter(a => a.id !== id) }));

  const requestEmergency = (req: Omit<EmergencyRequest, 'id' | 'timestamp' | 'status'>) => {
    const newReq: EmergencyRequest = {
      ...req,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    setState(prev => ({ ...prev, emergencies: [newReq, ...prev.emergencies] }));
    return newReq;
  };

  const updateEmergencyStatus = (id: string, status: EmergencyRequest['status']) =>
    setState(prev => ({ 
      ...prev, 
      emergencies: prev.emergencies.map(e => e.id === id ? { ...e, status } : e) 
    }));

  const addMedicalHistory = (note: string) =>
    setState(prev => ({ ...prev, medicalHistory: [note, ...prev.medicalHistory] }));

  return {
    ...state,
    setRuralMode,
    addAppointment,
    cancelAppointment,
    requestEmergency,
    updateEmergencyStatus,
    addMedicalHistory
  };
}
