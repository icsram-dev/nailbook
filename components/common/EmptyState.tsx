import { Inbox } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description?: string;
};

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-12 text-center">
      <div className="mb-4 rounded-full bg-muted p-3">
        <Inbox className="h-6 w-6 text-muted-foreground" />
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}