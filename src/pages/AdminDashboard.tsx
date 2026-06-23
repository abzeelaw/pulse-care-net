import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  BarChart3, 
  Users, 
  Ambulance, 
  Hospital, 
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Map,
  ShieldAlert
} from 'lucide-react';
import { Card } from '../components/ui/card';

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <Card className="p-4 border-slate-100">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
        <ArrowUpRight className="w-3 h-3" />
        {change}
      </div>
    </div>
    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{title}</p>
    <p className="text-2xl font-black text-slate-800">{value}</p>
  </Card>
);

const AdminDashboard = () => {
  return (
    <div className="p-4 space-y-6 pb-20">
      <header className="flex items-center gap-3">
        <Link to="/" className="p-2 hover:bg-slate-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-slate-700" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Authority Dashboard</h2>
          <p className="text-xs text-slate-500">Kaduna State Health Ministry</p>
        </div>
      </header>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          title="SOS Alerts" 
          value="24" 
          change="+12%" 
          icon={AlertTriangle} 
          color="bg-red-50 text-red-600" 
        />
        <StatCard 
          title="Active Doctors" 
          value="482" 
          change="+5%" 
          icon={Users} 
          color="bg-cyan-50 text-cyan-600" 
        />
        <StatCard 
          title="Ambulances" 
          value="18" 
          change="0%" 
          icon={Ambulance} 
          color="bg-emerald-50 text-emerald-600" 
        />
        <StatCard 
          title="Hospitals" 
          value="64" 
          change="+2%" 
          icon={Hospital} 
          color="bg-blue-50 text-blue-600" 
        />
      </div>

      {/* Emergency Map Simulation */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Map className="w-4 h-4 text-rose-500" />
            Live Emergency Tracking
          </h3>
          <span className="text-[10px] font-bold text-rose-500 animate-pulse bg-rose-50 px-2 py-1 rounded-full uppercase">Live</span>
        </div>
        <Card className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600&h=400" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="flex gap-4">
              <div className="w-4 h-4 bg-red-600 rounded-full animate-ping" />
              <div className="w-4 h-4 bg-red-600 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
            <p className="text-xs font-bold text-slate-800 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white">2 Active Incidents in Kaduna North</p>
          </div>
        </Card>
      </section>

      {/* Analytics */}
      <section className="space-y-3">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-600" />
          Health Analytics
        </h3>
        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-600 uppercase">Consultations by Region</p>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="space-y-3">
            {[
              { label: 'Kaduna North', val: 75 },
              { label: 'Kaduna South', val: 62 },
              { label: 'Zaria', val: 45 },
              { label: 'Chikun', val: 38 }
            ].map(reg => (
              <div key={reg.label} className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold">
                  <span>{reg.label}</span>
                  <span>{reg.val}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${reg.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Security Alerts */}
      <section className="bg-slate-900 rounded-3xl p-6 text-white space-y-4">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-red-500" />
          <h3 className="font-bold">System Integrity</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Verified Professionals</span>
            <span className="text-emerald-400 font-bold">100%</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Encryption Status</span>
            <span className="text-emerald-400 font-bold">AES-256 Active</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
