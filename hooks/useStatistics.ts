import { Transaction } from "@/types/transaction";

export function useStatistics(
  transactions: Transaction[]
) {
  const startingCash = 2300000;

  const totalIncome =
    transactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense =
    transactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

  const cash =
    startingCash +
    transactions.reduce((total,transaction) => {
        return transaction.type === "Income"
            ? total + transaction.amount
            : total - transaction.amount;
    }, 0);

  const totalTransactions =
    transactions.length;

  const incomeCount =
    transactions.filter(
      (t) => t.type === "Income"
    ).length;

  const expenseCount =
    transactions.filter(
      (t) => t.type === "Expense"
    ).length;

    const highestIncome =
    transactions
        .filter(t => t.type === "Income")
        .reduce(
        (max, t) => Math.max(max, t.amount),
        0
        );

    const highestExpense =
    transactions
        .filter(t => t.type === "Expense")
        .reduce(
        (max, t) => Math.max(max, t.amount),
        0
        );

  return {
    cash,
    totalIncome,
    totalExpense,
    totalTransactions,
    incomeCount,
    expenseCount,
    highestIncome,
    highestExpense
  };
}