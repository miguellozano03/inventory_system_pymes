import React from "react";

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

  // extras útiles
  onRowClick?: (row: T) => void;
  rowKey?: (row: T, index: number) => string | number;
  emptyMessage?: string;
}

const DEFAULT_EMPTY_ROWS = 9;

export function InventoryTable<T>({
  columns,
  data = [],
  emptyRows = DEFAULT_EMPTY_ROWS,
  loading = false,
  onRowClick,
  rowKey,
  emptyMessage = "Sin registros",
}: InventoryTableProps<T>) {
  const hasData = data.length > 0;

  const rows = hasData ? data : Array.from({ length: emptyRows }, () => null);

  return (
    <div className="rounded-xl overflow-hidden border border-inv-border flex-1">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-inv-primary">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="
                  text-white
                  text-xs
                  font-semibold
                  text-center
                  px-3
                  py-3
                  border-r
                  border-[#7a6bb8]
                  last:border-r-0
                  whitespace-nowrap
                "
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIdx) => {
            const clickable = !!row && !!onRowClick;

            return (
              <tr
                key={row && rowKey ? rowKey(row, rowIdx) : rowIdx}
                onClick={() => {
                  if (row && onRowClick) {
                    onRowClick(row);
                  }
                }}
                className={`
                  ${rowIdx % 2 === 0 ? "bg-inv-table-bg" : "bg-inv-table-row"}
                  ${
                    clickable
                      ? "cursor-pointer hover:bg-purple-50 transition-colors"
                      : ""
                  }
                `}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className="
                      px-3
                      py-3
                      border-r
                      border-inv-border/60
                      last:border-r-0
                      border-b
                      border-b-inv-border/40
                      text-sm
                      text-inv-dark
                    "
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
            );
          })}

          {!loading && !hasData && (
            <tr>
              <td
                colSpan={columns.length}
                className="
                  text-center
                  text-sm
                  text-gray-500
                  py-4
                  bg-white
                "
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
