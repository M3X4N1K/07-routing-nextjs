import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'Notes',
  description: 'Manage your notes',
};

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="notes-layout">
      <Header />
      <main style={{ padding: '24px', minHeight: 'calc(100vh - 120px)' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
