"use client";
import { useState } from 'react';
import Link from 'next/link';
import type { TrafficFine } from '../../lib/types';

export default function LookupPage() {
  const [vehicle, setVehicle] = useState('');
  const [result, setResult] = useState<TrafficFine | null>(null);
  const [loading, setLoading] = useState(false);

  async function search() {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/api/fines?vehicle=${encodeURIComponent(vehicle)}`);
      const json = await res.json();
      setResult(json.fine);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold">Lookup Fine</h1>
        <div className="mt-4">
          <input value={vehicle} onChange={(e) => setVehicle(e.target.value)} placeholder="Vehicle number or fine ID" className="w-full p-2 border rounded" />
          <div className="mt-3 flex gap-2">
            <button onClick={search} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Searching...' : 'Search'}</button>
            <Link href="/" className="px-4 py-2 bg-gray-200 rounded">Back</Link>
          </div>
        </div>

        {result && (
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="font-medium">{result.offence} — {result.vehicleNumber}</h2>
            <p className="text-sm text-gray-600">Amount: LKR {result.amount}</p>
            <div className="mt-3">
              <Link href={`/payment?fineId=${result.fineId}`} className="px-3 py-2 bg-green-600 text-white rounded">Proceed to Payment</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
