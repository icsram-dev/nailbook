import { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/Card";

type SectionCardProps = {
  children: ReactNode;
};

export default function SectionCard({
  children,
}: SectionCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
}