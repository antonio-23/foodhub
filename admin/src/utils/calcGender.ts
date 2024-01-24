export function calcGender(users: any) {
  const males = users.filter((user: any) => user.gender === "MALE");
  const females = users.filter((user: any) => user.gender === "FEMALE");

  return [
    {
      name: "Mężczyźni",
      value: males.length,
    },
    {
      name: "Kobiety",
      value: females.length,
    },
  ];
}
