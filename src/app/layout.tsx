import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serifDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Ameer Hamza | Senior Full-Stack & Mobile Engineer",
  description:
    "Portfolio of Ameer Hamza (m-hamza1) — Senior Full-Stack and Mobile Engineer specializing in high-throughput Next.js web applications, offline-first Flutter mobile apps, and real-time distributed systems.",
  keywords: [
    "Ameer Hamza",
    "ameerhamza09",
    "m-hamza1",
    "Full-Stack Engineer",
    "Mobile Developer",
    "Flutter",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Offline-first",
    "WebRTC",
  ],
  authors: [{ name: "Ameer Hamza", url: "https://github.com/m-hamza1" }],
  creator: "Ameer Hamza",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/m-hamza1",
    title: "Ameer Hamza | Senior Full-Stack & Mobile Engineer",
    description:
      "Full-stack and mobile engineer portfolio with Next.js and interactive 3D spatial experiences.",
    siteName: "Ameer Hamza Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ameer Hamza | Senior Full-Stack & Mobile Engineer",
    description:
      "Full-stack and mobile engineer portfolio with Next.js and interactive 3D spatial experiences.",
    creator: "@ameerhamza09",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ameer Hamza",
    url: "https://github.com/m-hamza1",
    sameAs: [
      "https://www.linkedin.com/in/ameerhamza09/",
      "https://github.com/m-hamza1",
    ],
    jobTitle: "Senior Full-Stack & Mobile Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance & Enterprise Engineering",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Flutter",
      "Dart",
      "Node.js",
      "PostgreSQL",
      "WebSockets",
      "WebRTC",
      "Three.js",
      "System Architecture",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${serifDisplay.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-white/20">
        {children}
      </body>
    </html>
  );
}
