import type { Metadata } from "next";
import { Space_Grotesk, Inter, Cairo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eng. Hadeel Emad Baroud | Computer Systems Engineer & Full-Stack Developer",
  description: "Official portfolio of Eng. Hadeel Baroud — Computer Systems Engineer from Al-Azhar University. Specializing in high-performance web systems and AI integration.",
  icons: {
    icon: "/logo-minimal.jpg",
    apple: "/logo-minimal.jpg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${spaceGrotesk.variable} ${inter.variable} ${cairo.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-[#FAFAFC] text-slate-800 min-h-screen selection:bg-slate-900 selection:text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
