import { Transaction } from "@/types/transaction";

export function calculateIncome(
  transactions: Transaction[]
) {
  return transactions
    .filter(
      (transaction) =>
        transaction.type === "Income"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );
}