import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function ErrorMessaege({ message }: { message: string }) {
  const capitalizedMessage = [
    message.charAt(0).toUpperCase(),
    ...message.slice(1),
  ].join("");

  return (
    <div className="flex justify-center items-center gap-3">
      <ExclamationCircleIcon className="w-9 h-9 stroke-accent" />
      <p className="text-accent font-medium text-2xl italic">
        {capitalizedMessage}
      </p>
    </div>
  );
}
