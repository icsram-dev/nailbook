import { AlertCircle } from "lucide-react";

type ErrorStateProps = {
  title: string;
 description?: string;
};

export default function ErrorState({
  title,
  description,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 px-6 py-12 text-center">
      <div className="mb-4 rounded-full bg-destructive/10 p-3">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>

      <h3 className="font-semibold text-destructive">
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