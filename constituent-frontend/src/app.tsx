import { AddConstituentModal } from '../components/addConstituentModal';
import { ConstituentList } from '../components/ConstituentList';
import { SearchFilterSortBar } from '../components/searchFilterSortBar';
import { Button } from '../components/button';
import { ExportCSV } from '../components/exportCSV';
import { API_URL } from './config';
import React, { useEffect, useState } from 'react';

interface Constituent {
  name: string;
  email: string;
  address: string;
  signupTime: string;
}

const App = () => {
  const [constituents, setConstituents] = useState<Constituent[]>([]);
  const [filteredConstituents, setFilteredConstituents] = useState<
    Constituent[]
  >([]);
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const fetchConstituents = async () => {
    try {
      const res = await fetch(`${API_URL}/constituents`);
      if (!res.ok) throw new Error('Failed to fetch constituents');
      const text = await res.text();
      const data = text ? JSON.parse(text) : [];
      setConstituents(data);
      setFilteredConstituents(data); // Initialize filtered list
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching constituents.');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterConstituents(query, fromDate, toDate);
  };

  const handleDateFilter = (from: string, to: string) => {
    setFromDate(from);
    setToDate(to);
    filterConstituents(searchQuery, from, to);
  };

  const filterConstituents = (query: string, from: string, to: string) => {
    const filtered = constituents.filter((c) => {
      const matchesQuery =
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.email.toLowerCase().includes(query.toLowerCase()) ||
        c.address.toLowerCase().includes(query.toLowerCase());

      const signupDate = new Date(c.signupTime);
      const matchesDate =
        (!from || signupDate >= new Date(from)) &&
        (!to || signupDate <= new Date(to));

      return matchesQuery && matchesDate;
    });

    setFilteredConstituents(filtered);
  };

  const handleSort = (criteria: string) => {
    const sorted = [...filteredConstituents].sort((a, b) => {
      if (criteria === 'signupDate') {
        return (
          new Date(a.signupTime).getTime() - new Date(b.signupTime).getTime()
        );
      } else if (criteria === 'firstName') {
        return a.name.split(' ')[0].localeCompare(b.name.split(' ')[0]);
      } else if (criteria === 'lastName') {
        return a.name
          .split(' ')
          .slice(-1)[0]
          .localeCompare(b.name.split(' ').slice(-1)[0]);
      }
      return 0;
    });

    setFilteredConstituents(sorted);
  };

  const handleSubmit = async () => {
    if (!form.email) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/constituents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to add constituent');
      setForm({ name: '', email: '', address: '' });
      await fetchConstituents();
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding the constituent.');
    } finally {
      setLoading(false);
      setIsModalOpen(false); // Close the modal after submission
    }
  };

  useEffect(() => {
    fetchConstituents();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Constituent Management</h1>
      <div className="flex flex-row gap-2 mb-4 sticky top-0 z-10">
        <Button
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Add Constituent
        </Button>
        <Button
          className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setIsExportModalOpen(true)}
        >
          Download CSV
        </Button>
      </div>
      <h2 className="text-xl font-semibold mb-4">Constituent List</h2>
      <SearchFilterSortBar
        searchQuery={searchQuery}
        fromDate={fromDate}
        toDate={toDate}
        handleSearch={handleSearch}
        handleDateFilter={handleDateFilter}
        handleSort={handleSort}
      />
      {isModalOpen && (
        <AddConstituentModal
          form={form}
          setForm={setForm}
          loading={loading}
          handleSubmit={handleSubmit}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      {isExportModalOpen && (
        <ExportCSV closeModal={() => setIsExportModalOpen(false)} />
      )}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <ConstituentList constituents={filteredConstituents} />
      </div>
    </div>
  );
}

export default App;