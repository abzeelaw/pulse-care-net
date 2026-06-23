import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  FileText, 
  Plus, 
  Search, 
  Clock, 
  User,
  Activity,
  Download,
  Upload
} from 'lucide-react';
import { useHealthStore } from '../hooks/useHealthStore';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const MedicalRecords = () => {
  const { prescriptions, medicalHistory, addMedicalHistory } = useHealthStore();
  const [newNote, setNewNote] = useState('');
  const [showHistoryForm, setShowHistoryForm] = useState(false);

  const handleAddHistory = () => {
    if (!newNote.trim()) return;
    addMedicalHistory(newNote);
    setNewNote('');
    setShowHistoryForm(false);
    toast.success('Medical history updated');
  };

  return (
    <div className="p-4 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 hover:bg-slate-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </Link>
          <h2 className="text-xl font-bold text-slate-800">My Health Vault</h2>
        </div>
        <Link to="/admin" className="text-xs text-slate-400 font-medium">Admin View</Link>
      </header>

      {/* Profile Overview */}
      <Card className="bg-gradient-to-br from-cyan-600 to-blue-700 p-6 text-white border-none shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold">John Doe</h3>
            <p className="text-cyan-100 text-xs">Patient ID: KHC-4829-X</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
            <p className="text-[10px] text-cyan-100 uppercase font-bold tracking-wider">Blood Type</p>
            <p className="text-lg font-black">O Positive</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
            <p className="text-[10px] text-cyan-100 uppercase font-bold tracking-wider">Status</p>
            <p className="text-lg font-black">Stable</p>
          </div>
        </div>
      </Card>

      {/* Tabs / Sections */}
      <div className="space-y-6">
        {/* Prescriptions */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-600" />
              Digital Prescriptions
            </h3>
            <button className="text-xs font-bold text-cyan-600 flex items-center gap-1">
              <Upload className="w-3 h-3" />
              Upload New
            </button>
          </div>
          <div className="space-y-3">
            {prescriptions.map(p => (
              <Card key={p.id} className="p-4 border-slate-100 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="font-bold text-slate-800">{p.medicine}</p>
                    <p className="text-[10px] text-slate-500">Issued by {p.doctorName}</p>
                    <p className="text-[10px] text-cyan-600 font-medium">{p.date}</p>
                  </div>
                  <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-cyan-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Medical History */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              Medical History
            </h3>
            <button 
              onClick={() => setShowHistoryForm(!showHistoryForm)}
              className="p-1 bg-emerald-100 text-emerald-600 rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {showHistoryForm && (
            <Card className="p-4 space-y-3 border-emerald-100 bg-emerald-50/30">
              <textarea 
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Add condition, allergy, or surgery..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowHistoryForm(false)}>Cancel</Button>
                <Button size="sm" className="bg-emerald-600" onClick={handleAddHistory}>Save Note</Button>
              </div>
            </Card>
          )}

          <div className="space-y-3">
            {medicalHistory.map((history, idx) => (
              <div key={idx} className="flex gap-4 p-3 bg-white border border-slate-100 rounded-xl">
                <div className="w-1 bg-emerald-500 rounded-full" />
                <p className="text-sm text-slate-600">{history}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="bg-slate-50 p-6 rounded-3xl text-center space-y-3">
        <ShieldCheck className="w-8 h-8 text-cyan-600 mx-auto" />
        <h4 className="font-bold text-slate-800">Your Data is Encrypted</h4>
        <p className="text-xs text-slate-500">Only you and authorized medical personnel in Kaduna State can access your private health information.</p>
      </div>
    </div>
  );
};

// Helper component for icon
const ShieldCheck = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default MedicalRecords;
