'use client';
import '@/styles/globals.scss';
import HeaderLayout from '@/libraries/layout/header.layout';
import { TopBarProvider } from '@/hooks/top-bar';
import TopBar from '@/libraries/layout/top-bar';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="grid grid-cols-5 gap-3 h-screen overflow-hidden">
        <HeaderLayout className="col-span-1" />
        <main className="col-span-4 pl-3 pr-6">
          <TopBarProvider>
            <TopBar />
            <Toaster />
            {children}
          </TopBarProvider>
        </main>
      </body>
    </html>
  );
}
