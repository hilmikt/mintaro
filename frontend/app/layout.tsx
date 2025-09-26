import "./globals.css";
import { Providers } from "../lib/wagmi";

export const metadata = { title: "Mintaro" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <Providers>
          <div className="max-w-5xl mx-auto p-6">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
