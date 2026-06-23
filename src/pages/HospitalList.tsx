import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  MapPin, 
  Phone, 
  Search,
  Bed,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { HOSPITALS } from '../data/mockData';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

const HospitalList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHospitals = HOSPITALS.filter(h => 
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 hover:bg-slate-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </Link>
          <h2 className="text-xl font-bold text-slate-800">Nearby Hospitals</h2>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search hospital name or area..." 
            className="w-full bg-white border border-slate-200 rounded-2xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="space-y-6">
        {filteredHospitals.map(hospital => (
          <Card key={hospital.id} className="overflow-hidden border-slate-200 hover:shadow-lg transition-shadow">
            <div className="relative h-40">
              <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
              {hospital.emergency && (
                <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  24/7 Emergency
                </div>
              )}
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-lg">{hospital.name}</h3>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="w-3 h-3 text-cyan-600" />
                  <span>{hospital.location}</span>
                </div>
              </div>

              <div className="flex gap-4 border-y border-slate-50 py-3">
                <div className="flex-1 flex flex-col items-center gap-1">
                  <Bed className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Available Beds</span>
                  <span className="text-sm font-black text-slate-700">{hospital.bedsAvailable}</span>
                </div>
                <div className="w-[1px] bg-slate-100" />
                <div className="flex-1 flex flex-col items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Verified</span>
                  <span className="text-xs font-bold text-emerald-600">KDSG Partner</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Services</p>
                <div className="flex flex-wrap gap-2">
                  {hospital.services.map(service => (
                    <span key={service} className="bg-slate-50 text-slate-600 text-[10px] px-2 py-1 rounded-lg font-medium border border-slate-100">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-10 font-bold">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" className="flex-1 h-10 font-bold border-slate-200">
                  Directions
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HospitalList;
