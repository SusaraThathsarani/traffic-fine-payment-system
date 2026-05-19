'use client';

import { useEffect, useState } from 'react';

interface Payment {
  receiptId: string;
  fineId: string;
  vehicleNumber: string;
  amount: number;
  method: 'card' | 'cash' | 'wallet';
  paidAt: string;
  status: 'completed' | 'failed';
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    // Mock payment records
    setPayments([
      {
        receiptId: 'RCPT-A1B2C3D4',
        fineId: 'FINE-1001',
        vehicleNumber: 'WP-NA-1234',
        amount: 5000,
        method: 'card',
        paidAt: '2026-05-19T10:30:00Z',
        status: 'completed',
      },
      {
        receiptId: 'RCPT-E5F6G7H8',
        fineId: 'FINE-1002',
        vehicleNumber: 'WP-KA-5678',
        amount: 3000,
        method: 'cash',
        paidAt: '2026-05-19T09:15:00Z',
        status: 'completed',
      },
      {
        receiptId: 'RCPT-I9J0K1L2',
        fineId: 'FINE-1003',
        vehicleNumber: 'WP-CL-9012',
        amount: 7500,
        method: 'wallet',
        paidAt: '2026-05-19T08:45:00Z',
        status: 'completed',
      },
    ]);
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
        Payments
      </h1>

      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Receipt ID</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Vehicle</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Amount</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Method</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.receiptId} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>{payment.receiptId}</td>
                <td style={{ padding: '12px' }}>{payment.vehicleNumber}</td>
                <td style={{ padding: '12px' }}>LKR {payment.amount.toLocaleString()}</td>
                <td style={{ padding: '12px', textTransform: 'capitalize' }}>{payment.method}</td>
                <td style={{ padding: '12px' }}>
                  {new Date(payment.paidAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '12px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: payment.status === 'completed' ? '#d1fae5' : '#fee2e2',
                      color: payment.status === 'completed' ? '#065f46' : '#991b1b',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
