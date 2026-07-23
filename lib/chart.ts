export function getChartData(
  income: number,
  expense: number
) {
  return [
    {
      name: "Income",
      value: income,
    },
    {
      name: "Expense",
      value: expense,
    },
  ];
}