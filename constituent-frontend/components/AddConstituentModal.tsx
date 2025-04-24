import { Input } from './input';
import { Button } from './button';
import React from 'react';

interface AddConstituentModalProps {
  form: { name: string; email: string; address: string };
  setForm: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; address: string }>
  >;
  loading: boolean;
  handleSubmit: () => void;
  closeModal: () => void;
}

export const AddConstituentModal: React.FC<AddConstituentModalProps> = ({
  form,
  setForm,
  loading,
  handleSubmit,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <div className="grid gap-4">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Email*"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <div className="flex justify-end gap-2">
            <Button
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSubmit}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
