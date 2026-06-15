interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface InventoryTableProps<T> {
  columns: Column<T>[];
  data?: T[];
  emptyRows?: number;
  loading?: boolean;
}

const DEFAULT_EMPTY_ROWS = 9;

export function InventoryTable<T>({
  columns,
  data,
  emptyRows = DEFAULT_EMPTY_ROWS,
  loading = false,
}: InventoryTableProps<T>) {
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
                key={String(col.key)}
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
                  {loading ? (
                    <span className="block h-3 w-3/4 mx-auto bg-inv-border/40 rounded animate-pulse" />
                  ) : row ? (
                    col.render ? (
                      col.render(row[col.key], row)
                    ) : (
                      ((row[col.key] as React.ReactNode) ?? "—")
                    )
                  ) : (
                    <>&nbsp;</>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
