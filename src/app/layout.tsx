import type { Metadata } from "next";
import { Space_Grotesk, Inter, Almarai, JetBrains_Mono } from "next/font/google";
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

const almarai = Almarai({
  subsets: ["arabic"],
  variable: "--font-almarai",
  weight: ["300", "400", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hadeelbaroud.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Eng. Hadeel Emad Baroud | Computer Systems Engineer & Full-Stack Developer",
    template: "%s | Eng. Hadeel Baroud"
  },
  description: "Official portfolio of Eng. Hadeel Baroud — Computer Systems Engineer from Al-Azhar University. Specializing in high-performance web systems (Next.js 16, React 19, Laravel 11) and AI integration.",
  keywords: [
    "Hadeel Baroud",
    "هديل بارود",
    "هديل عماد بارود",
    "Eng. Hadeel Baroud",
    "Computer Systems Engineer",
    "مهندسة أنظمة حاسوب",
    "Full-Stack Developer",
    "Next.js 16",
    "React 19",
    "Laravel 11",
    "Tailwind CSS",
    "AI Agent Integration",
    "Bilingual Portfolio",
    "Gaza Developer",
    "Coach Space",
    "EduHub"
  ],
  authors: [{ name: "Eng. Hadeel Emad Baroud", url: "https://github.com/baroudhadeel9" }],
  creator: "Eng. Hadeel Emad Baroud",
  icons: {
    icon: "/logo-minimal.jpg",
    apple: "/logo-minimal.jpg"
  },
  alternates: {
    canonical: "/",
    languages: {
      "ar": "/?lang=ar",
      "en": "/?lang=en",
      "x-default": "/"
    }
  },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: "Eng. Hadeel Emad Baroud Portfolio",
    title: "Eng. Hadeel Emad Baroud | Computer Systems Engineer & Full-Stack Developer",
    description: "Official portfolio of Eng. Hadeel Baroud — Computer Systems Engineer from Al-Azhar University. Specializing in high-performance web systems and AI integration.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eng. Hadeel Emad Baroud | Computer Systems Engineer & Full-Stack Developer",
    description: "Official portfolio of Eng. Hadeel Baroud — Computer Systems Engineer from Al-Azhar University. Specializing in high-performance web systems and AI integration.",
    creator: "@baroudhadeel9"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      "name": "Hadeel Emad Baroud",
      "alternateName": "هديل عماد بارود",
      "jobTitle": "Computer Systems Engineer & Full-Stack Developer",
      "description": "Computer Systems Engineer from Al-Azhar University specializing in high-performance web applications, Next.js 16, React 19, Laravel 11, and AI agent integration.",
      "url": siteUrl,
      "image": `${siteUrl}/hadeel-profile.jpg`,
      "email": "mailto:baroudhadeel9@gmail.com",
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Al-Azhar University - Gaza"
      },
      "sameAs": [
        "https://github.com/baroudhadeel9",
        "https://linkedin.com/in/hadeel-baroud-178652251",
        "https://coachspace-five.vercel.app/",
        "https://gazaeduhub.com"
      ],
      "knowsAbout": [
        "Computer Systems Engineering",
        "Next.js",
        "React",
        "TypeScript",
        "Laravel",
        "Tailwind CSS",
        "Artificial Intelligence",
        "Agentic Engineering",
        "Full-Stack Development"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Eng. Hadeel Baroud Portfolio",
      "description": "Official portfolio of Eng. Hadeel Baroud",
      "inLanguage": ["ar", "en"],
      "publisher": {
        "@id": `${siteUrl}/#person`
      }
    }
  ]
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${almarai.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#FAFAFC] text-slate-800 min-h-screen selection:bg-slate-900 selection:text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
