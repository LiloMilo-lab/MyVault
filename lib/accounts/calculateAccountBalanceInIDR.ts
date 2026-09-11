import { Account } from "@/types/account";
import { convertToIDR } from "@/lib/currency/convertToIDR";
import { DEFAULT_EXCHANGE_RATES } from "@/lib/currency/defaultExchangeRates";

export function calculateAccountBalanceInIDR(
  account: Account,
  rates: Record<string, number> = DEFAULT_EXCHANGE_RATES
): number {
  return convertToIDR(
    account.balance,
    account.currency,
    rates
  );
}