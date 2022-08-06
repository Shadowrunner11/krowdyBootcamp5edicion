import dayjs from 'dayjs';

export function parseDate(rawDateElement) {
  return dayjs(rawDateElement).isValid() ? dayjs(rawDateElement).toDate(): null;
}