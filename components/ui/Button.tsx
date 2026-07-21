import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function Button({
  children,
  loading = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`w-full rounded-lg bg-pink-500 px-4 py-3 font-medium text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {loading ? "Betöltés..." : children}
    </button>
  );
}