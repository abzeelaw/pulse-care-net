import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  Star, 
  MapPin, 
  Clock,
  CheckCircle
} from 'lucide-react';
import { DOCTORS, SPECIALTIES } from '../data/mockData';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

const DoctorList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const filteredDoctors = DOCTORS.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="p-4 space-y-6">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 hover:bg-slate-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </Link>
          <h2 className="text-xl font-bold text-slate-800">Find Specialists</h2>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search doctors, specialties..." 
            className="w-full bg-white border border-slate-200 rounded-2xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedSpecialty('All')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              selectedSpecialty === 'All' 
                ? 'bg-cyan-600 text-white' 
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            All Specialties
          </button>
          {SPECIALTIES.map(specialty => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                selectedSpecialty === specialty 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </header>

      <div className="space-y-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <Link key={doctor.id} to={`/doctors/${doctor.id}`}>
              <Card className="p-4 flex gap-4 hover:shadow-md transition-shadow border-slate-200 group">
                <div className="relative">
                  <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-2xl object-cover" />
                  <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full border border-slate-100">
                    <CheckCircle className="w-4 h-4 text-cyan-600 fill-cyan-50" />
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">{doctor.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3 h-3 fill-amber-500" />
                      <span className="text-xs font-bold">{doctor.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-cyan-600">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <MapPin className="w-3 h-3" />
                    <span>{doctor.hospital}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>{doctor.availability.split(',')[0]}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <p className="text-slate-500 font-medium">No doctors found matching your criteria</p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedSpecialty('All'); }}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
