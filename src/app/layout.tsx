import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactToast from "@/utils/reactToast/ReactToast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Toll calculator",
  description: "Created by Nosang.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactToast />
        {children}
      </body>
    </html>
  );
}
