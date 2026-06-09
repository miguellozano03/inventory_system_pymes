interface TableSectionProps {
  filters?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function TableSection({ filters, action, children }: TableSectionProps) {
  return (
    <div className="w-full">
      {(filters || action) && (
        <div className="flex justify-between pb-5 px-2">
          <div className="flex gap-5">{filters}</div>
          {action}
        </div>
      )}
      {children}
      <div className="py-2" />
    </div>
  );
}