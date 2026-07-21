export type Transaction = {
  amount: number;
  category: string;
  type: "Income" | "Expense";
};