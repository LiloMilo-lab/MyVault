import { useState, useEffect } from "react";
import { Transaction } from "@/types/transaction";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem("transactions");

    if (saved) {
      const parsed: Transaction[] = JSON.parse(saved);

      const migrated = parsed.map((transaction) => ({
        account: "Cash",
        currency: "IDR",
        notes: "",
        ...transaction,
      }));

      setTransactions(migrated);
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions, mounted]);

  return {
    transactions,
    setTransactions,
    mounted,
  };
}