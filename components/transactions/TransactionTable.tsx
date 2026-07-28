import { Transaction } from "@/types/transaction";
import {
  Pencil,
  Trash2,
} from "lucide-react";

type TransactionTableProps = {
  transactions: Transaction[];

  editTransaction: (id: number) => void;

  deleteTransaction: (id: number) => void;
};

export default function TransactionTable({
  transactions,
  editTransaction,
  deleteTransaction,
}: TransactionTableProps) {

    if (transactions.length === 0) {
        return (
            <div
            className="
                rounded-2xl
                border
                border-neutral-800
                bg-neutral-900
                p-8
                text-center
                text-neutral-500
            "
            >
                No transactions found.
            </div>
        );
    }

    return (
        <div
        className="
            rounded-2xl
            border
            border-neutral-800
            bg-neutral-900
            overflow-hidden
        "
        >
            <table className="w-full">
                <thead className="bg-neutral-800">
                    <tr>
                        <th className="p-4 text-left">
                            Date
                        </th>

                        <th className="p-4 text-left">
                            Category
                        </th>

                        <th className="p-4 text-left">
                            Account
                        </th>

                        <th className="p-4 text-left">
                            Currency
                        </th>

                        <th className="p-4 text-left">
                            Type
                        </th>

                        <th className="p-4 text-right">
                            Amount
                        </th>

                        <th className="p-4 text-center">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map((transaction) => (
                        <tr
                            key={transaction.id}
                            className="
                                border-t
                                border-neutral-800
                                hover:bg-neutral-800/50
                                transition
                            "
                        >
                            <td className="p-4">
                                {transaction.date}
                            </td>

                            <td className="p-4">
                                {transaction.category}
                            </td>

                            <td className="p-4">
                                {transaction.account}
                            </td>

                            <td className="p-4">
                                {transaction.currency}
                            </td>

                            <td className="p-4">
                                {transaction.type}
                            </td>

                            <td
                                className={`
                                    p-4
                                    text-right
                                    font-bold
                                    ${
                                    transaction.type === "Income"
                                        ? "text-green-400"
                                        : "text-red-400"
                                    }
                                `}
                                >
                                {transaction.currency}
                                {" "}
                                {transaction.amount.toLocaleString()}
                            </td>

                            <td className="p-4">
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={() =>
                                            editTransaction(transaction.id)
                                        }
                                        className="text-blue-400 transition hover:text-blue-300"
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteTransaction(transaction.id)
                                        }
                                        className="text-red-400 transition hover:text-red-300"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}