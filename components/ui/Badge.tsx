import { ReactNode } from "react";
import clsx from "clsx";

type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "default";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
};

const variants = {
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
  default: "bg-gray-100 text-gray-700",
};

export function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-3 py-1 text-xs font-medium",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
}