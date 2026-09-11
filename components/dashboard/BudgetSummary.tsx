import { Budget } from "@/types/budget";
import { Transaction } from "@/types/transaction";

import { formatCurrency } from "@/lib/format";

type BudgetSummaryProps = {
  budgets: Budget[];
  transactions: Transaction[];
};

export default function BudgetSummary({
  budgets,
  transactions,
}: BudgetSummaryProps) {

  const totalBudget =
    budgets.reduce(
      (total, budget) =>
        total + budget.limit,
      0
    );

  const totalSpent =
    transactions
      .filter(
        (transaction) =>
          transaction.type === "Expense"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

  const exceededBudgets =
    budgets.filter((budget) => {

      const spent =
        transactions
          .filter(
            (transaction) =>
              transaction.type === "Expense" &&
              transaction.category ===
                budget.category
          )
          .reduce(
            (total, transaction) =>
              total + transaction.amount,
            0
          );

      return spent > budget.limit;

    }).length;

  return (
    <div
      className="
        rounded-2xl
        border
        border-neutral-800
        bg-neutral-900
        p-6
      "
    >

      <h2 className="text-xl font-bold">
        💸 Budget Overview
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-6">

        <div>

          <p className="text-sm text-neutral-500">
            Total Budget
          </p>

          <p className="mt-1 text-xl font-bold">
            {formatCurrency(totalBudget)}
          </p>

        </div>


        <div>

          <p className="text-sm text-neutral-500">
            Total Spending
          </p>

          <p className="mt-1 text-xl font-bold text-red-400">
            {formatCurrency(totalSpent)}
          </p>

        </div>


        <div>

          <p className="text-sm text-neutral-500">
            Active Budgets
          </p>

          <p className="mt-1 text-xl font-bold">
            {budgets.length}
          </p>

        </div>


        <div>

          <p className="text-sm text-neutral-500">
            Exceeded
          </p>

          <p
            className={`
              mt-1
              text-xl
              font-bold
              ${
                exceededBudgets > 0
                  ? "text-red-400"
                  : "text-emerald-400"
              }
            `}
          >
            {exceededBudgets}
          </p>

        </div>

      </div>

    </div>
  );
}