export const getCurrentISOMonthValue = (): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  return `${year}-${month}`;
};

export function getCurrentISODateValue(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const getCurrentISOWeekValue = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const weekNumber = getWeekNumber(today);

  return `${year}-W${weekNumber.toString().padStart(2, "0")}`;
};

const getWeekNumber = (date: Date): number => {
  var target = new Date(date.valueOf());
  var dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  var firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
};
