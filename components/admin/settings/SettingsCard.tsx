import { ReactNode } from "react";

import { Card } from "@/components/ui/Card";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function SettingsCard({
  title,
  description,
  children,
}: Props) {
  return (
    <Card className="p-6">
      <div className="border-b pb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>

      <div className="mt-6">
        {children}
      </div>
    </Card>
  );
}