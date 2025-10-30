import NavLinks from "./NavLinks";
import CartLink from "./CartLink";
import MenuLink from "./MenuLink";

interface NavigationProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navigation({ isOpen, setIsOpen }: NavigationProps) {
  return (
    <nav
      className={`${
        isOpen ? "right-4 sm:right-10" : "-right-full"
      } lg:right-0 flex lg:flex gap-10 flex-col justify-start items-center lg:justify-center text-2xl md:text-3xl lg:text-base lg:flex-row 
  absolute h-screen lg:h-auto top-20 
  lg:top-0 lg:relative z-50 bg-background pt-20 lg:py-0 
  w-[calc(100%-32px)] sm:w-[calc(100%-80px)] lg:w-auto py-4 font-semibold
  transition-all duration-500 ease-in-out lg:transition-none`}
    >
      <div className="flex justify-center w-full lg:w-auto">
        <NavLinks setIsOpen={setIsOpen} />
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-6 lg:mt-0 lg:flex-1 lg:justify-end">
        <CartLink />
        <MenuLink />
      </div>
    </nav>
  );
}
