import { LogItem, LogItemSkeleton } from '@/components/log-item'
import { Card } from '@/components/ui/card'
import type { Log } from '@/lib/data'
import { useVirtualizer } from '@tanstack/react-virtual'
import { memo, useRef } from 'react'

export const Logs = memo(({ logs }: { logs: Array<Log> }) => {
  const parentRef = useRef(null)

  const rowVirtualizer = useVirtualizer({
    count: logs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88,
    overscan: 5,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()

  return (
    <Card className="p-0">
      <div ref={parentRef} className="w-full h-[600px] overflow-auto">
        <div className="flex flex-col gap-2">
          {logs.length > 0 &&
            virtualItems.length === 0 &&
            Array.from({ length: 5 }).map((_, index) => (
              <LogItemSkeleton key={index} />
            ))}
        </div>
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {logs.length === 0 && (
            <div className="p-4 text-muted-foreground">No logs found</div>
          )}
          {virtualItems.map((virtualRow) => {
            const log = logs[virtualRow.index]

            return (
              <div
                key={virtualRow.index}
                className="hover:bg-accent border-b h-[88px] flex"
                style={{
                  // virtual row styles
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <LogItem log={log} />
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
})

Logs.displayName = 'Logs'
