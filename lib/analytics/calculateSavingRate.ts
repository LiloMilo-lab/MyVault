export function calculateSavingRate(
  income: number,
  expense: number
) {
  if (income === 0) {
    return 0;
  }

  return ((income - expense) / income) * 100;
}