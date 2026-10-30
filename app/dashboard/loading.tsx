function Skeleton({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-lg bg-white/10 ${className}`}
    />
  );
}

export default function DashboardLoading() {
  return (
    <div
      role="status"
      aria-label="Loading dashboard"
      className="flex min-h-screen"
    >
      <div className="hidden w-64 shrink-0 border-r border-white/10 p-6 md:block">
        <Skeleton className="mb-10 h-10 w-40" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <main className="min-w-0 flex-1 p-4 pb-24 sm:p-6 md:p-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Skeleton className="h-10 w-64 max-w-full" />
            <Skeleton className="mt-3 h-4 w-80 max-w-full" />
          </div>
          <Skeleton className="h-10 w-24 shrink-0" />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
        <Skeleton className="mt-6 h-72 w-full rounded-2xl" />
        <span className="sr-only">Loading dashboard...</span>
      </main>
    </div>
  );
}
