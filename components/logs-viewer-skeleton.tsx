import { LogItemSkeleton } from '@/components/log-item'
import { PageHeading } from '@/components/page-heading'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LOG_LEVELS } from '@/lib/constants'

export function LogsViewerSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-between">
        <PageHeading
          title="Better Log Viewer"
          description="See your logs in a better way"
        />

        <div className="flex flex-col gap-2 items-end">
          <Skeleton className="h-9 w-64" />
          <div className="flex gap-2">
            {LOG_LEVELS.map((level) => (
              <Skeleton key={level} className="h-8 w-16" />
            ))}
          </div>
        </div>
      </div>

      <div className="h-[600px]">
        <Card className="p-0 h-full">
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <LogItemSkeleton key={index} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
