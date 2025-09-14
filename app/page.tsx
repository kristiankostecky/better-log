import { ErrorCard } from '@/components/error-card'
import { LogsViewer } from '@/components/logs-viewer'
import { LogsViewerSkeleton } from '@/components/logs-viewer-skeleton'
import { PageHeading } from '@/components/page-heading'
import { getLogs } from '@/lib/data'
import { connection } from 'next/server'
import { Suspense } from 'react'

async function Logs() {
  const { data, error } = await getLogs()

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 justify-between">
          <PageHeading
            title="Better Log Viewer"
            description="See your logs in a better way"
          />
        </div>
        <ErrorCard title="Error" message={'Failed to fetch logs'} />
      </div>
    )
  }

  return <LogsViewer logs={data} />
}

export default async function Home() {
  await connection() // make sure the page is dynamic

  return (
    <div className="bg-background">
      <main className="max-w-screen-lg max-h-screen overflow-hidden mx-auto py-12 px-4">
        <Suspense fallback={<LogsViewerSkeleton />}>
          <Logs />
        </Suspense>
      </main>
    </div>
  )
}
