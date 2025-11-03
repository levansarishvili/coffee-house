"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface Props {
  show: boolean;
  onToggle: () => void;
}

function TogglePasswordVisibility({ show, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-[#0F172A]"
    >
      {show ? (
        <EyeSlashIcon className="h-5 w-5 text-primary" />
      ) : (
        <EyeIcon className="h-5 w-5 text-primary" />
      )}
    </button>
  );
}

export default TogglePasswordVisibility;
