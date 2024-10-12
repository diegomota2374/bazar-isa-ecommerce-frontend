import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import { Suspense } from "react";
import Loading from "./loading";
import Footer from "../components/Footer/Footer";
import { CategoryProvider } from "../context/CategoryContext";
import { Toaster } from "sonner";
import { AuthProvider } from "../context/AuthContext";
import { FavoriteProvider } from "../context/FavoriteContext";
import { BagProvider } from "../context/BagContext";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="antialiased">
        <AuthProvider>
          <BagProvider>
            <FavoriteProvider>
              <CategoryProvider>
                <div className="flex flex-col min-h-screen">
                  <Toaster richColors position="top-center" />
                  <ModalWrapper />
                  <Navbar />
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                  <Footer />
                </div>
              </CategoryProvider>
            </FavoriteProvider>
          </BagProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
