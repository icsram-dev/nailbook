import { ReactNode } from "react";

type Props = {
  headers: string[];
  children: ReactNode;
  emptyMessage?: string;
};

export default function AdminTable({
  headers,
  children,
  emptyMessage = "Nincs megjeleníthető adat.",
}: Props) {
  const rows = Array.isArray(children)
    ? children.filter(Boolean)
    : children
    ? [children]
    : [];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-4 text-left text-sm font-semibold text-gray-600"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="px-6 py-12 text-center text-gray-500"
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