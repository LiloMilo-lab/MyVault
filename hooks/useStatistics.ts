import { Transaction } from "@/types/transaction";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import { convertToIDR } from "@/lib/currency/convertToIDR";

export function useStatistics(
  transactions: Transaction[]
) {
  const startingCash = 2300000;

  const { rates } = useExchangeRates();

  const totalIncome =
    transactions
      .filter((t) => t.type === "Income")
      .reduce(
        (sum, t) =>
          sum + convertToIDR(
            t.amount,
            t.currency,
            rates
          ),
        0
      );

  const totalExpense =
    transactions
      .filter((t) => t.type === "Expense")
      .reduce(
        (sum, t) =>
          sum + convertToIDR(
            t.amount,
            t.currency,
            rates
          ),
        0
      );

  const cash =
    startingCash +
    transactions.reduce(
      (total, transaction) => {
        const amountInIDR = convertToIDR(
          transaction.amount,
          transaction.currency,
          rates
        );

        return transaction.type === "Income"
          ? total + amountInIDR
          : total - amountInIDR;
      },
      0
    );

  const totalTransactions =
    transactions.length;

  const incomeCount =
    transactions.filter(
      (t) => t.type === "Income"
    ).length;

  const expenseCount =
    transactions.filter(
      (t) => t.type === "Expense"
    ).length;

  const highestIncome =
    transactions
      .filter((t) => t.type === "Income")
      .reduce(
        (max, t) =>
          Math.max(
            max,
            convertToIDR(
              t.amount,
              t.currency,
              rates
            )
          ),
        0
      );

  const highestExpense =
    transactions
      .filter((t) => t.type === "Expense")
      .reduce(
        (max, t) =>
          Math.max(
            max,
            convertToIDR(
              t.amount,
              t.currency,
              rates
            )
          ),
        0
      );

  return {
    cash,
    totalIncome,
    totalExpense,
    totalTransactions,
    incomeCount,
    expenseCount,
    highestIncome,
    highestExpense,
  };
}