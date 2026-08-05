import { Transaction } from "@/types/transaction";

export function calculateTransactionTrend(
  transactions: Transaction[]
) {
  const grouped: Record<
    string,
    {
      income: number;
      expense: number;
    }
  > = {};

  transactions.forEach((transaction) => {
    const date = transaction.date;

    if (!grouped[date]) {
      grouped[date] = {
        income: 0,
        expense: 0,
      };
    }

    if (transaction.type === "Income") {
      grouped[date].income += transaction.amount;
    } else {
      grouped[date].expense += transaction.amount;
    }
  });

  return Object.entries(grouped)
    .map(([date, values]) => ({
      date,
      income: values.income,
      expense: values.expense,
    }))
    .sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );
}