import { useState, useEffect } from "react";
import { Transaction } from "@/types/transaction";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem("transactions");

    if (saved) {
      setTransactions(JSON.parse(saved));
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