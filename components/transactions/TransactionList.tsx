import { formatCurrency } from "@/lib/format";
import {Transaction} from "@/types/transaction";

const categoryIcons = {
    Food: "🍔" ,
    Transport: "🚗",
    Salary: "💰",
    Shopping: "🛒",
    Entertainment: "🎮",
    General: "📦",
    Investment: "📈",
    Health: "🏥",
    Education: "📚",
};

type TransactionListProps = {
  transactions: Transaction[];
  deleteTransaction: (index: number) => void;

  setEditingIndex: React.Dispatch<
    React.SetStateAction<number | null>
  >;

  setIsOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  search: string;
  setSearch: React.Dispatch<
    React.SetStateAction<string>
  >;

  filter: "All" | "Income" | "Expense";
  setFilter: React.Dispatch<
    React.SetStateAction<"All" | "Income" | "Expense">
  >;

  sortBy: "Newest" | "Oldest" | "Highest" | "Lowest";
  setSortBy: React.Dispatch<
    React.SetStateAction<
      "Newest" | "Oldest" | "Highest" | "Lowest"
    >
  >;
};

export default function TransactionList({
  transactions,
  deleteTransaction,
  setEditingIndex,
  setIsOpen,
  search,
  setSearch,
  filter,
  setFilter,
  sortBy,
  setSortBy
}: TransactionListProps) {
  return (
    <div className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

      <h2 className="mb-4 text-xl font-bold">
        Recent Transactions
      </h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
          w-full
          rounded-xl
          border
          border-neutral-700
          bg-neutral-800
          p-3
          text-white
          placeholder:text-neutral-500
          focus:outline-none
          focus:ring-2
          focus:ring-emerald-500
          "        />
      </div>

      <div className="mb-5 flex gap-3">

        <button
          onClick={() => setFilter("All")}
          className={`rounded-xl px-4 py-2 ${
            filter === "All"
              ? "bg-emerald-500 text-black"
              : "bg-neutral-800"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("Income")}
          className={`rounded-xl px-4 py-2 ${
            filter === "Income"
              ? "bg-emerald-500 text-black"
              : "bg-neutral-800"
          }`}
        >
          Income
        </button>

        <button
          onClick={() => setFilter("Expense")}
          className={`rounded-xl px-4 py-2 ${
            filter === "Expense"
              ? "bg-emerald-500 text-black"
              : "bg-neutral-800"
          }`}
        >
          Expense
        </button>

      </div>

      <div className="mb-5">
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
          className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3"
        >
          <option>Newest</option>
          <option>Oldest</option>
          <option>Highest</option>
          <option>Lowest</option>
        </select>
      </div>

      {transactions.length === 0 ? (

      <div className="py-16 text-center">

        <div className="text-6xl">
          📄
        </div>

        <h3 className="mt-4 text-xl font-semibold">
          No Matching Transactions
        </h3>

        <p className="mt-2 text-neutral-500">
          Try changing your search or filter
        </p>

      </div>

      ) : (

        <div className="space-y-3">

          {transactions.map((transaction, index) => (

            <div
              key={index}
              className={`flex items-center justify-between rounded-xl border p-4 transition hover:scale-[1.01] ${
                transaction.type === "Income"
                  ? "border-emerald-700 bg-neutral-800"
                  : "border-red-700 bg-neutral-800"
              }`}
            >  
              <div>

                  <h3 className="font-semibold">
                    {categoryIcons[
                      transaction.category as keyof typeof categoryIcons
                    ]}{" "}
                    {transaction.category}
                  </h3>

                  <p
                    className={
                      transaction.type === "Income"
                        ? "text-green-400 text-sm"
                        : "text-red-400 text-sm"
                    }
                  >
                    {transaction.type}
                  </p>

                  <p className="text-xs text-neutral-500">
                    {new Date(transaction.date).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>

                </div>

                <div className="text-right">

                  <p
                    className={
                      transaction.type === "Income"
                        ? "font-bold text-green-400"
                        : "font-bold text-red-400"
                    }
                  >
                    {transaction.type === "Income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>

                  <div className="mt-2 flex justify-end gap-3">

                    <button
                      onClick={() => {
                        setEditingIndex(index);
                        setIsOpen(true);
                      }}
                      className="text-blue-400 transition hover:text-blue-300"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => deleteTransaction(index)}
                      className="text-red-400 transition hover:text-red-300"
                    >
                      🗑️
                    </button>

                  </div>

                </div>
            
              

            </div>

          ))}

        </div>
      )}

    </div>
  );
}