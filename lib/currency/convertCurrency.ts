import { CurrencyCode } from "@/types/currency";

export function convertCurrency(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
  rates: Record<string, number>
): number {
  const numericAmount = Number(amount) || 0;

  if (from === to) {
    return numericAmount;
  }

  const directKey = `${from}_${to}`;
  const inverseKey = `${to}_${from}`;

  if (rates[directKey] !== undefined) {
    return numericAmount * rates[directKey];
  }

  if (rates[inverseKey] !== undefined) {
    return numericAmount / rates[inverseKey];
  }

  return 0;
}