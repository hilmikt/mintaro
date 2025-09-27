import "./globals.css";
import Providers from "./AppProviders";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head />
      <body className="h-full bg-neutral-950 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}