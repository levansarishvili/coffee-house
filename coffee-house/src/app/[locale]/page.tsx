import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Hero from "../components/hero/Hero";
import About from "../components/about/About";
import Footer from "../components/footer/Footer";

export default function HomePage({ params }) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <main className="flex flex-col gap-[100px]">
        <Hero />

        <About />

        <section
          className="mobile-app centered flex-row justify-center align-center gap-100"
          id="mobile"
        >
          <div className="app-offer flex-col gap-40">
            <h2 className="app-offer-header dark-txt heading-2-font heading-2-font-mob weight-600">
              <span className="accent">Download</span> our apps to start
              ordering
            </h2>
            <p className="app-offer-txt dark-txt medium-font weight-400">
              Download the Resource app today and experience the comfort of
              ordering your favorite coffee from wherever you are
            </p>
            <div className="buttons flex-row gap-20">
              <a
                className="download-btn flex-row align-center gap-8"
                href="https://www.apple.com/app-store/"
                target="_blank"
              >
                <svg
                  width="28"
                  height="33"
                  viewBox="0 0 28 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.7073 17.6307C22.6704 13.6324 26.065 11.6872 26.2203 11.5966C24.2977 8.86366 21.3178 8.49026 20.2707 8.46048C17.7679 8.20369 15.3403 9.92062 14.0654 9.92062C12.765 9.92062 10.8017 8.48529 8.68579 8.52747C5.96293 8.56841 3.41566 10.1055 2.0186 12.4923C-0.864579 17.359 1.28572 24.5108 4.04802 28.4446C5.42981 30.3712 7.04444 32.5223 9.15784 32.4466C11.2254 32.3635 11.9978 31.1614 14.4929 31.1614C16.9651 31.1614 17.6903 32.4466 19.8457 32.3983C22.0647 32.3635 23.4618 30.463 24.7952 28.519C26.392 26.3108 27.0333 24.1362 27.0588 24.0245C27.0066 24.0071 22.7493 22.4229 22.7073 17.6307Z"
                    fill="#403F3D"
                  />
                  <path
                    d="M18.6357 5.87268C19.7477 4.51675 20.5086 2.67205 20.2974 0.800049C18.6879 0.86952 16.675 1.88554 15.5159 3.21169C14.4903 4.38029 13.5742 6.29571 13.8109 8.097C15.6189 8.2285 17.4753 7.20752 18.6357 5.87268Z"
                    fill="#403F3D"
                  />
                </svg>
                <div className="btn-txt">
                  <p className="btn-small-txt caption-font weight-600">
                    Available on the
                  </p>
                  <p className="btn-name medium-font weight-600">App Store</p>
                </div>
              </a>
              <a
                className="download-btn flex-row align-center gap-8"
                href="https://play.google.com/store/games?device=windows&pli=1"
                target="_blank"
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.7558 3.20297C3.39335 3.57289 3.18359 4.14884 3.18359 4.89471V31.4994C3.18359 32.2453 3.39335 32.8212 3.7558 33.1911L3.84525 33.2723L19.1359 18.37V18.0181L3.84525 3.11575L3.7558 3.20297Z"
                    fill="#403F3D"
                  />
                  <path
                    d="M26.0776 23.34L20.9863 18.37V18.0181L26.0837 13.0482L26.1979 13.1128L32.2345 16.4617C33.9573 17.4121 33.9573 18.976 32.2345 19.9324L26.1979 23.2753L26.0776 23.34Z"
                    fill="#403F3D"
                  />
                  <path
                    d="M25.2733 24.2007L20.0617 19.1195L4.68164 34.1166C5.25384 34.7031 6.18695 34.7737 7.24807 34.1873L25.2733 24.2007Z"
                    fill="#403F3D"
                  />
                  <path
                    d="M25.2733 12.1876L7.24807 2.20103C6.18695 1.62058 5.25384 1.69125 4.68164 2.27772L20.0617 17.2688L25.2733 12.1876Z"
                    fill="#403F3D"
                  />
                </svg>
                <div className="btn-txt">
                  <p className="btn-small-txt caption-font weight-600">
                    Available on
                  </p>
                  <p className="btn-name medium-font weight-600">Google Play</p>
                </div>
              </a>
            </div>
          </div>
          <img
            className="phone-img"
            src="assets/mobile-screens.png"
            alt="mobile image"
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
