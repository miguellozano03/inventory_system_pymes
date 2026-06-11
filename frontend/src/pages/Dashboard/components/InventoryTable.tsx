interface Column {
  key: string;
  label: string;
}

interface InventoryTableProps {
  columns: Column[];
  data?: Record<string, React.ReactNode>[];
  emptyRows?: number;
}

const DEFAULT_EMPTY_ROWS = 9;

export function InventoryTable({
  columns,
  data,
  emptyRows = DEFAULT_EMPTY_ROWS,
}: InventoryTableProps) {
  const rows =
    data && data.length > 0
      ? data
      : Array.from({ length: emptyRows }, () => null);

  return (
    <div className="rounded-xl overflow-hidden border border-inv-border flex-1">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-inv-primary">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-white text-xs font-semibold text-center px-3 py-3 border-r border-[#7a6bb8] last:border-r-0 whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={
                rowIdx % 2 === 0 ? "bg-inv-table-bg" : "bg-inv-table-row"
              }
            >
              {columns.map((col, colIdx) => (
                <td
                  key={colIdx}
                  className="px-3 py-3 border-r border-inv-border/60 last:border-r-0 border-b border-b-inv-border/40 text-sm text-inv-dark"
                >
                  {row ? (row[col.key] ?? "—") : <>&nbsp;</>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
