import { Transaction } from "@/types/transaction";

export function calculateBudgetSpent(
  category: string,
  transactions: Transaction[]
) {
  const now = new Date();

  const currentMonth =
    now.getMonth();

  const currentYear =
    now.getFullYear();

  return transactions
    .filter((transaction) => {

      if (
        transaction.type !== "Expense" ||
        transaction.category !== category
      ) {
        return false;
      }

      const transactionDate =
        new Date(transaction.date);

      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );

    })
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );
}