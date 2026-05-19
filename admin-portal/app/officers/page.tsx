'use client';

import { useEffect, useState } from 'react';

interface Officer {
  id: string;
  name: string;
  badge: string;
  rank: string;
  division: string;
  email: string;
  status: 'active' | 'inactive';
}

export default function OfficersPage() {
  const [officers, setOfficers] = useState<Officer[]>([]);

  useEffect(() => {
    // Mock officer data
    setOfficers([
      {
        id: 'OFF-001',
        name: 'D. Silva',
        badge: 'SGT-2024',
        rank: 'Sergeant',
        division: 'Traffic North',
        email: 'silva@police.lk',
        status: 'active',
      },
      {
        id: 'OFF-002',
        name: 'K. Kumara',
        badge: 'CPL-2025',
        rank: 'Corporal',
        division: 'Traffic Central',
        email: 'kumara@police.lk',
        status: 'active',
      },
      {
        id: 'OFF-003',
        name: 'J. Perera',
        badge: 'PTE-2026',
        rank: 'Constable',
        division: 'Traffic South',
        email: 'perera@police.lk',
        status: 'active',
      },
      {
        id: 'OFF-004',
        name: 'S. Fernando',
        badge: 'SGT-2023',
        rank: 'Sergeant',
        division: 'Traffic East',
        email: 'fernando@police.lk',
        status: 'inactive',
      },
    ]);
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
        Officers
      </h1>

      <div style={{ marginBottom: '20px' }}>
        <button
          style={{
            padding: '10px 16px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          + Add Officer
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Badge</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Rank</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Division</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {officers.map((officer) => (
              <tr key={officer.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>{officer.name}</td>
                <td style={{ padding: '12px' }}>{officer.badge}</td>
                <td style={{ padding: '12px' }}>{officer.rank}</td>
                <td style={{ padding: '12px' }}>{officer.division}</td>
                <td style={{ padding: '12px' }}>{officer.email}</td>
                <td style={{ padding: '12px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: officer.status === 'active' ? '#d1fae5' : '#fee2e2',
                      color: officer.status === 'active' ? '#065f46' : '#991b1b',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    {officer.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button
                    style={{
                      padding: '4px 8px',
                      background: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
