import { CurrencyCode } from "@/types/currency";
import { convertCurrency } from "./convertCurrency";
import { DEFAULT_EXCHANGE_RATES } from "./defaultExchangeRates";

export function convertToIDR(
  amount: number,
  currency: CurrencyCode,
  rates: Record<string, number> = DEFAULT_EXCHANGE_RATES
): number {
  return convertCurrency(
    amount,
    currency,
    "IDR",
    rates
  );
}