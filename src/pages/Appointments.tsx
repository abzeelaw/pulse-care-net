import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  MessageSquare, 
  Phone,
  MoreVertical,
  XCircle,
  CheckCircle2
} from 'lucide-react';
import { useHealthStore } from '../hooks/useHealthStore';
import { DOCTORS } from '../data/mockData';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const Appointments = () => {
  const { appointments, cancelAppointment } = useHealthStore();

  const handleCancel = (id: string) => {
    cancelAppointment(id);
    toast.info('Appointment cancelled successfully');
  };

  const upcoming = appointments.filter(a => a.status === 'upcoming');
  const past = appointments.filter(a => a.status !== 'upcoming');

  return (
    <div className="p-4 space-y-6 pb-24">
      <header className="flex items-center gap-3">
        <Link to="/" className="p-2 hover:bg-slate-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-slate-700" />
        </Link>
        <h2 className="text-xl font-bold text-slate-800">My Appointments</h2>
      </header>

      {/* Upcoming Section */}
      <section className="space-y-4">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">Upcoming</h3>
        
        {upcoming.length > 0 ? (
          upcoming.map(app => {
            const doctor = DOCTORS.find(d => d.id === app.doctorId);
            return (
              <Card key={app.id} className="p-5 border-slate-200 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-2">
                  <button className="p-2 text-slate-400"><MoreVertical className="w-4 h-4" /></button>
                </div>
                
                <div className="flex gap-4 mb-5">
                  <img src={doctor?.image} alt={doctor?.name} className="w-16 h-16 rounded-2xl object-cover" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800">{doctor?.name}</h4>
                    <p className="text-xs text-cyan-600 font-medium">{doctor?.specialty}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <MapPin className="w-3 h-3" />
                      <span>{doctor?.hospital}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center mb-5 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-600" />
                    <span className="text-xs font-bold text-slate-700">{app.date}</span>
                  </div>
                  <div className="w-[1px] h-4 bg-slate-200" />
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-600" />
                    <span className="text-xs font-bold text-slate-700">{app.time}</span>
                  </div>
                  <div className="w-[1px] h-4 bg-slate-200" />
                  <div className="flex items-center gap-2">
                    {app.type === 'video' && <Video className="w-4 h-4 text-cyan-600" />}
                    {app.type === 'chat' && <MessageSquare className="w-4 h-4 text-cyan-600" />}
                    {app.type === 'audio' && <Phone className="w-4 h-4 text-cyan-600" />}
                    <span className="text-xs font-bold text-slate-700 capitalize">{app.type}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 h-10 font-bold" onClick={() => handleCancel(app.id)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700 h-10 font-bold shadow-lg shadow-cyan-100">
                    Join Call
                  </Button>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-10 bg-white rounded-3xl border-2 border-dashed border-slate-100">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm font-medium">No upcoming appointments</p>
            <Link to="/doctors" className="text-cyan-600 text-xs font-bold mt-2 block underline">Book one now</Link>
          </div>
        )}
      </section>

      {/* Past Section */}
      <section className="space-y-4">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">Past Sessions</h3>
        <div className="space-y-3 opacity-60">
          <Card className="p-4 border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">Dr. Aisha Musa</p>
                <p className="text-[10px] text-slate-500">Oct 15, 2023 • Video Consultation</p>
              </div>
            </div>
            <button className="text-[10px] font-bold text-cyan-600">REBOOK</button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Appointments;
