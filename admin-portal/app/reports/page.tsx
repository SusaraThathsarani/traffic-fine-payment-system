'use client';

import { useEffect, useState } from 'react';

interface ReportData {
  month: string;
  totalFines: number;
  paidFines: number;
  revenue: number;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportData[]>([]);

  useEffect(() => {
    // Mock report data
    setReports([
      { month: 'January 2026', totalFines: 450, paidFines: 380, revenue: 3_200_000 },
      { month: 'February 2026', totalFines: 520, paidFines: 420, revenue: 3_680_000 },
      { month: 'March 2026', totalFines: 480, paidFines: 410, revenue: 3_420_000 },
      { month: 'April 2026', totalFines: 560, paidFines: 480, revenue: 4_100_000 },
      { month: 'May 2026', totalFines: 446, paidFines: 200, revenue: 4_050_000 },
    ]);
  }, []);

  const totalRevenue = reports.reduce((sum, r) => sum + r.revenue, 0);
  const avgFinesPerMonth = (reports.reduce((sum, r) => sum + r.totalFines, 0) / reports.length).toFixed(0);

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
        Reports
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <p style={{ color: '#666', marginBottom: '8px' }}>Total Revenue (YTD)</p>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#8b5cf6' }}>
            LKR {(totalRevenue / 1_000_000).toFixed(1)}M
          </p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <p style={{ color: '#666', marginBottom: '8px' }}>Avg Fines/Month</p>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6' }}>
            {avgFinesPerMonth}
          </p>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Month</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Total Fines</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Paid</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.month} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>{report.month}</td>
                <td style={{ padding: '12px' }}>{report.totalFines}</td>
                <td style={{ padding: '12px' }}>{report.paidFines}</td>
                <td style={{ padding: '12px' }}>LKR {(report.revenue / 1_000_000).toFixed(1)}M</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
