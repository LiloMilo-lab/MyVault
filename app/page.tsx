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
import { useState } from "react";
import TransactionModal from "@/components/dashboard/TransactionModal";
import TransactionList from "@/components/transactions/TransactionList";
import FinanceChart from "@/components/dashboard/FinanceChart";
import {useTransactions} from "@/hooks/useTransactions";
import { formatCurrency } from "@/lib/format";
import {useStatistics} from "@/hooks/useStatistics";

export default function Home() {
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
    incomeCount,
    expenseCount,
  } = useStatistics(transactions);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "All" | "Income" | "Expense"
  >("All");

  const [sortBy, setSortBy] = useState<
    "Newest" | "Oldest" | "Highest" | "Lowest"
  >("Newest");

    const saving =
      totalIncome - totalExpense;

    const savingRate =
      totalIncome === 0
        ? 0
        : (saving / totalIncome) * 100;
  
  const deleteTransaction = (index: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;
    setTransactions(
      transactions.filter((_, i) => i !== index)
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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const sortedTransactions = [...filteredTransactions];
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

          <div className="grid gap-6 md:grid-cols-4">

            <StatCard
              title="Cash"
              value={formatCurrency(cash)}
              change={dashboardData.cash.change}
              icon={Landmark}
            />

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

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:col-span-4">
              <h2 className="text-xl font-bold">
                Overview
              </h2>

              <div className="mt-5 grid grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-neutral-500">
                    Transactions
                  </p>

                  <p className="text-2xl font-bold">
                    {totalTransactions}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-neutral-500">
                    Income
                  </p>

                  <p className="text-2xl font-bold text-green-400">
                    {incomeCount}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-neutral-500">
                    Expense
                  </p>

                  <p className="text-2xl font-bold text-red-400">
                    {expenseCount}
                  </p>
                </div>
              </div>
            </div>

            <FinanceChart
              income={totalIncome}
              expense={totalExpense}
            />

            <TransactionList
              transactions={sortedTransactions}
              deleteTransaction={deleteTransaction}
              setEditingIndex={setEditingIndex}
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
