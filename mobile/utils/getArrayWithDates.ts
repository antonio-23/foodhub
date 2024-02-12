function getDate(number: number) {
  const day = new Date();
  day.setDate(day.getDate() + number);
  const date = day.toLocaleString("default", {
    weekday: "short",
    day: "2-digit",
  });

  return date;
}

export function getArrayWitchDates() {
  const arr: string[] = [];
  const arrWithNums = [-3, -2, -1, 0, 1, 2, 3, 4];

  arrWithNums.map((el) => {
    arr.push(getDate(el));
  });

  return arr;
}

