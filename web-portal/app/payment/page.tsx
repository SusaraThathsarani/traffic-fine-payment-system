"use client";
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { TrafficFine } from '../../lib/types';

export default function PaymentPage() {
  const search = useSearchParams();
  const router = useRouter();
  const fineId = search.get('fineId') ?? '';
  const [fine, setFine] = useState<TrafficFine | null>(null);
  const [method, setMethod] = useState<'card'|'cash'|'wallet'>('card');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!fineId) return;
    fetch(`http://localhost:3001/api/fines?fineId=${encodeURIComponent(fineId)}`).then(r => r.json()).then(j => setFine(j.fine));
  }, [fineId]);

  async function confirm() {
    if (!fine) return;
    setLoading(true);
    const res = await fetch('http://localhost:3001/api/payments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fineId: fine.fineId, method }) });
    const json = await res.json();
    setLoading(false);
    router.push(`/receipt?receiptId=${json.receiptId}`);
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold">Payment</h1>
        {!fine && <p className="mt-4">Loading fine...</p>}
        {fine && (
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h2 className="font-medium">{fine.offence} — {fine.vehicleNumber}</h2>
            <p className="text-sm text-gray-600">Amount: LKR {fine.amount}</p>
            <div className="mt-4">
              <label className="mr-3">Method:</label>
              <select value={method} onChange={(e) => setMethod(e.target.value as any)} className="p-2 border rounded">
                <option value="card">Card</option>
                <option value="cash">Cash</option>
                <option value="wallet">Wallet</option>
              </select>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={confirm} className="px-4 py-2 bg-green-600 text-white rounded">{loading ? 'Processing...' : 'Confirm Payment'}</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
