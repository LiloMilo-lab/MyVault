import {Transaction} from "@/types/transaction";
type TransactionListProps = {
  transactions: Transaction[];
  deleteTransaction: (index: number) => void;
};

export default function TransactionList({
  transactions,
  deleteTransaction,
}: TransactionListProps) {
  return (
    <div className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

      <h2 className="mb-4 text-xl font-bold">
        Recent Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-neutral-500">
          No transactions yet.
        </p>
      ) : (
        <div className="space-y-3">

          {transactions.map((transaction, index) => (

            <div
              key={index}
              className="flex items-center justify-between rounded-xl bg-neutral-800 p-4"
            >
              <div>
                <p className="font-semibold">
                  {transaction.category}
                </p>
                <p className="text-sm text-neutral-400">
                  {new Date(transaction.date).toLocaleDateString("id-ID")} • {transaction.type}
                </p>
              </div>

              <div className="flex items-center gap-4">

                <p
                  className={`font-bold ${
                    transaction.type === "Income"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {transaction.type === "Income" ? "+" : "-"} Rp
                  {transaction.amount.toLocaleString("id-ID")}
                </p>

                <button
                  onClick={() => deleteTransaction(index)}
                  className="text-red-400 transition hover:text-red-300"
                >
                  🗑️
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}