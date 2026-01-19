import { Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/animations/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Your Name - Portfolio",
  description: "Full-stack developer and designer portfolio",
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