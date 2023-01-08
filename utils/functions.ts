export const waitForTwoSeconds = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
}

export function getStrippedDate(date: Date): Date {
  const year = date.getFullYear();
  let month: number = date.getMonth();
  let day: number = date.getDate();

  return new Date(year, month, day);
}
