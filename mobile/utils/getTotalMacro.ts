function calcTotalKcal(meal: any[]) {
  const totalKcal = meal?.reduce((acc, cur) => acc + cur.kcal, 0) || 0;
  const totalProteins = meal?.reduce((acc, cur) => acc + cur.proteins, 0) || 0;
  const totalFats = meal?.reduce((acc, cur) => acc + cur.fats, 0) || 0;
  const totalCarbs = meal?.reduce((acc, cur) => acc + cur.carbs, 0) || 0;

  return {
    totalKcal,
    totalProteins,
    totalFats,
    totalCarbs,
  };
}

export function getTotalMacro({ allMeals }: { allMeals: any }) {
  const totalBreakfast = calcTotalKcal(allMeals?.breakfasts);
  const totalDinner = calcTotalKcal(allMeals?.dinners);
  const totalSuppers = calcTotalKcal(allMeals?.suppers);
  const totalSnacks = calcTotalKcal(allMeals?.snacks);

  return {
    totalBreakfast,
    totalDinner,
    totalSuppers,
    totalSnacks,
  };
}
