import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Stethoscope, 
  Ambulance, 
  Hospital as HospitalIcon, 
  FileText, 
  User,
  Bell,
  Menu,
  X,
  Settings
} from 'lucide-react';
import { Toaster } from 'sonner';
import { useHealthStore } from './hooks/useHealthStore';
import Dashboard from './pages/Dashboard';
import DoctorList from './pages/DoctorList';
import DoctorDetail from './pages/DoctorDetail';
import Emergency from './pages/Emergency';
import HospitalList from './pages/HospitalList';
import MedicalRecords from './pages/MedicalRecords';
import Appointments from './pages/Appointments';
import AdminDashboard from './pages/AdminDashboard';
import RuralModeLayout from './components/RuralModeLayout';

const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      `flex flex-col items-center justify-center py-2 px-1 text-xs transition-colors ${
        isActive ? 'text-cyan-600 font-bold' : 'text-slate-500 hover:text-cyan-500'
      }`
    }
  >
    <Icon className="w-6 h-6 mb-1" />
    <span>{label}</span>
  </NavLink>
);

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { ruralMode } = useHealthStore();
  const location = useLocation();
  const isEmergencyPage = location.pathname === '/emergency';

  if (ruralMode) {
    return <RuralModeLayout>{children}</RuralModeLayout>;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-cyan-600 p-1.5 rounded-lg">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold text-slate-800">Kaduna Health</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <NavLink to="/records" className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
            <User className="w-5 h-5" />
          </NavLink>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto min-h-[calc(100vh-128px)]">
        {children}
      </main>

      {/* Bottom Navigation */}
      {!isEmergencyPage && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-1 flex justify-around items-center z-50 safe-area-inset-bottom">
          <NavItem to="/" icon={Home} label="Home" />
          <NavItem to="/doctors" icon={Stethoscope} label="Doctors" />
          <NavItem to="/emergency" icon={Ambulance} label="SOS" />
          <NavItem to="/hospitals" icon={HospitalIcon} label="Clinics" />
          <NavItem to="/appointments" icon={FileText} label="Bookings" />
        </nav>
      )}
      
      <Toaster position="top-center" richColors />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/hospitals" element={<HospitalList />} />
          <Route path="/records" element={<MedicalRecords />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
