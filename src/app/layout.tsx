import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Space_Grotesk, Roboto_Mono } from "next/font/google";
import { Providers } from "@/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Khel Setu - The Sports Ecosystem of India",
  description: "One platform connecting athletes, academies & sponsors across India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "iconButton",
          termsPageUrl: "https://clerk.com/terms",
        },
      }}
    >
      <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
        <body className={`${inter.variable} ${spaceGrotesk.variable} ${robotoMono.variable} font-sans antialiased bg-[#0A0A0A] text-[#EDEDED] selection:bg-[#FF4D12]/30 selection:text-white min-h-screen`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
