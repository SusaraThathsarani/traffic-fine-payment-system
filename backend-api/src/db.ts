import type { TrafficFine, Receipt } from './types';

// Mock database: in-memory storage
const fines: Map<string, TrafficFine> = new Map([
  [
    'FINE-1001',
    {
      fineId: 'FINE-1001',
      vehicleNumber: 'WP-NA-1234',
      driverName: 'John Perera',
      offence: 'Speeding',
      location: 'Colombo',
      officerName: 'Officer Silva',
      amount: 5000,
      issuedAt: new Date().toISOString(),
      status: 'issued',
    },
  ],
  [
    'FINE-1002',
    {
      fineId: 'FINE-1002',
      vehicleNumber: 'WP-KA-5678',
      driverName: 'Jane Wickrama',
      offence: 'No License Plate',
      location: 'Kandy',
      officerName: 'Officer Kumara',
      amount: 3000,
      issuedAt: new Date(Date.now() - 86400000).toISOString(),
      status: 'issued',
    },
  ],
]);

const receipts: Map<string, Receipt> = new Map();

export const db = {
  findFineByVehicle: (vehicleNumber: string): TrafficFine | undefined => {
    return Array.from(fines.values()).find((f) => f.vehicleNumber === vehicleNumber);
  },

  findFineById: (fineId: string): TrafficFine | undefined => {
    return fines.get(fineId);
  },

  recordPayment: (fineId: string, method: 'card' | 'cash' | 'wallet'): Receipt => {
    const fine = fines.get(fineId);
    if (!fine) throw new Error(`Fine ${fineId} not found`);

    const receiptId = `RCPT-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
    const receipt: Receipt = {
      receiptId,
      fineId,
      paymentMethod: method,
      amount: fine.amount,
      paidAt: new Date().toISOString(),
      status: 'completed',
    };

    receipts.set(receiptId, receipt);
    fine.status = 'paid';
    return receipt;
  },

  getReceipt: (receiptId: string): Receipt | undefined => {
    return receipts.get(receiptId);
  },
};
