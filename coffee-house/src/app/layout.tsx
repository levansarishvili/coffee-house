import type { Metadata } from "next";
import { Inter, Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";
import Header from "./components/header-component/Header";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSansGeorgian.className} antialiased`}
      >
        <div className="mx-auto max-w-lg text-primary px-10 py-5">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
