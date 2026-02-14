import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "HuatOrHurt Angpows",
  description: "Why give money when you can give roasted love this CNY?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex items-start justify-center px-4 py-6 relative z-10">
          <div className="w-full max-w-[480px] mx-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
