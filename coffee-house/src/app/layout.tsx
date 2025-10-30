import type { Metadata } from "next";
import { Inter, Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-georgian",
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Coffee House",
  description:
    "Welcome to Coffee House, where every cup is brewed with love and care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${notoSansGeorgian.variable} antialiased overflow-x-hidden`}
      >
        <div className="mx-auto max-w-xl text-primary px-4 sm:px-10 py-5">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
