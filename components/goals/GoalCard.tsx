import { useState } from "react";
import { Goal } from "@/types/goal";

import { formatCurrency } from "@/lib/format";

import { calculateGoalProgress } from "@/lib/goals/calculateGoalProgress";
import { getGoalStatus } from "@/lib/goals/getGoalStatus";

type GoalCardProps = {
  goal: Goal;

  deleteGoal: (id: number) => void;

  editGoal: (id: number) => void;

  addMoney: (id: number, amount: number) => void;
};

export default function GoalCard({
  goal,
  deleteGoal,
  editGoal,
  addMoney,
}: GoalCardProps) {
  const [amount, setAmount] =
  useState("");

  const {
    percentage,
    remaining,
  } = calculateGoalProgress(goal);

  const status =
    getGoalStatus(percentage);

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
      {/* HEADER */}

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-bold">
            🎯 {goal.name}
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
              editGoal(goal.id)
            }
            className="
              text-sm
              text-neutral-500
              transition
              hover:text-emerald-400
            "
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteGoal(goal.id)
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


      {/* AMOUNT */}

      <div className="mt-6">

        <div className="flex justify-between text-sm">

          <span className="text-neutral-300">
            {formatCurrency(goal.currentAmount)}
          </span>

          <span className="text-neutral-500">
            {formatCurrency(goal.targetAmount)}
          </span>

        </div>


        {/* PROGRESS BAR */}

        <div
          className="
            mt-3
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


      {/* DETAILS */}

      <div className="mt-5 space-y-2 text-sm">

        <div className="flex justify-between">

          <span className="text-neutral-500">
            Remaining
          </span>

          <span>
            {formatCurrency(
              Math.max(remaining, 0)
            )}
          </span>

        </div>


        <div className="flex justify-between">

          <span className="text-neutral-500">
            Progress
          </span>

          <span>
            {percentage.toFixed(1)}%
          </span>

        </div>

      </div>

            {/* ADD MONEY */}

      <div className="mt-6 border-t border-neutral-800 pt-5">

        <p className="font-semibold">
          Add Money
        </p>

        <div className="mt-3 flex gap-3">

          <input
            type="number"
            min="1"
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value)
            }
            placeholder="Amount"
            className="
              min-w-0
              flex-1
              rounded-xl
              border
              border-neutral-700
              bg-neutral-800
              p-3
              outline-none
              focus:border-emerald-500
            "
          />

          <button
            onClick={() => {
              const parsedAmount =
                Number(amount);

              if (
                !amount ||
                Number.isNaN(parsedAmount) ||
                parsedAmount <= 0
              ) {
                return;
              }

              addMoney(
                goal.id,
                parsedAmount
              );

              setAmount("");
            }}
            className="
              rounded-xl
              bg-emerald-500
              px-4
              font-semibold
              text-black
              transition
              hover:bg-emerald-400
            "
          >
            Add
          </button>

        </div>

      </div>

    </div>
  );
}