'use client';
import '@/styles/globals.scss';
import HeaderLayout from '@/libraries/layout/header.layout';
import { TopBarProvider } from '@/hooks/top-bar';
import TopBar from '@/libraries/layout/top-bar';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="grid grid-cols-5 gap-3 h-screen overflow-hidden">
        <HeaderLayout className="col-span-1" />
        <main className="col-span-4">
          <TopBarProvider>
            <TopBar />
            {children}
          </TopBarProvider>
        </main>
      </body>
    </html>
  );
}
