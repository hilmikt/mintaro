import "./globals.css";
import { Providers } from "../lib/wagmi";

export const metadata = { title: "Mintaro" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head />
      <body className="h-full bg-neutral-950 antialiased">{children}</body>
    </html>
  );
}