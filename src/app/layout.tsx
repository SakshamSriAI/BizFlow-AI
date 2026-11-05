import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Nexora — Your Entire Business. One Intelligent Platform.",
  description:
    "Manage customers, sales, finances, invoices and daily operations from one connected workspace, powered by intelligent AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-[#F7F9FB] text-[#17212B] antialiased selection:bg-[#EBF3FC] selection:text-[#2F80ED]">
        {children}
      </body>
    </html>
  );
}
