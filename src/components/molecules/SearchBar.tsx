'use client';
import React, { useState } from 'react';
import { Search, Briefcase } from 'lucide-react';
import { Button } from '../atoms/Button';

interface SearchBarProps {
  onSearch: (query: string, sector: string) => void;
  initialQuery?: string;
  initialSector?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialQuery = '',
  initialSector = 'all',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [sector, setSector] = useState(initialSector);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, sector);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-stretch gap-2 p-2 bg-white rounded-2xl border border-slate-200 shadow-md w-full"
    >
      {/* Job Title / Skill Input */}
      <div className="flex-1 flex items-center px-3.5 py-1.5 gap-2.5">
        <Search className="w-5 h-5 text-slate-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Job Title / Skill (e.g. Acco, Excel, Tally)"
          className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      <div className="hidden md:block w-px bg-slate-200 my-1" />

      {/* Sector Dropdown */}
      <div className="flex items-center px-3.5 py-1.5 gap-2.5 md:w-56">
        <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="w-full bg-transparent text-sm text-slate-700 font-medium focus:outline-none cursor-pointer"
        >
          <option value="all">All Industries</option>
          <option value="Accounts & Finance">Accounts & Finance</option>
          <option value="Back Office & Computer">Back Office & Data Entry</option>
          <option value="Sales & Marketing">Sales & Marketing</option>
          <option value="HR & Administration">HR & Staffing</option>
          <option value="Logistics & Warehouse">Logistics & Warehouse</option>
        </select>
      </div>

      {/* Search Button */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        icon={<Search className="w-4 h-4" />}
        className="md:w-32 shrink-0 rounded-xl"
      >
        Find Jobs
      </Button>
    </form>
  );
};
