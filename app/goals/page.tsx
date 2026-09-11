"use client";

import { useState } from "react";
import { calculateGoalsSummary } from "@/lib/goals/calculateGoalsSummary";
import { formatCurrency } from "@/lib/format";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import GoalCard from "@/components/goals/GoalCard";

import { useGoals } from "@/hooks/useGoals";

export default function GoalsPage() {
  const {
    goals,
    setGoals,
  } = useGoals();
  
  const {
    totalGoals,
    totalTarget,
    totalSaved,
    progress,
  } = calculateGoalsSummary(goals);

  const [name, setName] =
    useState("");

  const [targetAmount, setTargetAmount] =
    useState("");

  const [currentAmount, setCurrentAmount] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);


  function saveGoal() {
    const parsedTarget =
      Number(targetAmount);

    const parsedCurrent =
      Number(currentAmount);

    if (
      !name.trim() ||
      !targetAmount ||
      Number.isNaN(parsedTarget) ||
      parsedTarget <= 0 ||
      Number.isNaN(parsedCurrent) ||
      parsedCurrent < 0
    ) {
      return;
    }

    if (editingId !== null) {

      setGoals((previous) =>
        previous.map((goal) =>
          goal.id === editingId
            ? {
                ...goal,
                name: name.trim(),
                targetAmount:
                  parsedTarget,
                currentAmount:
                  parsedCurrent,
              }
            : goal
        )
      );

      setEditingId(null);

    } else {

      setGoals((previous) => [
        ...previous,
        {
          id: Date.now(),
          name: name.trim(),
          targetAmount:
            parsedTarget,
          currentAmount:
            parsedCurrent,
        },
      ]);

    }

    setName("");
    setTargetAmount("");
    setCurrentAmount("");
  }

  function addMoney(
    id: number,
    amount: number
  ) {
    setGoals((previous) =>
      previous.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              currentAmount:
                goal.currentAmount + amount,
            }
          : goal
      )
    );
  }
  function deleteGoal(id: number) {
    setGoals((previous) =>
      previous.filter(
        (goal) =>
          goal.id !== id
      )
    );
  }


  function editGoal(id: number) {
    const goal =
      goals.find(
        (item) => item.id === id
      );

    if (!goal) return;

    setName(goal.name);

    setTargetAmount(
      goal.targetAmount.toString()
    );

    setCurrentAmount(
      goal.currentAmount.toString()
    );

    setEditingId(id);
  }


  return (
    <main className="flex min-h-screen bg-neutral-950">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Header />

        <section className="flex-1 p-8">

          {/* HEADER */}

          <div className="mb-8">

            <h1 className="text-4xl font-bold">
              Financial Goals
            </h1>

            <p className="mt-2 text-neutral-500">
              Plan and track your financial targets.
            </p>

          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div
              className="
                rounded-2xl
                border
                border-neutral-800
                bg-neutral-900
                p-6
              "
            >
              <p className="text-sm text-neutral-500">
                Total Goals
              </p>

              <p className="mt-2 text-3xl font-bold">
                🎯 {totalGoals}
              </p>
            </div>


            <div
              className="
                rounded-2xl
                border
                border-neutral-800
                bg-neutral-900
                p-6
              "
            >
              <p className="text-sm text-neutral-500">
                Total Target
              </p>

              <p className="mt-2 text-2xl font-bold">
                {formatCurrency(totalTarget)}
              </p>
            </div>


            <div
              className="
                rounded-2xl
                border
                border-neutral-800
                bg-neutral-900
                p-6
              "
            >
              <p className="text-sm text-neutral-500">
                Total Saved
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-400">
                {formatCurrency(totalSaved)}
              </p>
            </div>


            <div
              className="
                rounded-2xl
                border
                border-neutral-800
                bg-neutral-900
                p-6
              "
            >
              <p className="text-sm text-neutral-500">
                Overall Progress
              </p>

              <p className="mt-2 text-2xl font-bold">
                  {Math.min(
                    Math.max(progress, 0),
                    100
                  ).toFixed(1)}%              </p>

              <div
                className="
                  mt-3
                  h-2
                  overflow-hidden
                  rounded-full
                  bg-neutral-800
                "
              >
                <div
                  className="h-full bg-emerald-500"
                  style={{
                    width: `${Math.min(
                      Math.max(progress, 0),
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

          </div>


          {/* FORM */}

          <div
            className="
              mb-8
              rounded-2xl
              border
              border-neutral-800
              bg-neutral-900
              p-6
            "
          >

            <h2 className="text-xl font-bold">
              {editingId !== null
                ? "✏️ Edit Goal"
                : "🎯 Create Goal"}
            </h2>


            <div className="mt-5 grid gap-4 md:grid-cols-3">

              <input
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Goal name"
                className="
                  rounded-xl
                  border
                  border-neutral-700
                  bg-neutral-800
                  p-3
                  outline-none
                  focus:border-emerald-500
                "
              />


              <input
                type="number"
                value={targetAmount}
                onChange={(event) =>
                  setTargetAmount(
                    event.target.value
                  )
                }
                placeholder="Target amount"
                className="
                  rounded-xl
                  border
                  border-neutral-700
                  bg-neutral-800
                  p-3
                  outline-none
                  focus:border-emerald-500
                "
              />


              <input
                type="number"
                value={currentAmount}
                onChange={(event) =>
                  setCurrentAmount(
                    event.target.value
                  )
                }
                placeholder="Current amount"
                className="
                  rounded-xl
                  border
                  border-neutral-700
                  bg-neutral-800
                  p-3
                  outline-none
                  focus:border-emerald-500
                "
              />

            </div>


            <div className="mt-4 flex gap-3">

              <button
                onClick={saveGoal}
                className="
                  rounded-xl
                  bg-emerald-500
                  px-6
                  py-3
                  font-semibold
                  text-black
                  transition
                  hover:bg-emerald-400
                "
              >
                {editingId !== null
                  ? "Update Goal"
                  : "+ Create Goal"}
              </button>

              {editingId !== null && (

                <button
                  onClick={() => {
                    setName("");
                    setTargetAmount("");
                    setCurrentAmount("");
                    setEditingId(null);
                  }}
                  className="
                    rounded-xl
                    border
                    border-neutral-700
                    px-6
                    py-3
                    font-semibold
                    text-neutral-300
                    transition
                    hover:bg-neutral-800
                  "
                >
                  Cancel
                </button>

              )}

            </div>

          </div>


          {/* GOALS */}

          {goals.length === 0 ? (

            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-neutral-800
                p-10
                text-center
                text-neutral-500
              "
            >
              No financial goals yet.
            </div>

          ) : (

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {goals.map((goal) => (

                <GoalCard
                  key={goal.id}
                  goal={goal}
                  deleteGoal={deleteGoal}
                  editGoal={editGoal}
                  addMoney={addMoney}
                />

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}