import { API_URL } from '../src/config';
import React, { useState, useEffect } from 'react';

interface ExportCSVProps {
  closeModal: () => void;
}

export const ExportCSV: React.FC<ExportCSVProps> = ({ closeModal }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // Set default values for "from" and "to" dates
  useEffect(() => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    setFrom(oneWeekAgo.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    setTo(today.toISOString().split('T')[0]); // Format as YYYY-MM-DD
  }, []);

  const handleDownload = async () => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);

    const res = await fetch(
      `${API_URL}/constituents/export?${params.toString()}`
    );
    if (!res.ok) {
      console.error('Failed to fetch CSV:', res.statusText);
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'constituents.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    closeModal(); // Close the modal after download
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <label className="font-medium">From:</label>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border border-black rounded px-2 py-1 w-full"
        />
      </div>
      <div className="flex gap-4 items-center">
        <label className="font-medium">To:</label>
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border border-black rounded px-2 py-1 w-full"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={closeModal}
          className="bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};
