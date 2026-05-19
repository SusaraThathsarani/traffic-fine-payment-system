import { useSearchParams } from 'next/navigation';

export default function ReceiptPage() {
  const search = useSearchParams();
  const receiptId = search.get('receiptId') ?? 'UNKNOWN';

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold">Receipt</h1>
        <div className="mt-6 bg-white p-4 rounded shadow">
          <p className="text-lg">Payment completed</p>
          <p className="mt-2 text-sm text-gray-600">Receipt ID: <strong>{receiptId}</strong></p>
        </div>
      </div>
    </main>
  );
}
