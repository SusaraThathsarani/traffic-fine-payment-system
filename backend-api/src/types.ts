export type TrafficFine = {
  fineId: string;
  vehicleNumber: string;
  driverName?: string;
  phone?: string;
  offence: string;
  location?: string;
  officerName?: string;
  amount: number;
  issuedAt: string;
  status: 'issued' | 'paid' | 'pending';
};

export type PaymentRequest = {
  fineId: string;
  method: 'card' | 'cash' | 'wallet';
};

export type PaymentResponse = {
  receiptId: string;
  fineId: string;
  status: 'success' | 'failed';
};

export type Receipt = {
  receiptId: string;
  fineId: string;
  paymentMethod: 'card' | 'cash' | 'wallet';
  amount: number;
  paidAt: string;
  status: 'completed' | 'failed';
};
