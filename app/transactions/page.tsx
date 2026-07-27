"use client";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionModal from "@/components/dashboard/TransactionModal";
import { useTransactions } from "@/hooks/useTransactions";
import { useStatistics } from "@/hooks/useStatistics";
import { formatCurrency } from "@/lib/format";
import {
  TrendingUp,
  Wallet,
  Landmark,
  ReceiptText,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { useState } from "react";

export default function TransactionsPage() {
    const [isOpen, setIsOpen] = useState(false);

const {
  transactions,
  setTransactions,
  mounted,
} = useTransactions();

const {
  cash,
  totalIncome,
  totalExpense,
  totalTransactions,
} = useStatistics(transactions);

const [editingId, setEditingId] =
  useState<number | null>(null);

const [search, setSearch] = useState("");

const [filter, setFilter] = useState<
  "All" | "Income" | "Expense"
>("All");

const [sortBy, setSortBy] = useState<
  "Newest" | "Oldest" | "Highest" | "Lowest"
>("Newest");

const deleteTransaction = (id: number) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this transaction?"
  );

  if (!confirmDelete) return;

  setTransactions(
    transactions.filter(
      (transaction) => transaction.id !== id
    )
  );
};

const filteredTransactions =
  transactions.filter((transaction) => {

    const matchSearch =
      transaction.category
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchFilter =
      filter === "All" ||
      transaction.type === filter;

    return matchSearch && matchFilter;

  });

const sortedTransactions = [
  ...filteredTransactions,
];

sortedTransactions.sort((a, b) => {

  switch (sortBy) {

    case "Newest":
      return (
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
      );

    case "Oldest":
      return (
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
      );

    case "Highest":
      return b.amount - a.amount;

    case "Lowest":
      return a.amount - b.amount;

    default:
      return 0;
  }

});

if (!mounted) return null;

  return (
    <main className="flex min-h-screen bg-neutral-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <section className="flex-1 p-8">

            <div className="mb-8">

                <h1 className="text-4xl font-bold">
                Transactions
                </h1>

                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    <StatCard
                        title="Income"
                        value={formatCurrency(totalIncome)}
                        change="+"
                        icon={TrendingUp}
                    />

                    <StatCard
                        title="Expense"
                        value={formatCurrency(totalExpense)}
                        change="-"
                        icon={Wallet}
                    />

                    <StatCard
                        title="Cash Flow"
                        value={formatCurrency(cash)}
                        change=""
                        icon={Landmark}
                    />

                    <StatCard
                        title="Transactions"
                        value={totalTransactions.toString()}
                        change=""
                        icon={ReceiptText}
                    />

                </div>

                <p className="mt-2 text-neutral-500">
                Manage all your financial transactions.
                </p>

            </div>

            <TransactionList
                transactions={sortedTransactions}
                deleteTransaction={deleteTransaction}
                setEditingId={setEditingId}
                setIsOpen={setIsOpen}
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            <button
                onClick={() => setIsOpen(true)}
                className="
                mt-8
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
                + Add Transaction
            </button>

            <TransactionModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                transactions={transactions}
                setTransactions={setTransactions}
                editingId={editingId}
                setEditingId={setEditingId}
            />

        </section>        
      </div>
    </main>
  );
}