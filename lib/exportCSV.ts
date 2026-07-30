import { saveAs } from "file-saver";
import { Transaction } from "@/types/transaction";

export function exportTransactionsCSV(
  transactions: Transaction[]
) {
  const headers = [
    "Date",
    "Category",
    "Account",
    "Currency",
    "Type",
    "Amount",
    "Notes",
  ];

  const rows = transactions.map((t) => [
    t.date,
    t.category,
    t.account,
    t.currency,
    t.type,
    t.amount,
    t.notes ?? "",
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "transactions.csv");
}