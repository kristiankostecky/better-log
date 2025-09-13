import { LOG_LEVELS } from '@/lib/constants'

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

export async function getLogs() {
  const res = await fetch('https://challenges.betterstudio.io/logs', {
    headers: { 'x-api-key': process.env.API_KEY as string },
  })

  console.log(res)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await (res.json() as Promise<Array<string>>)

  return sortLogs(data.map(parseLog))
}
