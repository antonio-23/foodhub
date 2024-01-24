function getLast7Days() {
  const today = new Date();
  const dates = [];

  for (let i = 6; i >= 0; i--) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() - i);

    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    dates.push(formattedDate);
  }

  return dates;
}

export function calcNewUsers(users: any) {
  const dates = getLast7Days();
  const result = <any>[];
  dates.forEach((date) => {
    result.push(
      users.filter((user: any) => user.created_at.slice(0, 10) === date).length
    );
  });
  return [
    {
      name: "7 dni temu",
      Rejestracji: result[0],
    },
    {
      name: "6 dni temu",
      Rejestracji: result[1],
    },
    {
      name: "5 dni temu",
      Rejestracji: result[2],
    },
    {
      name: "4 dni temu",
      Rejestracji: result[3],
    },
    {
      name: "3 dni temu",
      Rejestracji: result[4],
    },
    {
      name: "Wczoraj",
      Rejestracji: result[5],
    },
    {
      name: "Dzisiaj",
      Rejestracji: result[6],
    },
  ];
}
