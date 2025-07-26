import { DateTime } from 'luxon';

export function getISODateString(date: Date): string {
  return DateTime.fromJSDate(date).toISODate();
}
