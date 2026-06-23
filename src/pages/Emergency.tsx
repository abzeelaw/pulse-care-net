import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  Ambulance, 
  MapPin, 
  ChevronLeft, 
  Phone, 
  Clock,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { useHealthStore } from '../hooks/useHealthStore';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';

const EMERGENCY_TYPES = [
  { id: 'accident', label: 'Accident', icon: '🚗' },
  { id: 'childbirth', label: 'Childbirth', icon: '👶' },
  { id: 'heart', label: 'Heart Issue', icon: '❤️' },
  { id: 'injury', label: 'Severe Injury', icon: '🤕' },
  { id: 'unconscious', label: 'Unconscious', icon: '💤' },
  { id: 'other', label: 'Other', icon: '❓' }
];

const Emergency = () => {
  const navigate = useNavigate();
  const { requestEmergency, updateEmergencyStatus, phone } = useHealthStore();
  const [step, setStep] = useState(1); // 1: Type, 2: Location, 3: Tracking
  const [selectedType, setSelectedType] = useState('');
  const [address, setAddress] = useState('Independence Way, Kaduna North');
  const [requestId, setRequestId] = useState('');

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setStep(2);
  };

  const handleConfirmRequest = () => {
    const req = requestEmergency({
      userId: 'u1',
      type: selectedType,
      location: { lat: 10.5105, lng: 7.4165, address }
    });
    setRequestId(req.id);
    setStep(3);
    toast.success('Ambulance requested successfully!');
    
    // Simulate dispatcher updates
    setTimeout(() => {
      updateEmergencyStatus(req.id, 'dispatched');
      toast.info('Ambulance has been dispatched from Barau Dikko Hospital');
    }, 5000);
  };

  if (step === 3) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-slate-900 p-6 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-2xl shadow-red-500/50">
            <Ambulance className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Ambulance on the way</h2>
          <p className="text-slate-400 text-sm mb-8">Estimated arrival: <span className="text-red-400 font-bold">8 - 12 minutes</span></p>
          
          <Card className="w-full bg-slate-800 border-slate-700 p-4 space-y-4">
            <div className="flex items-center gap-3 text-left">
              <div className="bg-emerald-500/20 p-2 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Status</p>
                <p className="text-white font-medium">Ambulance Dispatched</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="bg-cyan-500/20 p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-cyan-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Pickup Location</p>
                <p className="text-white font-medium truncate max-w-[200px]">{address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Navigation className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Assigned Provider</p>
                <p className="text-white font-medium">KDSG Emergency Unit 04</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-auto space-y-3">
          <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-lg font-bold">
            <Phone className="w-5 h-5 mr-2" />
            Call Driver
          </Button>
          <Button variant="ghost" className="w-full text-slate-400" onClick={() => navigate('/')}>
            Cancel Emergency
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <header className="flex items-center gap-3">
        <button onClick={() => step === 1 ? navigate('/') : setStep(1)} className="p-2 hover:bg-slate-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-slate-800">
          {step === 1 ? 'What is the Emergency?' : 'Confirm Location'}
        </h2>
      </header>

      {step === 1 && (
        <div className="grid grid-cols-2 gap-4">
          {EMERGENCY_TYPES.map(type => (
            <button
              key={type.id}
              onClick={() => handleTypeSelect(type.id)}
              className="p-6 bg-white border-2 border-slate-100 rounded-3xl flex flex-col items-center gap-3 active:border-red-500 active:bg-red-50 transition-all hover:border-red-200"
            >
              <span className="text-4xl">{type.icon}</span>
              <span className="font-bold text-slate-700">{type.label}</span>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <AlertTriangle className="w-6 h-6" />
              <p className="font-bold">Urgent: {EMERGENCY_TYPES.find(t => t.id === selectedType)?.label}</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Emergency Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pl-10 h-24 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter detailed address..."
                />
              </div>
              <p className="text-[10px] text-slate-500 italic">GPS accurately pinpointed you to Independence Way</p>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <Clock className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs font-bold text-slate-700">Estimated Arrival</p>
                <p className="text-xs text-slate-500">8 - 12 minutes (Nearby: 2 units)</p>
              </div>
            </div>
          </Card>

          <Button 
            className="w-full h-16 bg-red-600 hover:bg-red-700 text-xl font-black shadow-xl shadow-red-200"
            onClick={handleConfirmRequest}
          >
            CONFIRM REQUEST
          </Button>
        </div>
      )}

      {step === 1 && (
        <div className="bg-slate-100 p-4 rounded-2xl flex items-center gap-4">
          <div className="bg-white p-2 rounded-lg">
            <Phone className="w-5 h-5 text-slate-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-700">Direct Emergency Dial</p>
            <p className="text-xs text-slate-500">Call 122 or 911 immediately</p>
          </div>
          <Button size="sm" className="bg-slate-800">Call Now</Button>
        </div>
      )}
    </div>
  );
};

export default Emergency;
