import { Transaction } from "@/types/transaction";
import { Account } from "@/types/account";
import { CurrencyCode } from "@/types/currency";
import { convertCurrency } from "@/lib/currency/convertCurrency";
import { DEFAULT_EXCHANGE_RATES } from "@/lib/currency/defaultExchangeRates";

export function calculateAccountBalances(
  accounts: Account[],
  transactions: Transaction[],
  rates: Record<string, number> = DEFAULT_EXCHANGE_RATES
): Account[] {
  return accounts.map((account) => {
    let balance = 0;

    transactions.forEach((transaction) => {
      if (transaction.account !== account.name) return;

      const transactionAmount = convertCurrency(
        transaction.amount,
        transaction.currency as CurrencyCode,
        account.currency,
        rates
      );

      if (transaction.type === "Income") {
        balance += transactionAmount;
      } else {
        balance -= transactionAmount;
      }
    });

    return {
      ...account,
      balance,
    };
  });
}