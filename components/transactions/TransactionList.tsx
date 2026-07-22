import {Transaction} from "@/types/transaction";
type TransactionListProps = {
  transactions: Transaction[];
  deleteTransaction: (index: number) => void;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TransactionList({
  transactions,
  deleteTransaction,
  setEditingIndex,
  setIsOpen,
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

                  <h3 className="font-semibold">
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
                    {transaction.date}
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
                    {transaction.type === "Income" ? "+" : "-"}Rp
                    {transaction.amount.toLocaleString("id-ID")}
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