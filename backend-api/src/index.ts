import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { db } from './db';
import type { PaymentRequest } from './types';
import { sendSms } from './sms';
import { requestOtp, verifyOtp } from './otp';

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
    const fine = db.findFineById(fineId);
    if (fine?.phone) {
      sendSms(
        fine.phone,
        `Payment received for fine ${fineId}. Receipt ${receipt.receiptId}. Amount ${receipt.amount} LKR.`
      );
    }
    res.json(receipt);
  } catch (err) {
    return res.status(404).json({ error: (err as Error).message });
  }
});

// POST /api/fines - issue a new fine
app.post('/api/fines', (req: Request, res: Response) => {
  const { vehicleNumber, driverName, phone, offence, location, officerName, amount } = req.body;
  if (!vehicleNumber || !offence || !amount) {
    return res.status(400).json({ error: 'vehicleNumber, offence and amount are required' });
  }

  const fine = db.issueFine({ vehicleNumber, driverName, phone, offence, location, officerName, amount });
  if (phone) {
    sendSms(phone, `You have been issued fine ${fine.fineId} for ${fine.offence}. Amount ${fine.amount} LKR.`);
  }

  res.status(201).json(fine);
});

// POST /api/otp/request - send OTP to a phone
app.post('/api/otp/request', async (req: Request, res: Response) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'phone required' });
  try {
    await requestOtp(phone);
    res.json({ status: 'otp_sent' });
  } catch (err) {
    res.status(500).json({ error: 'failed to send otp' });
  }
});

// POST /api/otp/verify - verify OTP code
app.post('/api/otp/verify', (req: Request, res: Response) => {
  const { phone, code } = req.body;
  if (!phone || !code) return res.status(400).json({ error: 'phone and code required' });
  const verified = verifyOtp(phone, code);
  res.json({ verified });
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
