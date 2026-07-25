export type Transaction = {
  id: number;
  amount: number;
  category: string;
  type: "Income" | "Expense";
  date: string;
};