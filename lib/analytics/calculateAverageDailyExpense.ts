import { Transaction } from "@/types/transaction";

export function calculateAverageDailyExpense(
  transactions: Transaction[]
) {
  const expenses = transactions.filter(
    (transaction) =>
      transaction.type === "Expense"
  );

  if (expenses.length === 0) {
    return 0;
  }

  const totalExpense = expenses.reduce(
    (sum, transaction) =>
      sum + transaction.amount,
    0
  );

  const uniqueDays = new Set(
    expenses.map(
      (transaction) => transaction.date
    )
  );

  return totalExpense / uniqueDays.size;
}