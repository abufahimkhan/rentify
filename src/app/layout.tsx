import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BashaBondhu — Property made simple",
  description: "A simple tenant, flat, bill and communication manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
