import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "CNY Angpow 🧧",
  description: "Someone sent you a special CNY angpow! Open it to see what's inside 🧧✨",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex items-start justify-center px-4 py-6 relative z-10"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <div className="w-full max-w-[480px] mx-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
