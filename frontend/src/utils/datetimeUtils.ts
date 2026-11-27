import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(utc)
dayjs.extend(isToday)

export function isDateToday(str: string | undefined): boolean {
  if (!str) return false
  return dayjs.utc(str).local().isToday()
}

export function isDatePast(str: string | undefined): boolean {
  if (!str) return false

  const date = dayjs.utc(str)

  return date.isValid() && date.isBefore(dayjs())
}

export function fmtTime(str: string): string
export function fmtTime(str: undefined): undefined
export function fmtTime(str: string | undefined): string | undefined
export function fmtTime(str: string | undefined): string | undefined {
  if (!str) return undefined

  const d = dayjs(str).utc().local()
  return d.format('HH:mm')
}

export function fmtDatetime(str: string): string
export function fmtDatetime(str: undefined): undefined
export function fmtDatetime(str: string | undefined): string | undefined
export function fmtDatetime(str: string | undefined): string | undefined {
  if (!str) return undefined

  const d = dayjs(str).utc().local()
  return d.format('DD/MM/YYYY HH:mm')
}
