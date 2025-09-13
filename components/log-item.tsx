'use client'

import { LogBadge } from '@/components/log-badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Log } from '@/lib/data'
import { CalendarIcon, CodeIcon, UserIcon } from 'lucide-react'

export function LogItemSkeleton() {
  return (
    <div className="py-4  px-2 text-muted-foreground flex flex-col gap-2">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-6 w-full" />
    </div>
  )
}

export function LogItem({ log }: { log: Log }) {
  return (
    <div className="flex flex-col justify-center gap-2 font-mono w-full overflow-auto p-2">
      <div className="pt-2">
        <div className="flex flex-row gap-2">
          <div className="min-w-fit  flex items-center justify-center">
            <LogBadge log={log} />
          </div>

          <div className="flex flex-row gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarIcon className="size-4" />
              <p className="whitespace-nowrap">{log.timestamp}</p>
            </div>
            <div className="flex items-center gap-1">
              <CodeIcon className="size-4" />
              <p className="whitespace-nowrap" title={log.trace}>
                {log.trace}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <UserIcon className="size-4" />
              <p className="whitespace-nowrap" title={log.author}>
                {log.author}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm pb-2 whitespace-nowrap">{log.message}</div>
    </div>
  )
}
