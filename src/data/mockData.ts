export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  availability: string;
  fee: string;
  rating: number;
  reviews: number;
  image: string;
  bio: string;
  qualifications: string[];
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  services: string[];
  emergency: boolean;
  bedsAvailable: number;
  contact: string;
  image: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  userId: string;
  date: string;
  time: string;
  type: 'chat' | 'audio' | 'video';
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface EmergencyRequest {
  id: string;
  userId: string;
  type: string;
  location: { lat: number; lng: number; address: string };
  timestamp: string;
  status: 'pending' | 'dispatched' | 'arrived' | 'completed';
}

export const DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Bello Aminu',
    specialty: 'General Medicine',
    hospital: 'Kaduna State Specialist Hospital',
    availability: 'Mon - Fri, 08:00 - 16:00',
    fee: '₦2,000',
    rating: 4.8,
    reviews: 124,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/4746c5ca-be87-435f-8cc4-be50cf51fdd3/dr--bello-aminu-f972c8d9-1782224064015.webp',
    bio: 'Experienced General Practitioner with over 10 years of service in Kaduna State. Dedicated to providing quality primary care.',
    qualifications: ['MBBS', 'MWACP']
  },
  {
    id: 'd2',
    name: 'Dr. Zainab Yusuf',
    specialty: 'Cardiology',
    hospital: 'Zaria Medical Center',
    availability: 'Tue, Thu, Sat, 10:00 - 14:00',
    fee: '₦5,000',
    rating: 4.9,
    reviews: 89,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/4746c5ca-be87-435f-8cc4-be50cf51fdd3/dr--zainab-yusuf-09ab998f-1782224064036.webp',
    bio: 'Specialist Cardiologist focusing on preventive heart health and chronic condition management.',
    qualifications: ['MBBS', 'FWACP (Cardiology)']
  },
  {
    id: 'd3',
    name: 'Dr. Emmanuel Okon',
    specialty: 'Pediatrics',
    hospital: "St. Gerard's Catholic Hospital",
    availability: 'Daily, 09:00 - 17:00',
    fee: '₦3,000',
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200',
    bio: 'Pediatrician with a passion for child health and nutrition. Serving the Kaduna community for 15 years.',
    qualifications: ['MBBS', 'FMC Paed']
  },
  {
    id: 'd4',
    name: 'Dr. Aisha Musa',
    specialty: 'Gynecology',
    hospital: 'Barau Dikko Teaching Hospital',
    availability: 'Mon, Wed, Fri, 08:00 - 12:00',
    fee: '₦4,000',
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200',
    bio: "Expert in maternal health and reproductive medicine. Committed to safe delivery and women's wellness.",
    qualifications: ['MBBS', 'FWACS']
  }
];

export const HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: 'Kaduna State Specialist Hospital',
    location: 'Independence Way, Kaduna',
    services: ['Emergency', 'Surgery', 'Maternity', 'Lab Services'],
    emergency: true,
    bedsAvailable: 15,
    contact: '0803 000 0001',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/4746c5ca-be87-435f-8cc4-be50cf51fdd3/kaduna-state-specialist-hospital-3ef8c720-1782224063821.webp'
  },
  {
    id: 'h2',
    name: 'Barau Dikko Teaching Hospital',
    location: 'Lafia Road, Kaduna',
    services: ['Tertiary Care', 'Emergency', 'Pediatrics', 'Oncology'],
    emergency: true,
    bedsAvailable: 8,
    contact: '0803 000 0002',
    image: 'https://images.unsplash.com/photo-1587351591046-385c9ce2d11e?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 'h3',
    name: '44 Nigerian Army Reference Hospital',
    location: 'Kaduna North',
    services: ['Multi-specialty', 'Trauma Center', 'Dialysis'],
    emergency: true,
    bedsAvailable: 25,
    contact: '0803 000 0003',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600&h=400'
  }
];

export const SPECIALTIES = [
  'General Medicine',
  'Pediatrics',
  'Gynecology',
  'Cardiology',
  'Orthopedics',
  'Mental Health',
  'Emergency Medicine'
];

export const HEALTH_TIPS = [
  {
    id: 't1',
    title: 'Stay Hydrated',
    content: 'The Kaduna heat can be intense. Drink at least 8 glasses of water daily.',
    category: 'General'
  },
  {
    id: 't2',
    title: 'Malaria Prevention',
    content: 'Sleep under a treated mosquito net and clear stagnant water around your home.',
    category: 'Prevention'
  },
  {
    id: 't3',
    title: 'Maternal Care',
    content: "Regular antenatal checkups are crucial for both mother and baby's health.",
    category: 'Maternity'
  }
];
