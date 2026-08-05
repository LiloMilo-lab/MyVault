import { Transaction } from "@/types/transaction";

export function calculateLargestExpense(
  transactions: Transaction[]
) {
  const expenses = transactions.filter(
    (transaction) =>
      transaction.type === "Expense"
  );

  if (expenses.length === 0) {
    return null;
  }

  return expenses.reduce(
    (largest, current) =>
      current.amount > largest.amount
        ? current
        : largest
  );
}