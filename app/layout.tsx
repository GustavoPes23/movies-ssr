import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { Provider as JotaiProvider } from "jotai/react";

import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}><JotaiProvider>{children}</JotaiProvider></body>
    </html>
  );
}
