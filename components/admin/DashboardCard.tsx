import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

import { Card } from "@/components/ui/Card";

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
  href?: string;
};

export default function DashboardCard({
  title,
  value,
  icon,
  color = "bg-[#f3e8e1] text-[#8f6252]",
  href,
}: DashboardCardProps) {
  const content = (
    <Card
      className={clsx(
        "min-h-30 border border-stone-200 bg-[#fffdfa] p-4 shadow-sm transition-all duration-300",
        href ? "cursor-pointer hover:-translate-y-0.5 hover:border-[#c39a89] hover:shadow-md" : ""
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-stone-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl text-stone-800">{value}</h2>
        </div>

        <div
          className={clsx("flex size-11 shrink-0 items-center justify-center rounded-xl", color)}
        >
          {icon}
        </div>
      </div>
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
