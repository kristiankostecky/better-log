import { Badge, BadgeVariant } from '@/components/ui/badge'
import type { Log } from '@/lib/data'

function getBadgeVariant(level: Log['level']): BadgeVariant {
  switch (level) {
    case 'ERROR':
      return 'destructive'
    case 'WARN':
      return 'warning'
    case 'INFO':
      return 'default'
    case 'DEBUG':
      return 'secondary'
    case 'TRACE':
      return 'outline'
  }
}

export function LogBadge({ log }: { log: Log }) {
  return <Badge variant={getBadgeVariant(log.level)}>{log.level}</Badge>
}
