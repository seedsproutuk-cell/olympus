import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Olympus Property: Property Done Right across the UK",
  description: "Find homes and commercial premises, offer a property for lease, or get practical property guidance. Property done right.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
