import { getMessages } from "next-intl/server";
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

  // Fetch messages on the server-side
  const messages = await getMessages();

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
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
        <div className="mx-auto max-w-xl text-primary px-4 sm:px-10 py-5">
          {children}
          <Footer />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
