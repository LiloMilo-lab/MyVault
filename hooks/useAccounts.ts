import { useEffect, useState } from "react";
import { useTransactions } from "./useTransactions";
import { Account } from "@/types/account";
import { calculateAccountBalances } from "@/lib/accounts/calculateAccountBalances";

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);

    const {
        transactions,
    } = useTransactions();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const stored =
      localStorage.getItem("accounts");

    if (stored) {
      setAccounts(JSON.parse(stored));
    } else {
      setAccounts([
        {
          id: 1,
          name: "Cash",
          type: "Cash",
          balance: 0,
          currency: "IDR",
          color: "#10B981",
        },
      ]);
    }
  }, []);

    useEffect(() => {
        if (!mounted) return;

        setAccounts((previousAccounts) =>
            calculateAccountBalances(
                previousAccounts,
                transactions
            )
        );
    }, [transactions, mounted]);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      "accounts",
      JSON.stringify(accounts)
    );
  }, [accounts, mounted]);

  return {
    accounts,
    setAccounts,
    mounted,
  };
}