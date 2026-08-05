import { Transaction } from "@/types/transaction";

export function calculateExpenseByCategory(
  transactions: Transaction[]
) {
  const grouped: Record<string, number> = {};

  transactions
    .filter(
      (transaction) =>
        transaction.type === "Expense"
    )
    .forEach((transaction) => {
      grouped[transaction.category] =
        (grouped[transaction.category] || 0) +
        transaction.amount;
    });

  return Object.entries(grouped).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );
}