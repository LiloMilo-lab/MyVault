type TransactionListProps = {
  transactions: number[];
};

export default function TransactionList({
  transactions,
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
              className="rounded-lg bg-neutral-800 p-3"
            >
              + Rp{transaction.toLocaleString("id-ID")}
            </div>

          ))}

        </div>
      )}

    </div>
  );
}