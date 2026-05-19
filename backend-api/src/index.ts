import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from './db';
import type { PaymentRequest } from './types';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// GET /api/fines - lookup fine by vehicle or fineId
app.get('/api/fines', (req: Request, res: Response) => {
  const { vehicle, fineId } = req.query;

  let fine;
  if (vehicle && typeof vehicle === 'string') {
    fine = db.findFineByVehicle(vehicle);
  } else if (fineId && typeof fineId === 'string') {
    fine = db.findFineById(fineId);
  } else {
    return res.status(400).json({ error: 'vehicle or fineId required' });
  }

  if (!fine) {
    return res.status(404).json({ error: 'Fine not found' });
  }

  res.json({ fine });
});

// POST /api/payments - process a payment
app.post('/api/payments', (req: Request, res: Response) => {
  const { fineId, method } = req.body as PaymentRequest;

  if (!fineId || !method) {
    return res.status(400).json({ error: 'fineId and method required' });
  }

  try {
    const receipt = db.recordPayment(fineId, method);
    res.json(receipt);
  } catch (err) {
    return res.status(404).json({ error: (err as Error).message });
  }
});

// GET /api/receipt/:receiptId - retrieve receipt details
app.get('/api/receipt/:receiptId', (req: Request, res: Response) => {
  const { receiptId } = req.params;
  const receipt = db.getReceipt(receiptId);

  if (!receipt) {
    return res.status(404).json({ error: 'Receipt not found' });
  }

  res.json(receipt);
});

app.listen(PORT, () => {
  console.log(`✓ Backend API running on http://localhost:${PORT}`);
});
