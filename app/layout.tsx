import { Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/animations/ScrollProgress";

import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Praize Chimezie | Full-Stack Developer & Backend Specialist",
  description: "I build secure, scalable, and beautifully crafted web and mobile applications. Specializing in React, Next.js, Node.js, and AI-powered solutions. Open to freelance and collaboration.",
  keywords: ["Full-Stack Developer", "Backend Developer", "React Developer", "Next.js", "Node.js", "TypeScript", "AI Developer", "Freelance Developer", "Portfolio", "Web Development", "Mobile Development"],
  authors: [{ name: "Praize Chimezie", url: "https://github.com/Tchris-Hub" }],
  creator: "Praize Chimezie",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chimezie.dev", // Update with your actual domain
    siteName: "Praize Chimezie | Portfolio",
    title: "Praize Chimezie | Full-Stack Developer & Backend Specialist",
    description: "I build secure, scalable, and beautifully crafted web and mobile applications. Specializing in React, Next.js, Node.js, and AI-powered solutions.",
    images: [
      {
        url: "/og-image.png", // Create this image for social sharing
        width: 1200,
        height: 630,
        alt: "Praize Chimezie - Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Praize Chimezie | Full-Stack Developer",
    description: "I build secure, scalable, and beautifully crafted web and mobile applications.",
    images: ["/og-image.png"],
    creator: "@TchrisHub", // Update with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code", // Add when you set up Google Search Console
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="cursor-none">
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}