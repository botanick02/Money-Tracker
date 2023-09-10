
export function getMondayDateOfWeek(week: number, year: number) {
  let date = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
  date.setUTCDate(date.getUTCDate() + (0 - date.getUTCDay()));
  return date;
}

export function getSundayDateOfWeek(week: number, year: number) {
  let date = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7, 23, 59, 59));
  date.setUTCDate(date.getUTCDate() + (6 - date.getUTCDay()));
  return date;
}
