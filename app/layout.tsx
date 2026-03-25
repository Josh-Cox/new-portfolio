import "./globals.css";
import Link from "next/link";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "Josh Cox Portfolio",
  description: "Software Engineer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans min-h-screen flex flex-col">
        <header className="fixed top-0 w-full border-b border-white/10 backdrop-blur bg-bg/80 z-50">
          <div className="container mx-auto max-w-6xl flex justify-between items-center py-4 px-6">
            <Link href="#top" className="font-mono text-sm tracking-wide text-text">
              dev.portfolio
            </Link>

            <nav className="flex items-center gap-6 text-sm text-ink">
              <Link href="#about" className="hover:text-accent">
                About
              </Link>
              <Link href="#experience" className="hover:text-accent">
                Experience
              </Link>
              <Link href="#projects" className="hover:text-accent">
                Projects
              </Link>
              <Link href="#contact" className="hover:text-accent">
                Contact
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 pt-24">{children}</main>

        <footer className="border-t border-white/10 text-center py-6 text-sm text-ink/70">
          © {new Date().getFullYear()} Josh Cox
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
