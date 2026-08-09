import { Transaction } from "@/types/transaction";
import { Account } from "@/types/account";

export function calculateAccountBalances(
  accounts: Account[],
  transactions: Transaction[]
): Account[] {
  return accounts.map((account) => {
    let balance = 0;

    transactions.forEach((transaction) => {
      if (transaction.account !== account.name) return;

      if (transaction.type === "Income") {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    });

    return {
      ...account,
      balance,
    };
  });
}