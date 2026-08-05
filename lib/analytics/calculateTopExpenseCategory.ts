import { Transaction } from "@/types/transaction";

import { calculateExpenseByCategory } from "./calculateExpenseByCategory";

export function calculateTopExpenseCategory(
  transactions: Transaction[]
) {
  const categories =
    calculateExpenseByCategory(
      transactions
    );

  if (categories.length === 0) {
    return null;
  }

  return categories.reduce(
    (largest, current) =>
      current.amount > largest.amount
        ? current
        : largest
  );
}