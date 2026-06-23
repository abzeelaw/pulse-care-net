import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Calendar, 
  ChevronRight, 
  Search, 
  Heart, 
  Activity,
  UserCheck
} from 'lucide-react';
import { useHealthStore } from '../hooks/useHealthStore';
import { DOCTORS, HEALTH_TIPS, HOSPITALS } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const Dashboard = () => {
  const { name, appointments, setRuralMode, ruralMode } = useHealthStore();
  const upcomingAppointment = appointments.find(a => a.status === 'upcoming');

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <section className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">Welcome back,</p>
          <h2 className="text-2xl font-bold text-slate-800">{name}</h2>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-xs font-medium text-slate-500">Rural Mode</span>
           <button 
            onClick={() => setRuralMode(!ruralMode)}
            className={`w-12 h-6 rounded-full transition-colors relative ${ruralMode ? 'bg-cyan-600' : 'bg-slate-300'}`}
           >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${ruralMode ? 'translate-x-7' : 'translate-x-1'}`} />
           </button>
        </div>
      </section>

      {/* Emergency Button */}
      <Link to="/emergency" className="block">
        <Card className="bg-red-50 border-red-100 p-5 flex items-center gap-4 active:scale-[0.98] transition-transform">
          <div className="bg-red-600 p-3 rounded-2xl shadow-lg shadow-red-200">
            <AlertTriangle className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="text-red-700 font-bold text-lg">Emergency Help</h3>
            <p className="text-red-600/80 text-sm">Request an ambulance now</p>
          </div>
          <ChevronRight className="w-6 h-6 text-red-400 ml-auto" />
        </Card>
      </Link>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/doctors">
          <Card className="p-4 flex flex-col items-center text-center gap-2 hover:bg-slate-50 border-slate-200">
            <div className="bg-cyan-100 p-3 rounded-xl text-cyan-600">
              <UserCheck className="w-6 h-6" />
            </div>
            <span className="font-semibold text-sm">Find Doctors</span>
          </Card>
        </Link>
        <Link to="/hospitals">
          <Card className="p-4 flex flex-col items-center text-center gap-2 hover:bg-slate-50 border-slate-200">
            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
              <Search className="w-6 h-6" />
            </div>
            <span className="font-semibold text-sm">Hospitals</span>
          </Card>
        </Link>
      </div>

      {/* Upcoming Appointment */}
      {upcomingAppointment && (
        <section>
          <h3 className="text-slate-800 font-bold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-600" />
            Upcoming Appointment
          </h3>
          <Card className="p-4 border-l-4 border-l-cyan-600">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-slate-800">
                  {DOCTORS.find(d => d.id === upcomingAppointment.doctorId)?.name}
                </p>
                <p className="text-xs text-slate-500">{upcomingAppointment.date} at {upcomingAppointment.time}</p>
              </div>
              <div className="bg-cyan-50 text-cyan-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                {upcomingAppointment.type} Call
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3 h-8 text-xs">Join Room</Button>
          </Card>
        </section>
      )}

      {/* Health Tips Slider */}
      <section>
        <h3 className="text-slate-800 font-bold mb-3 flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-500" />
          Health Tips
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {HEALTH_TIPS.map(tip => (
            <Card key={tip.id} className="min-w-[280px] p-4 bg-gradient-to-br from-white to-slate-50 border-slate-200">
              <div className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase w-fit mb-2">
                {tip.category}
              </div>
              <h4 className="font-bold text-slate-800 mb-1">{tip.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{tip.content}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Nearby Doctors */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-slate-800 font-bold flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-600" />
            Doctors Online Now
          </h3>
          <Link to="/doctors" className="text-xs font-medium text-cyan-600">See all</Link>
        </div>
        <div className="space-y-3">
          {DOCTORS.slice(0, 2).map(doctor => (
            <Link key={doctor.id} to={`/doctors/${doctor.id}`}>
              <Card className="p-3 flex items-center gap-3 border-slate-200 hover:shadow-md transition-shadow">
                <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-800">{doctor.name}</h4>
                  <p className="text-[10px] text-slate-500">{doctor.specialty}</p>
                </div>
                <div className="flex items-center gap-1 text-emerald-600">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold">Online</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
