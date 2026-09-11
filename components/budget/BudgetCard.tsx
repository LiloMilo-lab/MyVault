import { Budget } from "@/types/budget";
import { Transaction } from "@/types/transaction";

import { formatCurrency } from "@/lib/format";

import { calculateBudgetUsage } from "@/lib/budget/calculateBudgetUsage";
import { getBudgetStatus } from "@/lib/budget/getBudgetStatus";
import { calculateBudgetSpent } from "@/lib/budget/calculateBudgetSpent";
type BudgetCardProps = {
  budget: Budget;
  transactions: Transaction[];
  deleteBudget: (id: number) => void;
  editBudget: (id: number) => void;
};

export default function BudgetCard({
  budget,
  transactions,
  deleteBudget,
  editBudget,
}: BudgetCardProps) {
  const {
    spent,
    remaining,
    percentage,
  } = calculateBudgetUsage(
    budget,
    transactions
  );

  const status =
    getBudgetStatus(percentage);

  const progress =
    Math.min(percentage, 100);

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
      <div className="flex items-start justify-between">

        <div>
          <h2 className="text-xl font-bold">
            {budget.category}
          </h2>

          <p
            className={`mt-2 font-semibold ${status.color}`}
          >
            {status.label}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              editBudget(budget.id)
            }
            className="
              text-sm
              text-neutral-500
              transition
              hover:text-blue-400
            "
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteBudget(budget.id)
            }
            className="
              text-sm
              text-neutral-500
              transition
              hover:text-red-400
            "
          >
            Delete
        </button>

        </div>

      </div>

      <div className="mt-6">

        <div className="mb-2 flex justify-between text-sm">

          <span className="text-neutral-400">
            {formatCurrency(spent)}
          </span>

          <span className="text-neutral-400">
            {formatCurrency(budget.limit)}
          </span>

        </div>

        <div
          className="
            h-3
            overflow-hidden
            rounded-full
            bg-neutral-800
          "
        >
          <div
            className={`h-full ${status.progressColor}`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

      </div>

      <div className="mt-5 space-y-2 text-sm">

        <div className="flex justify-between">

          <span className="text-neutral-500">
            Remaining
          </span>

          <span>
            {formatCurrency(remaining)}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-neutral-500">
            Usage
          </span>

          <span>
            {percentage.toFixed(1)}%
          </span>

        </div>

      </div>

    </div>
  );
}