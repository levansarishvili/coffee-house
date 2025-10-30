"use client";

interface BurgerMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BurgerMenu({ isOpen, setIsOpen }: BurgerMenuProps) {
  function handleBurgerMenuToggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <button
      onClick={handleBurgerMenuToggle}
      className="burger-menu lg:hidden flex flex-col gap-1.5 w-11 h-11 border rounded-full justify-center items-center cursor-pointer hover:shadow-md transition-all duration-300"
    >
      <span
        className={`${
          isOpen ? "rotate-45 translate-y-2" : "rotate-0"
        } bg-primary w-4 h-0.5 rounded-4xl transition-all duration-300`}
      ></span>
      <span
        className={`${
          isOpen ? "opacity-0" : "opacity-100"
        } bg-primary w-4 h-0.5 rounded-4xl transition-all duration-300`}
      ></span>
      <span
        className={`${
          isOpen ? "-rotate-45 -translate-y-2" : "rotate-0"
        } bg-primary w-4 h-0.5 rounded-4xl transition-all duration-300`}
      ></span>
    </button>
  );
}
