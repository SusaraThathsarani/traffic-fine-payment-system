import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal - Traffic Fine System',
  description: 'Sri Lanka Police admin dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <aside style={{ width: '220px', background: '#102A43', color: 'white', padding: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              Traffic Fine Admin
            </h2>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="/" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
                Dashboard
              </a>
              <a href="/payments" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
                Payments
              </a>
              <a href="/reports" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
                Reports
              </a>
              <a href="/officers" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
                Officers
              </a>
            </nav>
          </aside>
          <main style={{ flex: 1, padding: '30px', background: '#f5f5f5' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
