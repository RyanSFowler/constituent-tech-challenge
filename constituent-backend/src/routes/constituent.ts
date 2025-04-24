import { stringify } from 'csv-stringify/sync';
import { Router } from 'express';
import fs from 'fs';
import path from 'path';

interface Constituent {
  name: string;
  email: string;
  address: string;
  signupTime: string;
}

const router = Router();
const dataPath = path.join(__dirname, '../data/constituents.json');
let constituents: Record<string, Constituent> = {};

// Load data from JSON file
try {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  constituents = JSON.parse(rawData);
} catch (err) {
  console.error('Failed to load constituents data:', err);
}

// List all constituents
router.get('/', (_req, res) => {
  res.json(Object.values(constituents));
});

// Submit a new constituent (with deduplication)
router.post('/', (req, res) => {
  const { name, email, address } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const existing = constituents[email];
  if (existing) {
    constituents[email] = {
      ...existing,
      name: name || existing.name,
      address: address || existing.address,
    };
  } else {
    constituents[email] = {
      name,
      email,
      address,
      signupTime: new Date().toISOString(),
    };
  }

  // Save updated data to JSON file
  fs.writeFileSync(dataPath, JSON.stringify(constituents, null, 2));
  res.status(200).json({ message: 'Constituent saved' });
});

router.get('/export', (req, res) => {
  //log dates
  const to = undefined;
  const from = undefined;
  const fromDate = from ? new Date(from as string) : new Date('1970-01-01');
  const toDate = to ? new Date(to as string) : new Date();
  if (!fromDate || !toDate) {
    return res.status(400).json({ error: 'Invalid date range' });
  }

  const filtered = Object.values(constituents).filter(c => {
    const signupDate = new Date(c.signupTime);
    return signupDate >= fromDate && signupDate <= toDate;
  });

  const safeFiltered = filtered.map(c => ({
    name: c.name || '',
    email: c.email || '',
    address: c.address || '',
    signupTime: c.signupTime || '',
  }));

  try {
    const csv = stringify(safeFiltered, {
      header: true,
      columns: [
        { key: 'name', header: 'name' },
        { key: 'email', header: 'email' },
        { key: 'address', header: 'address' },
        { key: 'signupTime', header: 'signupTime' },
      ],
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="constituents.csv"');
    res.send(csv);
  } catch (err) {
    console.error('CSV stringify error:', err);
    res.status(500).json({ error: 'Failed to generate CSV' });
  }
});

export default router;
