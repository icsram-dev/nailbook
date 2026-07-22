type CalendarProps = {
  children: React.ReactNode;
};

export function Calendar({ children }: CalendarProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {children}
    </div>
  );
}