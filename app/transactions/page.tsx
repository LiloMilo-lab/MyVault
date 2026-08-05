"use client";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import TransactionTable from "@/components/transactions/TransactionTable";
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
import { useRef, useState } from "react";
import { exportTransactionsCSV } from "@/lib/exportCSV";
import {
  exportTransactionsExcel,
} from "@/lib/exportExcel";
import { exportTransactionsPDF } from "@/lib/exportPDF";
import * as XLSX from "xlsx";

export default function TransactionsPage() {

  function editTransaction(id: number) {

    setEditingId(id);

    setIsOpen(true);

  }

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

  const [dateFilter, setDateFilter] = useState<
    "All" |
    "Today" |
    "Week" |
    "Month" |
    "Year"
  >("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 10;

  const [selectedTransactions, setSelectedTransactions] =
    useState<number[]>([]); 
  
    const [deletedTransactions, setDeletedTransactions] =
      useState<typeof transactions>([]);

    const [showUndo, setShowUndo] =
      useState(false);

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

    const transactionDate =
      new Date(transaction.date);

    const today = new Date();

    const matchDate = (() => {

      switch (dateFilter) {

        case "Today":
          return (
            transactionDate.toDateString() ===
            today.toDateString()
          );

        case "Week": {

          const weekAgo = new Date();

          weekAgo.setDate(
            today.getDate() - 7
          );

          return transactionDate >= weekAgo;

        }

        case "Month":
          return (
            transactionDate.getMonth() ===
              today.getMonth() &&
            transactionDate.getFullYear() ===
              today.getFullYear()
          );

        case "Year":
          return (
            transactionDate.getFullYear() ===
            today.getFullYear()
          );

        default:
          return true;

      }

    })();

    return (
      matchSearch &&
      matchFilter &&
      matchDate
    );

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

const totalPages = Math.ceil(
  sortedTransactions.length / itemsPerPage
);

const paginatedTransactions =
  sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

const startItem =
  sortedTransactions.length === 0
    ? 0
    : (currentPage - 1) * itemsPerPage + 1;

const endItem = Math.min(
  currentPage * itemsPerPage,
  sortedTransactions.length
);

const fileInputRef =
  useRef<HTMLInputElement>(null);

function handleImport(
  event: React.ChangeEvent<HTMLInputElement>
) {

  const file = event.target.files?.[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {

    const data = e.target?.result;

    const workbook = XLSX.read(data, {
      type: "array",
    });

    const sheet =
      workbook.Sheets[
        workbook.SheetNames[0]
      ];
    
    const requiredColumns = [
      "Date",
      "Category",
      "Type",
      "Amount",
      "Account",
      "Currency",
      "Notes",
    ];

    const json =
      XLSX.utils.sheet_to_json(sheet);

    const importedTransactions =
      json.map((item: any) => ({

        id: Date.now() + Math.random(),

        date: item.Date,

        category: item.Category,

        type: item.Type,

        amount: Number(item.Amount),

        account: item.Account,

        currency: item.Currency,

        notes: item.Notes ?? "",

      }));

    const headers =
      json.length > 0
        ? Object.keys(json[0] as object)
        : [];
    
    const missingColumns =
      requiredColumns.filter(
        (column) =>
          !headers.includes(column)
      );
    
    if (missingColumns.length > 0) {

      alert(
        `Invalid MyVault template.

    Missing columns:

    ${missingColumns.join(", ")}`
      );

      return;

    }

    setTransactions((prev) => [
      ...prev,
      ...importedTransactions,
    ]);

    alert(
      `${importedTransactions.length} transactions imported successfully!`
    );

  };

  reader.readAsArrayBuffer(file);

}

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

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search category..."
                className="
                  rounded-xl
                  border
                  border-neutral-700
                  bg-neutral-900
                  px-4
                  py-3
                  outline-none
                  focus:border-emerald-500
                "
              />

              <div className="flex gap-3">

                <select
                  value={filter}
                  onChange={(e) =>
                    setFilter(
                      e.target.value as
                        "All"
                        | "Income"
                        | "Expense"
                    )
                  }
                  className="
                    rounded-xl
                    border
                    border-neutral-700
                    bg-neutral-900
                    px-4
                    py-3
                  "
                >
                  <option>All</option>
                  <option>Income</option>
                  <option>Expense</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as
                        | "Newest"
                        | "Oldest"
                        | "Highest"
                        | "Lowest"
                    )
                  }
                  className="
                    rounded-xl
                    border
                    border-neutral-700
                    bg-neutral-900
                    px-4
                    py-3
                  "
                >
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Highest</option>
                  <option>Lowest</option>
                </select>

                <select
                  value={dateFilter}
                  onChange={(e) =>
                    setDateFilter(
                      e.target.value as
                        | "All"
                        | "Today"
                        | "Week"
                        | "Month"
                        | "Year"
                    )
                  }
                  className="
                    rounded-xl
                    border
                    border-neutral-700
                    bg-neutral-900
                    px-4
                    py-3
                  "
                >
                  <option>All</option>
                  <option>Today</option>
                  <option>Week</option>
                  <option>Month</option>
                  <option>Year</option>
                </select>

              </div>

            </div>

            <TransactionTable
                transactions={paginatedTransactions}
                editTransaction={editTransaction}
                deleteTransaction={deleteTransaction}
                selectedTransactions={selectedTransactions}
                setSelectedTransactions={setSelectedTransactions}
            />

            {selectedTransactions.length > 0 && (

              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-red-500/30
                  bg-red-500/10
                  px-5
                  py-3
                "
              >

                <span>

                  {selectedTransactions.length}
                  {" "}
                  transaction(s) selected

                </span>

                <button

                  onClick={() => {

                    const confirmDelete =
                      window.confirm(
                        `Delete ${selectedTransactions.length} transactions?`
                      );

                    if (!confirmDelete) return;

                    const removed = transactions.filter(
                      transaction =>
                        selectedTransactions.includes(transaction.id)
                    );

                    setDeletedTransactions(removed);

                    setTransactions(
                      transactions.filter(
                        transaction =>
                          !selectedTransactions.includes(transaction.id)
                      )
                    );

                    setSelectedTransactions([]);

                    setShowUndo(true);

                    setTimeout(() => {

                      setDeletedTransactions([]);

                      setShowUndo(false);

                    }, 5000);

                    setSelectedTransactions([]);

                  }}

                  className="
                    rounded-lg
                    bg-red-500
                    px-4
                    py-2
                    font-semibold
                    text-black
                    transition
                    hover:bg-red-400
                  "
                >

                  Delete Selected

                </button>

              </div>

            )}

            <div
              className="
                mt-6
                flex
                items-center
                justify-between
              "
            >
              <p className="text-sm text-neutral-500">
                Showing {startItem}–{endItem} of{" "}
                {sortedTransactions.length} transactions
              </p>

              <button
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1)
                  )
                }
                disabled={currentPage === 1}
                className="
                  rounded-xl
                  border
                  border-neutral-700
                  px-4
                  py-2
                  disabled:opacity-40
                "
              >
                ← Previous
              </button>

              <span className="text-neutral-400">

                Page

                {" "}

                {currentPage}

                {" / "}

                {Math.max(totalPages, 1)}

              </span>

              <button
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(page + 1, totalPages)
                  )
                }
                disabled={
                  currentPage === totalPages ||
                  totalPages === 0
                }
                className="
                  rounded-xl
                  border
                  border-neutral-700
                  px-4
                  py-2
                  disabled:opacity-40
                "
              >
                Next →
              </button>

            </div>
            
            <div
              className="
                mt-6
                rounded-2xl
                border
                border-neutral-800
                bg-neutral-900
                p-6
              "
            >
              <div className="grid gap-6 md:grid-cols-3">

                <div>
                  <p className="text-sm text-neutral-500">
                    Total Income
                  </p>

                  <p className="mt-2 text-2xl font-bold text-green-400">
                    {formatCurrency(totalIncome)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-neutral-500">
                    Total Expense
                  </p>

                  <p className="mt-2 text-2xl font-bold text-red-400">
                    {formatCurrency(totalExpense)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-neutral-500">
                    Net Cash Flow
                  </p>

                  <p
                    className={`mt-2 text-2xl font-bold ${
                      cash >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {formatCurrency(cash)}
                  </p>
                </div>

              </div>

            </div>

            <div className="mt-8 flex gap-3">

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

              <button
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="
                  rounded-xl
                  border
                  px-6
                  py-3
                  transition
                  hover:bg-neutral-800
                "
              >
                Import Excel
              </button>
            
            

              <button
                onClick={() =>
                  exportTransactionsCSV(sortedTransactions)
                }
                className="
                  rounded-xl
                  border
                  border-emerald-500
                  px-6
                  py-3
                  text-emerald-400
                  transition
                  hover:bg-emerald-500
                  hover:text-black
                "
              >
                Export CSV
              </button>

              <button
                onClick={() =>
                  exportTransactionsExcel(
                    sortedTransactions
                  )
                }
                className="
                  rounded-xl
                  border
                  border-blue-500
                  px-6
                  py-3
                  text-blue-400
                  transition
                  hover:bg-blue-500
                  hover:text-black
                "
              >
                Export Excel
              </button>

              <button
                onClick={() =>
                  exportTransactionsPDF(sortedTransactions)
                }
                className="
                  rounded-xl
                  border
                  border-red-500
                  px-6
                  py-3
                  text-red-400
                  transition
                  hover:bg-red-500
                  hover:text-black
                "
              >
                Export PDF
              </button>

              <TransactionModal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  transactions={transactions}
                  setTransactions={setTransactions}
                  editingId={editingId}
                  setEditingId={setEditingId}
              />
            </div>

            {showUndo && (

              <div
                className="
                  fixed
                  bottom-6
                  right-6
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  bg-neutral-900
                  px-5
                  py-4
                  shadow-xl
                  border
                  border-neutral-700
                  z-50
                "
              >

                <span>
                  Transaction deleted
                </span>

                <button

                  onClick={() => {

                    setTransactions([
                      ...transactions,
                      ...deletedTransactions,
                    ]);

                    setDeletedTransactions([]);

                    setShowUndo(false);

                  }}

                  className="
                    font-semibold
                    text-emerald-400
                    hover:text-emerald-300
                  "
                >

                  Undo

                </button>
              </div>
            )}
        </section> 
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          hidden
          onChange={handleImport}
        />
      </div>
    </main>
  );
}