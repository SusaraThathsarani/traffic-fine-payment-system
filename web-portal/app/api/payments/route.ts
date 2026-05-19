import { NextResponse } from 'next/server';
import type { PaymentRequest, PaymentResponse } from '../../lib/types';

export async function POST(req: Request) {
  const body = (await req.json()) as PaymentRequest;
  // Simulate processing and return a receipt id
  const receiptId = `RCPT-${Math.random().toString(36).slice(2,9).toUpperCase()}`;
  const res: PaymentResponse = { receiptId, fineId: body.fineId, status: 'success' };
  return NextResponse.json(res);
}
