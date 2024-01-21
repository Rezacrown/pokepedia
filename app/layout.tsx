import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokePedia",
  description: "Pokemon Pedia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="bumblebee">
      <body className={inter.className}>
        <div className="container px-6 md:px-12 lg:px-36">
          <div className="py-6">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
