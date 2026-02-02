export default function StatCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-center pt-5 sm:pt-16 lg:pt-10 px-4">
        <div className="h-10 w-64 bg-gray-300 rounded" />
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center px-4 pb-8 sm:pb-12 gap-4 sm:gap-10 mt-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full" />
        <div className="h-6 w-48 bg-gray-300 rounded" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 justify-center">
        {Array.from({ length: 3 }).map((_, i: number) => (
          <div
            key={i}
            className="flex flex-col p-4 sm:p-6 lg:p-8 bg-[#26303B] w-full lg:max-w-[455px] min-h-[170px] sm:min-h-[190px] rounded-2xl gap-4"
          >
            <div className="h-5 w-24 bg-gray-400 rounded" />
            <div className="h-8 w-32 bg-gray-400 rounded" />
            <div className="h-4 w-20 bg-gray-400 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
