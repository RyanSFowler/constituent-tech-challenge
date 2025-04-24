import fs from 'fs';
import path from 'path';
import { Constituent } from '../models/Constituent';
import { toCsv } from '../utils/csvExporter';

const DATA_PATH = path.join(__dirname, '../../data/constituents.json');
let constituents: Record<string, Constituent> = {};

function loadData() {
  if (fs.existsSync(DATA_PATH)) {
    constituents = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  }
}

function saveData() {
  fs.writeFileSync(DATA_PATH, JSON.stringify(constituents, null, 2));
}

// Initial load
loadData();

export function listConstituents() {
  return Object.values(constituents);
}

export function upsertConstituent(input: Partial<Constituent>) {
  const { email, name, address } = input;
  const existing = constituents[email!];

  const merged: Constituent = {
    name: name || existing?.name || '',
    email: email!,
    address: address || existing?.address || '',
    signupTime: existing?.signupTime || new Date().toISOString(),
  };

  constituents[email!] = merged;
  saveData();
  return merged;
}

export function exportConstituentsCsv(from?: string, to?: string) {
  const fromTime = from ? new Date(from).getTime() : 0;
  const toTime = to ? new Date(to).getTime() : Date.now();

  const filtered = listConstituents().filter(c => {
    const time = new Date(c.signupTime).getTime();
    return time >= fromTime && time <= toTime;
  });

  return toCsv(filtered);
}
