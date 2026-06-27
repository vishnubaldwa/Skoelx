import { ReactNode } from "react";

interface Column<T> {
  key: keyof T;
  title: string;
  render?: (row: T) => ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
}

export default function DataTable<T extends { id: string }>({
  columns,
  data,
}: Props<T>) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-6 py-4 text-left text-sm font-semibold"
              >
                {column.title}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {data.map((row) => (
            <tr
              key={row.id}
              className="border-t hover:bg-slate-50"
            >

              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="px-6 py-4"
                >
                  {column.render
                    ? column.render(row)
                    : String(row[column.key])}
                </td>
              ))}

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}