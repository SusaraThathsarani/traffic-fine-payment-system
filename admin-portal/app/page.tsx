'use client';

import { useEffect, useState } from 'react';

interface DashboardStats {
  totalFines: number;
  paidFines: number;
  pendingFines: number;
  totalRevenue: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalFines: 0,
    paidFines: 0,
    pendingFines: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // Mock data for dashboard
    setStats({
      totalFines: 2456,
      paidFines: 1890,
      pendingFines: 566,
      totalRevenue: 18_450_000,
    });
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
        Dashboard
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        <StatCard
          title="Total Fines"
          value={stats.totalFines}
          color="#3b82f6"
        />
        <StatCard
          title="Paid Fines"
          value={stats.paidFines}
          color="#10b981"
        />
        <StatCard
          title="Pending Fines"
          value={stats.pendingFines}
          color="#f59e0b"
        />
        <StatCard
          title="Total Revenue"
          value={`LKR ${(stats.totalRevenue / 1_000_000).toFixed(1)}M`}
          color="#8b5cf6"
        />
      </div>

      <div
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
          Recent Activity
        </h2>
        <p style={{ color: '#666' }}>
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderLeft: `4px solid ${color}`,
      }}
    >
      <p style={{ color: '#666', marginBottom: '8px' }}>{title}</p>
      <p style={{ fontSize: '32px', fontWeight: 'bold', color }}>{value}</p>
    </div>
  );
}
