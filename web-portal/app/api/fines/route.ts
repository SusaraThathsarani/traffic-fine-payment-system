import { NextResponse } from 'next/server';
import type { TrafficFine } from '../../lib/types';

export function GET(req: Request) {
  const url = new URL(req.url);
  const vehicle = url.searchParams.get('vehicle');
  const fineId = url.searchParams.get('fineId');

  const sample: TrafficFine = {
    fineId: fineId ?? 'FINE-1001',
    vehicleNumber: vehicle ?? 'WP-NA-1234',
    driverName: 'John Perera',
    offence: 'Speeding',
    location: 'Colombo',
    officerName: 'Officer Silva',
    amount: 5000,
    issuedAt: new Date().toISOString(),
    status: 'issued',
  };

  return NextResponse.json({ fine: sample });
}
