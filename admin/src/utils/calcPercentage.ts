export function calcPercentage(number1: number, number2: number) {
  console.log(number1, number2);
  const sum = number1 + number2;
  const percentage1 = (number1 / sum) * 100;
  const percentage2 = (number2 / sum) * 100;
  return { percentage1, percentage2 };
}
