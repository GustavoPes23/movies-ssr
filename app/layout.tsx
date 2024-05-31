import type { Metadata } from "next";
import { Provider as JotaiProvider, useAtom } from "jotai/react";

import { Inter } from "next/font/google";
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
    <html lang="en">
      <body className={inter.className}>
        <JotaiProvider>{children}</JotaiProvider>
      </body>
    </html>
  );
}
