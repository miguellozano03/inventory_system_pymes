interface TableProps<T> {
  headers?: string[];
  data?: T[];
}

export const Table = <T extends object>({
  headers = [],
  data = [],
}: TableProps<T>) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="bg-primary text-white border border-white p-2 text-sm font-medium"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#EFEEFF]">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-white p-2 text-center text-gray-700 text-sm truncate"
                  >
                    {String(value) || "-"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="p-4 text-center text-gray-500"
              >
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
