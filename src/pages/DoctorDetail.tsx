import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle,
  MessageSquare,
  Phone,
  Video,
  Info,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { DOCTORS } from '../data/mockData';
import { useHealthStore } from '../hooks/useHealthStore';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addAppointment } = useHealthStore();
  const doctor = DOCTORS.find(d => d.id === id);
  const [activeTab, setActiveTab] = useState('about');
  const [selectedDate, setSelectedDate] = useState('Oct 24, 2023');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  if (!doctor) return <div className="p-8 text-center">Doctor not found</div>;

  const handleBook = (type: 'chat' | 'audio' | 'video') => {
    const appointment = {
      id: Math.random().toString(36).substr(2, 9),
      doctorId: doctor.id,
      userId: 'u1',
      date: selectedDate,
      time: selectedTime,
      type,
      status: 'upcoming' as const
    };
    addAppointment(appointment);
    toast.success(`Consultation booked with ${doctor.name}!`);
    navigate('/appointments');
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-64">
        <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold">{doctor.name}</h2>
              <CheckCircle className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
            </div>
            <p className="text-cyan-200 font-medium text-sm">{doctor.specialty}</p>
          </div>
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-bold">{doctor.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 -mt-6 bg-white rounded-t-3xl relative z-10">
        <div className="flex gap-4 border-b border-slate-100">
          {['about', 'schedule', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-bold capitalize transition-colors relative ${
                activeTab === tab ? 'text-cyan-600' : 'text-slate-400'
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-600 rounded-full" />}
            </button>
          ))}
        </div>

        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-600" />
                About Doctor
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{doctor.bio}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                Qualifications
              </h3>
              <div className="flex flex-wrap gap-2">
                {doctor.qualifications.map(q => (
                  <span key={q} className="bg-slate-50 border border-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full font-medium">
                    {q}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-800">Select Consultation</h3>
              <div className="grid grid-cols-3 gap-3">
                <button onClick={() => handleBook('chat')} className="p-4 bg-slate-50 hover:bg-cyan-50 border border-slate-100 hover:border-cyan-200 rounded-2xl flex flex-col items-center gap-2 transition-all">
                  <MessageSquare className="w-6 h-6 text-cyan-600" />
                  <span className="text-[10px] font-bold text-slate-600">Chat</span>
                  <span className="text-[10px] font-bold text-cyan-700">{doctor.fee}</span>
                </button>
                <button onClick={() => handleBook('audio')} className="p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 rounded-2xl flex flex-col items-center gap-2 transition-all">
                  <Phone className="w-6 h-6 text-emerald-600" />
                  <span className="text-[10px] font-bold text-slate-600">Voice</span>
                  <span className="text-[10px] font-bold text-emerald-700">{doctor.fee}</span>
                </button>
                <button onClick={() => handleBook('video')} className="p-4 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-2xl flex flex-col items-center gap-2 transition-all">
                  <Video className="w-6 h-6 text-blue-600" />
                  <span className="text-[10px] font-bold text-slate-600">Video</span>
                  <span className="text-[10px] font-bold text-blue-700">{doctor.fee}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-600" />
                Available Dates
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {['Oct 24', 'Oct 25', 'Oct 26', 'Oct 27'].map(date => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date + ', 2023')}
                    className={`min-w-[70px] p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${
                      selectedDate.startsWith(date) 
                        ? 'border-cyan-600 bg-cyan-50' 
                        : 'border-slate-100 bg-white'
                    }`}
                  >
                    <span className={`text-[10px] font-bold ${selectedDate.startsWith(date) ? 'text-cyan-600' : 'text-slate-400'}`}>OCT</span>
                    <span className={`text-lg font-black ${selectedDate.startsWith(date) ? 'text-cyan-700' : 'text-slate-700'}`}>{date.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-600" />
                Available Time
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM'].map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedTime === time 
                        ? 'bg-cyan-600 text-white border-cyan-600' 
                        : 'bg-white text-slate-600 border-slate-100 hover:border-cyan-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 max-w-md mx-auto z-50">
        <Button 
          className="w-full h-14 bg-cyan-600 hover:bg-cyan-700 text-lg font-bold rounded-2xl"
          onClick={() => handleBook('chat')}
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
};

export default DoctorDetail;
