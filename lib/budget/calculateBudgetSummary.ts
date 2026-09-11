import { Budget } from "@/types/budget";
import { Transaction } from "@/types/transaction";

export function calculateBudgetSummary(
  budgets: Budget[],
  transactions: Transaction[]
) {
  let totalBudget = 0;
  let totalSpent = 0;
  let exceededCount = 0;

  budgets.forEach((budget) => {
    totalBudget += budget.limit;

    const spent = transactions
      .filter(
        (transaction) =>
          transaction.type === "Expense" &&
          transaction.category === budget.category
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

    totalSpent += spent;

    if (spent > budget.limit) {
      exceededCount++;
    }
  });

  const remaining =
    totalBudget - totalSpent;

  return {
    totalBudget,
    totalSpent,
    remaining,
    exceededCount,
  };
}