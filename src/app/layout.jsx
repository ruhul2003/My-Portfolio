import './globals.css';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import CustomCursor from '@/Components/CustomCursor';

export const metadata = {
  title: 'Ruhul Amin - Web Developer Portfolio',
  description: 'Personal web development portfolio of Ruhul Amin, featuring dynamic designs and client projects.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#020617] text-white antialiased">
        <CustomCursor />
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
