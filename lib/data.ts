'server-only'

import { LOG_LEVELS } from '@/lib/constants'

interface ResponseSuccess {
  data: Log[]
  error: null
}

interface ResponseError {
  data: null
  error: Error
}

type Response = ResponseSuccess | ResponseError

const LOG_SEPARATOR = '|=|'

export interface Log {
  timestamp: string
  message: string
  level: (typeof LOG_LEVELS)[number]
  trace: string
  author: string
}

const parseLogLevel = (level: string): Log['level'] => {
  const logLevel = level.toUpperCase()

  if (!LOG_LEVELS.includes(logLevel as (typeof LOG_LEVELS)[number])) {
    // let's throw to be sure we don't miss any log level
    throw new Error(`Invalid log level: ${level}`)
  }

  return logLevel as Log['level']
}

const parseTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp)
  return date.toISOString()
}

function parseLog(log: string): Log {
  const splitted = log.split(LOG_SEPARATOR)

  return {
    timestamp: parseTimestamp(splitted[0]),
    message: splitted[1],
    level: parseLogLevel(splitted[2]),
    trace: splitted[3],
    author: splitted[4],
  }
}

function sortLogs(logs: Log[]): Log[] {
  return logs.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )
}

export async function getLogs(): Promise<Response> {
  try {
    const res = await fetch('https://challenges.betterstudio.io/logs', {
      headers: { 'x-api-key': process.env.API_KEY as string },
      cache: 'no-store',
    })

    if (!res.ok) {
      return {
        data: null,
        error: new Error(
          `Failed to fetch data: ${res.status} ${res.statusText}`
        ),
      }
    }

    const data = await res.json()
    const logs = sortLogs(data.map(parseLog))

    return {
      data: logs,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Unknown error occurred'),
    }
  }
}
