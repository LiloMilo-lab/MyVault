import { Transaction } from "@/types/transaction";
import { convertToIDR } from "@/lib/currency/convertToIDR";

export function convertTransactionsToIDR(
  transactions: Transaction[],
  rates: Record<string, number>
): Transaction[] {
  return transactions.map((transaction) => ({
    ...transaction,
    amount: convertToIDR(
      transaction.amount,
      transaction.currency,
      rates
    ),
    currency: "IDR",
  }));
}