"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@/types/transaction";

type TransactionModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  editingIndex: number | null;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function TransactionModal({
    isOpen,
    setIsOpen,
    transactions,
    setTransactions,
    editingIndex,
    setEditingIndex
}: TransactionModalProps) {
  const [amount, setAmount] = useState("");
  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Salary",
    "Entertainment",
    "Investment",
    "Health",
    "Education",
    "General",
  ];

  const [category, setCategory] = useState("General");
  const [type, setType] = useState<"Income" | "Expense">("Income");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (editingIndex !== null) {
      const transaction = transactions[editingIndex];
      if (!transaction) return;

      setAmount(transaction.amount.toString());
      setCategory(transaction.category);
      setType(transaction.type);
      setDate(transaction.date);
    } else {
      setAmount("");
      setCategory("General");
      setType("Income");
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [isOpen, editingIndex, transactions]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-2xl border border-neutral-700 bg-neutral-900 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {editingIndex !== null
              ? "Edit Transaction"
              : "Add Transaction"}
          </h2>

          <button
            onClick={() => {
              setEditingIndex(null);
              setIsOpen(false);
            }}
            className="text-neutral-400 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm text-neutral-400">
            Amount
          </label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3 outline-none focus:border-emerald-500"
          />
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm text-neutral-400">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
            <label className="mb-2 block text-sm text-neutral-400">
                Type
            </label>

            <select
                value={type}
                onChange={(e) => 
                    setType(e.target.value as "Income" | "Expense")
                }
                className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3"
            >
               <option>Income</option>
               <option>Expense</option>
            </select>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm text-neutral-400">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3"
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => {
              setEditingIndex(null);
              setIsOpen(false);
            }}
            className="rounded-xl border border-neutral-700 px-5 py-2"
          >
            Cancel
          </button>

          <button
                onClick={() => {
                if (!amount) return;

                const newTransaction = {
                  amount: Number(amount),
                  category,
                  type,
                  date,
                };

                if (editingIndex !== null) {

                  const updatedTransactions = [...transactions];

                  updatedTransactions[editingIndex] = newTransaction;

                  setTransactions(updatedTransactions);

                } else {

                  setTransactions([
                    ...transactions,
                    newTransaction,
                  ]);

                }

                setAmount("");
                setCategory("General");
                setType("Income");
                setDate(new Date().toISOString().split("T")[0]);

                setEditingIndex(null);
                setIsOpen(false);
              }}
            className="rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-black transition hover:bg-emerald-400"
          >
            {editingIndex !== null ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
