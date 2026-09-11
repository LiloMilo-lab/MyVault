import { CurrencyCode } from "./currency";

export type Transaction = {
  id: number;
  amount: number;
  category: string;
  type: "Income" | "Expense";
  date: string;
  notes: string;
  account: string;
  currency: CurrencyCode;
};