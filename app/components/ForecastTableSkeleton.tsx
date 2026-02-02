export default function ForecastTableSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-8 w-48 bg-gray-300 rounded mt-10 mb-4"></div>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full table-fixed">
          <thead className="bg-[#1C2129]">
            <tr>
              <td className="p-3 sm:p-3 md:p-4">
                <div className="h-4 w-16 bg-gray-600 rounded" />
              </td>
              <td className="p-3 sm:p-3 md:p-4">
                <div className="h-4 w-24 bg-gray-600 rounded" />
              </td>
              <td className="p-3 sm:p-3 md:p-4">
                <div className="h-4 w-20 bg-gray-600 rounded" />
              </td>
              <td className="p-3 sm:p-3 md:p-4 hidden sm:table-cell">
                <div className="h-4 w-10 bg-gray-600 rounded" />
              </td>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 5 }).map((_, i: number) => (
              <tr key={i} className="border-t">
                <td className="p-3 sm:p-3 md:p-4">
                  <div className="h-4 w-20 bg-gray-300 rounded" />
                </td>
                <td className="p-3 sm:p-3 md:p-4">
                  <div className="h-4 w-28 bg-gray-300 rounded" />
                </td>
                <td className="p-3 sm:p-3 md:p-4">
                  <div className="h-4 w-24 bg-gray-300 rounded" />
                </td>
                <td className="p-3 sm:p-3 md:p-4 hidden sm:table-cell">
                  <div className="h-4 w-10 bg-gray-300 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
