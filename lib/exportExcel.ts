import * as XLSX from "xlsx";
import { Transaction } from "@/types/transaction";

export function exportTransactionsExcel(
  transactions: Transaction[]
) {
  const data = transactions.map((t) => ({
    Date: t.date,
    Category: t.category,
    Account: t.account,
    Currency: t.currency,
    Type: t.type,
    Amount: t.amount,
    Notes: t.notes ?? "",
  }));

  const worksheet =
    XLSX.utils.json_to_sheet(data);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Transactions"
  );

  XLSX.writeFile(
    workbook,
    "transactions.xlsx"
  );
}