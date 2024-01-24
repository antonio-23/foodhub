export function getCalculatedMacroOfAllMeals(calculatedMeals: any) {
  const totalKcal =
    calculatedMeals.totalBreakfast?.totalKcal +
    calculatedMeals.totalDinner?.totalKcal +
    calculatedMeals.totalSnacks?.totalKcal +
    calculatedMeals.totalSuppers?.totalKcal;

  const totalProtein =
    calculatedMeals.totalBreakfast?.totalProteins +
    calculatedMeals.totalDinner?.totalProteins +
    calculatedMeals.totalSnacks?.totalProteins +
    calculatedMeals.totalSuppers?.totalProteins;

  const totalCarbs =
    calculatedMeals.totalBreakfast?.totalCarbs +
    calculatedMeals.totalDinner?.totalCarbs +
    calculatedMeals.totalSnacks?.totalCarbs +
    calculatedMeals.totalSuppers?.totalCarbs;

  const totalFats =
    calculatedMeals.totalBreakfast?.totalFats +
    calculatedMeals.totalDinner?.totalFats +
    calculatedMeals.totalSnacks?.totalFats +
    calculatedMeals.totalSuppers?.totalFats;

  const data = { totalKcal, totalProtein, totalCarbs, totalFats };

  return data;
}
