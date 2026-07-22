"use client";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatCard from "@/components/dashboard/StatCard";
import { dashboardData } from "@/data/dashboard";
import {
  Wallet,
  Landmark,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import TransactionModal from "@/components/dashboard/TransactionModal";
import TransactionList from "@/components/transactions/TransactionList";
import {Transaction} from "@/types/transaction";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window === "undefined") return [];

    const saved = localStorage.getItem("transactions");

    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem(
      "transactions", 
      JSON.stringify(transactions)
    );
  }, [transactions]);

  useEffect(() => {
    setMounted(true);

    const saved = localStorage.getItem("transactions");

    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  const startingCash = 2300000;
  const cash =
    startingCash +
    transactions.reduce((total, transaction) => {
      if (transaction.type === "Income") {
        return total + transaction.amount;
      } else {
        return total - transaction.amount;
      }
    }, 0);

  const deleteTransaction = (index: number) => {
    setTransactions(
      transactions.filter((_, i) => i !== index)
    );
  const transaction = transactions[index];
  if (transaction.type === "Income") {
    // setCash(cash - transaction.amount);
  } else {
    // setCash(cash + transaction.amount);
  }

  setTransactions(
    transactions.filter((_, i) => i !== index)
  ); 
  };
  const investments = 5200000;
  const netWorth = cash + investments;
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  if (!mounted) return null;

  return (
    <main className="flex min-h-screen bg-neutral-950">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Header />

        <section className="flex-1 p-8">

          <div className="grid gap-6 md:grid-cols-3">

            <StatCard
            title="Net Worth"
            value={`Rp${netWorth.toLocaleString("id-ID")}`}
            change={dashboardData.netWorth.change}
            icon={Wallet}
            />

            <StatCard
            title="Cash"
            value={`Rp${cash.toLocaleString("id-ID")}`}
            change={dashboardData.cash.change}
            icon={Landmark}
            />

            <StatCard
            title="Investments"
            value={`Rp${investments.toLocaleString("id-ID")}`}
            change={dashboardData.investments.change}
            icon={TrendingUp}
            />

            <TransactionList
              transactions={transactions}
              deleteTransaction={deleteTransaction}
              setEditingIndex={setEditingIndex}
              setIsOpen={setIsOpen}
            /> 

            <button
              onClick={() => setIsOpen(true)}
              className="mt-8 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
              >
              + Add Transaction
            </button>
              <TransactionModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                transactions={transactions}
                setTransactions={setTransactions}
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}  
              />
          </div>

        </section>

      </div>

    </main>
  );
}
