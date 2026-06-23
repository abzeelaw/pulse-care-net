import React from 'react';
import { useHealthStore } from '../hooks/useHealthStore';
import { Power } from 'lucide-react';

const RuralModeLayout = ({ children }: { children: React.ReactNode }) => {
  const { setRuralMode } = useHealthStore();

  return (
    <div className="min-h-screen bg-white text-black p-4 font-mono">
      <div className="border-4 border-black p-4 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tighter">KADUNA HEALTH</h1>
          <p className="text-xs">LOW CONNECTIVITY MODE ACTIVATED</p>
        </div>
        <button 
          onClick={() => setRuralMode(false)}
          className="bg-black text-white p-2 flex items-center gap-2"
        >
          <Power className="w-4 h-4" />
          <span>EXIT</span>
        </button>
      </div>

      <div className="space-y-6">
        {children}
      </div>

      <div className="mt-12 pt-6 border-t-2 border-dashed border-black">
        <p className="text-xs text-center">SMS FALLBACK: DIAL *123# FOR EMERGENCY</p>
      </div>
    </div>
  );
};

export default RuralModeLayout;
