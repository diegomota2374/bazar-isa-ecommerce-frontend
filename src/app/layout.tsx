import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import { Suspense } from "react";
import Loading from "./loading";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bazar Isa",
  description: "Bazar de roupas usadas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
      </body>
    </html>
  );
}
