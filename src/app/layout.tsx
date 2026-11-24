import type { Metadata } from "next";
import { Cairo, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap"
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://hadeel-portfolio.vercel.app"
  ),
  title: "Eng. Hadeel Emad Baroud | Computer Systems Engineer & Full-Stack Developer",
  description: "Official portfolio of Eng. Hadeel Baroud — Computer Systems Engineer from Al-Azhar University. Specializing in high-performance web systems and AI integration.",
  keywords: [
    "Hadeel Baroud",
    "هديل بارود",
    "هديل عماد بارود",
    "Computer Systems Engineer",
    "مهندسة أنظمة حاسوب",
    "Full-Stack Developer",
    "Next.js Developer",
    "React 19",
    "AI Web Apps",
    "Al-Azhar University Gaza",
    "جامعة الأزهر غزة"
  ],
  authors: [{ name: "Eng. Hadeel Emad Baroud", url: "https://github.com/baroudhadeel9" }],
  creator: "Eng. Hadeel Emad Baroud",
  openGraph: {
    type: "website",
    locale: "ar_PS",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "Eng. Hadeel Baroud | مهندسة أنظمة حاسوب ومطورة ويب",
    title: "م. هديل عماد بارود | مهندسة أنظمة حاسوب ومطورة Full-Stack معتمدة",
    description: "البورتفوليو الهندسي الرسمي للمهندسة هديل بارود — خريجة جامعة الأزهر بغزة. متخصصة في بناء أنظمة وتطبيقات الويب السريعة وحلول الذكاء الاصطناعي.",
    images: [
      {
        url: "/hadeel-profile.jpg",
        width: 800,
        height: 800,
        alt: "Eng. Hadeel Emad Baroud - مهندسة أنظمة حاسوب ومطورة ويب",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eng. Hadeel Emad Baroud | Computer Systems Engineer",
    description: "Official portfolio of Eng. Hadeel Baroud — Computer Systems Engineer from Al-Azhar University. Specializing in high-performance web systems and AI integration.",
    images: ["/hadeel-profile.jpg"],
    creator: "@baroudhadeel9",
  },
  icons: {
    icon: "/logo-minimal.jpg",
    apple: "/logo-minimal.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${cairo.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-[#FAFAFC] text-slate-800 min-h-screen selection:bg-slate-900 selection:text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
