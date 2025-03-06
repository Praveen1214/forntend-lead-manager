// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
// import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lead Management System',
  description: 'Track and manage your sales leads efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-1">{children}</main>
          {/* <Toaster /> */}
        </div>
      </body>
    </html>
  );
}