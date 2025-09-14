import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'

interface ErrorCardProps {
  title: string
  message: string
  className?: string
}

export function ErrorCard({ title, message, className }: ErrorCardProps) {
  return (
    <Card
      className={cn(
        'border-destructive/20 bg-destructive/5 shadow-sm',
        className
      )}
    >
      <CardContent className="flex items-start gap-3 p-6">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-red-900 dark:text-red-300 text-balance">
            {title}
          </h3>
          <p className="text-sm text-foreground/80 leading-relaxed text-pretty">
            {message}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
