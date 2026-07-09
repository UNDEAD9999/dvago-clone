import Footer from '@/components/Footer';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DVAGO - Pharmacy & Wellness Experts",
  description: "Pristine digital e-pharmacy platform catalog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-full`}>
        <AppProvider>
          {/* Main content wrapper pushes footer down but retains proper structural height */}
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}