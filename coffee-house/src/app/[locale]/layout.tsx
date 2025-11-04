import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch messages on the server-side
  const messages = await getMessages();

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#665f55",
              border: "1px solid #665f55",
              borderRadius: "12px",
              color: "#e1d4c9",
              fontSize: "16px",
            },
          }}
        />
        <Header />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </>
  );
}
