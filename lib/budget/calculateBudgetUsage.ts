import { Budget } from "@/types/budget";
import { Transaction } from "@/types/transaction";

export function calculateBudgetUsage(
  budget: Budget,
  transactions: Transaction[]
) {
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

  const percentage =
    budget.limit > 0
      ? (spent / budget.limit) * 100
      : 0;

  return {
    spent,
    remaining: budget.limit - spent,
    percentage,
  };
}