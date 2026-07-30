"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@/types/transaction";
import { syncPortfolio } from "@/lib/syncPortfolio";
import { useAssets } from "@/hooks/useAssets";

type TransactionModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  
  editingId: number | null;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function TransactionModal({
    isOpen,
    setIsOpen,
    transactions,
    setTransactions,
    editingId,
    setEditingId,
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
  const [notes, setNotes] = useState("");
  const [account, setAccount] = useState("Cash");
  const [currency, setCurrency] = useState("IDR");

  useEffect(() => {
    if (!isOpen) return;

    if (editingId !== null) {
      const transaction = transactions.find(
        (t) => t.id === editingId
      );      
      
      if (!transaction) return;

      setAmount(transaction.amount.toString());
      setCategory(transaction.category);
      setType(transaction.type);
      setDate(transaction.date);

      setNotes(transaction.notes);
      setAccount(transaction.account);
      setCurrency(transaction.currency);
    } else {
      setAmount("");
      setCategory("General");
      setType("Income");
      setDate(new Date().toISOString().split("T")[0]);
      setAccount("Cash");
      setCurrency("IDR");
      setNotes("");
    }
  }, [isOpen, editingId, transactions]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setEditingId(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [setIsOpen, setEditingId]);

  const handleSave = () => {
    const parsedAmount = Number(amount);

    if (!amount || Number.isNaN(parsedAmount)) {
      return;
    }

    if (editingId !== null) {
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === editingId
            ? {
                ...transaction,
                amount: parsedAmount,
                category,
                type,
                date,
                account,
                currency,
                notes,
              }
            : transaction
        )
      );
    } else {
      const newTransaction = {
      id: editingId ?? Date.now(),
      amount: parsedAmount,
      category,
      type,
      date,
      notes,
      account,
      currency,
      };

      setTransactions((prev) => [...prev, newTransaction]);
    }

    setEditingId(null);
    setIsOpen(false);
  };

  const {
    assets,
    setAssets,
  } = useAssets();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60"
      onClick={() => {
        setIsOpen(false);
        setEditingId(null);
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-neutral-700 bg-neutral-900 p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {editingId !== null
              ? "✏️ Edit Transaction"
              : "➕ Add Transaction"}
          </h2>

          <button
            onClick={() => {
              setEditingId(null);
              setIsOpen(false);
            }}
            className="text-neutral-400 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >

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

          <div className="mt-4">

            <label className="mb-2 block text-sm text-neutral-400">
              Account
            </label>

            <select
              value={account}
              onChange={(e)=>setAccount(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3"
            >

              <option>Cash</option>
              <option>BCA</option>
              <option>Mandiri</option>
              <option>BRI</option>
              <option>BNI</option>
              <option>Dana</option>
              <option>OVO</option>
              <option>GoPay</option>

            </select>

          </div>

          <div className="mt-4">

            <label className="mb-2 block text-sm text-neutral-400">
              Currency
            </label>

            <select
              value={currency}
              onChange={(e)=>setCurrency(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3"
            >

              <option>IDR</option>
              <option>USD</option>
              <option>SGD</option>
              <option>MYR</option>

            </select>

          </div>

          <div className="mt-4">

            <label className="mb-2 block text-sm text-neutral-400">
              Notes
            </label>

            <textarea
              value={notes}
              onChange={(e)=>setNotes(e.target.value)}
              rows={3}
              placeholder="Optional..."
              className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3"
            />

          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setAmount("");
                setCategory("General");
                setType("Income");
                setDate(new Date().toISOString().split("T")[0]);
                setNotes("");
                setAccount("Cash");
                setCurrency("IDR");
                setEditingId(null);
                setIsOpen(false);
              }}
              className="rounded-xl border border-neutral-700 px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-black transition hover:bg-emerald-400"
            >
              {editingId !== null ? "Update" : "Add"}
            </button>
          </div>
        </form>  
      </div>
    </div>
  );
}
