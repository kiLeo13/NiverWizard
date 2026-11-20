import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(utc)
dayjs.extend(isToday)

export function isDateToday(str: string): boolean {
  return dayjs.utc(str).local().isToday()
}
