import type { Metadata } from "next";
import "../styles/theme.css";

export const metadata: Metadata = {
  title: "AIT University - Secure Election Portal",
  description: "A secure, transparent, and anonymous university voting system using Next.js & cryptography.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#5c60f5" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
