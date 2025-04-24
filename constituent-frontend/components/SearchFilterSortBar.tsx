import { Input } from './Input';
import React from 'react';

interface SearchFilterSortBarProps {
  searchQuery: string;
  fromDate: string;
  toDate: string;
  handleSearch: (query: string) => void;
  handleDateFilter: (from: string, to: string) => void;
  handleSort: (criteria: string) => void;
}

export const SearchFilterSortBar: React.FC<SearchFilterSortBarProps> = ({
  searchQuery,
  fromDate,
  toDate,
  handleSearch,
  handleDateFilter,
  handleSort,
}) => {
  return (
    <div className="mb-4 flex flex-row gap-4 items-center">
      {/* Search Input */}
      <Input
        placeholder="Search constituents..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="flex-1 border border-gray-300 rounded px-4 py-2"
      />

      {/* From Date Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">From:</label>
        <Input
          type="date"
          value={fromDate}
          onChange={(e) => handleDateFilter(e.target.value, toDate)}
          className="border border-gray-300 rounded px-4 py-2"
        />
      </div>

      {/* To Date Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">To:</label>
        <Input
          type="date"
          value={toDate}
          onChange={(e) => handleDateFilter(fromDate, e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Sort By:</label>
        <select
          onChange={(e) => handleSort(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="signupDate">Signup Date</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
        </select>
      </div>
    </div>
  );
};
