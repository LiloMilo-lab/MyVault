import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Transaction } from "@/types/transaction";

export function exportTransactionsPDF(
  transactions: Transaction[]
) {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("MyVault Transaction Report", 14, 20);

  doc.setFontSize(11);
  doc.text(
    `Generated: ${new Date().toLocaleString("id-ID")}`,
    14,
    28
  );

  autoTable(doc, {
    startY: 36,

    head: [[
      "Date",
      "Category",
      "Account",
      "Currency",
      "Type",
      "Amount",
    ]],

    body: transactions.map((t) => [
      t.date,
      t.category,
      t.account,
      t.currency,
      t.type,
      t.amount.toLocaleString("id-ID"),
    ]),
  });

  doc.save("transactions.pdf");
}