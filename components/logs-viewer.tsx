'use client'

import { Logs } from '@/components/logs'
import { PageHeading } from '@/components/page-heading'
import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'
import { LOG_LEVELS } from '@/lib/constants'
import type { Log } from '@/lib/data'
import { SearchIcon } from 'lucide-react'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

const DEBOUNCE_TIME = 300

const DEFAULT_LOG_LEVELS = [...LOG_LEVELS]

export function LogsViewer({ logs }: { logs: Array<Log> }) {
  const [searchTerm, setSearchTerm] = useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({
      shallow: true,
      clearOnDefault: true,
    })
  )
  const [selectedLevels, setSelectedLevels] = useQueryState(
    'levels',
    parseAsArrayOf(parseAsString).withDefault(DEFAULT_LOG_LEVELS).withOptions({
      shallow: true,
      clearOnDefault: true,
    })
  )

  const [filteredLogs, setFilteredLogs] = useState<Log[]>(() => {
    return logs.filter((log) =>
      log.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const debounceSetFilteredLogs = useDebounceCallback(
    setFilteredLogs,
    DEBOUNCE_TIME
  )

  const filterLogs = (messageSearch: string, logLevels: string[]) => {
    return logs.filter(
      (log) =>
        log.message.toLowerCase().includes(messageSearch.toLowerCase()) &&
        logLevels.includes(log.level)
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 flex-col items-center md:flex-row md:justify-between md:items-start">
        <PageHeading
          title="Better Log Viewer"
          description="See your logs in a better way"
        />
        <div className="flex flex-col gap-2 items-center md:items-end">
          <div className="relative ">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />

            <Input
              placeholder="Search logs messages..."
              value={searchTerm}
              onChange={(e) => {
                const newSearchTerm = e.target.value
                setSearchTerm(newSearchTerm)

                debounceSetFilteredLogs(
                  filterLogs(newSearchTerm, selectedLevels)
                )
              }}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <div className="flex gap-2">
            {LOG_LEVELS.map((level) => (
              <Toggle
                key={level}
                variant="outline"
                size="sm"
                pressed={selectedLevels.includes(level)}
                onPressedChange={(isPressed) => {
                  const newSelectedLevels = isPressed
                    ? [...selectedLevels, level]
                    : selectedLevels.filter(
                        (selectedLevel) => selectedLevel !== level
                      )

                  if (newSelectedLevels.length === DEFAULT_LOG_LEVELS.length) {
                    setSelectedLevels(DEFAULT_LOG_LEVELS)
                    setFilteredLogs(filterLogs(searchTerm, DEFAULT_LOG_LEVELS))
                    return
                  }

                  setSelectedLevels(newSelectedLevels)
                  setFilteredLogs(filterLogs(searchTerm, newSelectedLevels))
                }}
              >
                {level}
              </Toggle>
            ))}
          </div>
        </div>
      </div>
      <Logs logs={filteredLogs} />
    </div>
  )
}
