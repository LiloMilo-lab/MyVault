"use client";

import { useState } from "react";

type TransactionModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cash: number;
  setCash: React.Dispatch<React.SetStateAction<number>>;
};

export default function TransactionModal({
  isOpen,
  setIsOpen,
  cash,
  setCash,
}: TransactionModalProps) {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-2xl border border-neutral-700 bg-neutral-900 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Add Transaction
          </h2>

          <button
            onClick={() => setIsOpen(false)}
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

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-xl border border-neutral-700 px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!amount) return;

              setCash(cash + Number(amount));
              setAmount("");
              setIsOpen(false);
            }}
            className="rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-black"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}