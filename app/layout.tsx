// app/layout.tsx
import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { Providers } from "./providers";

const montserratAlternates = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// ✅ Keep metadata clean
export const metadata: Metadata = {
  title: {
    default: "Klima Harvest",
    template: "%s | Klima Harvest",
  },
  description: "Empowering climate action through transparent, community-driven carbon projects in Kenya.",
  metadataBase: new URL("https://yourdomain.com"), // Replace with your actual domain
  openGraph: {
    title: "Klima Harvest",
    description: "Track, verify, and support real climate impact in Kenya.",
    type: "website",
    locale: "en_KE",
    siteName: "Klima Harvest",
  },
  twitter: {
    card: "summary_large_image",
    site: "@klima_harvest",
  },
};

// ✅ Export viewport SEPARATELY
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserratAlternates.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Providers>
        {children}
        <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}