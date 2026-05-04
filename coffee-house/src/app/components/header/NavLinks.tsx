import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface NavLinksProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NAV_LINKS = ["favorite", "about", "mobile", "contact"];

export default function NavLinks({ setIsOpen }: NavLinksProps) {
  const t = useTranslations("Navigation");

  function handleClick() {
    setIsOpen(false);
  }

  return (
    <ul className="flex flex-col lg:flex-row items-center gap-10">
      {NAV_LINKS.map((link) => (
        <li key={link}>
          <Link
            href={`${link === "contact" ? "" : "/"}#${link}`}
            className="hover:text-primary transition-all duration-400 relative group"
            onClick={handleClick}
          >
            {t(link)}
            <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-0.5 bg-primary scale-x-0 transition-all duration-400 group-hover:scale-x-100"></span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
