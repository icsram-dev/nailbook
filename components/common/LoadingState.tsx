import { Skeleton } from "@/components/ui/skeleton";

type LoadingStateProps = {
  rows?: number;
};

export default function LoadingState({ rows = 8 }: LoadingStateProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} className="h-11 rounded-lg" />
      ))}
    </div>
  );
}
