"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import BudgetCard from "@/components/budget/BudgetCard";

import { useBudgets } from "@/hooks/useBudgets";
import { useTransactions } from "@/hooks/useTransactions";

export default function BudgetsPage() {
  const {
    budgets,
    setBudgets,
  } = useBudgets();

  const {
    transactions,
  } = useTransactions();

  const [category, setCategory] =
    useState("Food");

  const [limit, setLimit] =
    useState("");

    const [editingId, setEditingId] =
    useState<number | null>(null);

  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Health",
    "Education",
    "General",
  ];

  function saveBudget() {
    const parsedLimit = Number(limit);

    if (
        !limit ||
        Number.isNaN(parsedLimit) ||
        parsedLimit <= 0
    ) {
        return;
    }

    const alreadyExists =
        budgets.some(
        (budget) =>
            budget.category === category &&
            budget.id !== editingId
        );

    if (alreadyExists) {
        return;
    }

    if (editingId !== null) {
        setBudgets((previous) =>
        previous.map((budget) =>
            budget.id === editingId
            ? {
                ...budget,
                category,
                limit: parsedLimit,
                }
            : budget
        )
        );

        setEditingId(null);
    } else {
        setBudgets((previous) => [
        ...previous,
        {
            id: Date.now(),
            category,
            limit: parsedLimit,
        },
        ]);
    }

    setLimit("");
    setCategory("Food");
    }

  function deleteBudget(id: number) {
    setBudgets((previous) =>
      previous.filter(
        (budget) =>
          budget.id !== id
      )
    );
  }

    function editBudget(id: number) {
        const budget =
            budgets.find(
            (item) => item.id === id
            );

        if (!budget) return;

        setCategory(budget.category);

        setLimit(
            budget.limit.toString()
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
              Budgets
            </h1>

            <p className="mt-2 text-neutral-500">
              Track and manage your spending limits.
            </p>

          </div>


          {/* ADD BUDGET */}

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
              ➕ Add Budget
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                className="
                  rounded-xl
                  border
                  border-neutral-700
                  bg-neutral-800
                  p-3
                "
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>


              <input
                type="number"
                value={limit}
                onChange={(event) =>
                  setLimit(event.target.value)
                }
                placeholder="Budget limit"
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


            <button
              onClick={saveBudget}
              className="
                mt-4
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
                ? "Update Budget"
                : "+ Add Budget"}
            </button>

          </div>


          {/* BUDGET LIST */}

          {budgets.length === 0 ? (

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
              No budgets yet.
            </div>

          ) : (

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {budgets.map((budget) => (

                <BudgetCard
                  key={budget.id}
                  budget={budget}
                  transactions={transactions}
                  deleteBudget={deleteBudget}
                  editBudget={editBudget}
                />

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}