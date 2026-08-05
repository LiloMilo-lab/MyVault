import { Transaction } from "@/types/transaction";

export function calculateExpense(
  transactions: Transaction[]
) {
  return transactions
    .filter(
      (transaction) =>
        transaction.type === "Expense"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );
}