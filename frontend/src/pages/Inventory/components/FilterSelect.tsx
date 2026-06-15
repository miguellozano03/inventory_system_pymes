import { ChevronDown } from "lucide-react";

interface FilterSelectProps {
  label: string;
}

export function FilterSelect({ label }: FilterSelectProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-inv-border bg-white cursor-pointer select-none min-w-[130px]">
      <span className="text-sm text-inv-label flex-1">{label}</span>
      <ChevronDown size={15} className="text-inv-label shrink-0" />
    </div>
  );
}
