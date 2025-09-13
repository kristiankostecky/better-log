import { LogsViewer } from '@/components/logs-viewer'
import { LogsViewerSkeleton } from '@/components/logs-viewer-skeleton'
import { getLogs } from '@/lib/data'
import { connection } from 'next/server'
import { Suspense } from 'react'

async function Logs() {
  const data = await getLogs()

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
