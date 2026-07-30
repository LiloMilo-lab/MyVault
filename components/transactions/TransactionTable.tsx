import { Transaction } from "@/types/transaction";
import {
  Pencil,
  Trash2,
} from "lucide-react";

type TransactionTableProps = {
    transactions: Transaction[];

    editTransaction: (id: number) => void;

    deleteTransaction: (id: number) => void;

    selectedTransactions: number[];

    setSelectedTransactions: React.Dispatch<
    React.SetStateAction<number[]>
    >;
};

export default function TransactionTable({
    transactions,
    editTransaction,
    deleteTransaction,
    selectedTransactions,
    setSelectedTransactions,
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
        >   <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className=" sticky top-0 bg-neutral-800 z-10">
                        <tr>
                            <th className="w-12 p-4">

                                <input
                                    type="checkbox"
                                    checked={
                                    transactions.length > 0 &&
                                    selectedTransactions.length === transactions.length
                                    }
                                    onChange={() => {

                                    if (
                                        selectedTransactions.length ===
                                        transactions.length
                                    ) {

                                        setSelectedTransactions([]);

                                    } else {

                                        setSelectedTransactions(
                                        transactions.map(
                                            transaction => transaction.id
                                        )
                                        );

                                    }

                                    }}
                                />

                            </th>

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
                                className={`
                                    border-t
                                    border-neutral-800
                                    transition
                                    hover:bg-neutral-700/60
                                    ${
                                        transaction.id % 2 === 0
                                            ? "bg-neutral=900"
                                            : "bg-neutral-950"
                                    }
                                `}
                            >
                                <td className="p-4">

                                    <input
                                        type="checkbox"
                                        checked={selectedTransactions.includes(
                                        transaction.id
                                        )}
                                        onChange={() => {

                                        if (
                                            selectedTransactions.includes(
                                            transaction.id
                                            )
                                        ) {

                                            setSelectedTransactions(
                                            selectedTransactions.filter(
                                                id => id !== transaction.id
                                            )
                                            );

                                        } else {

                                            setSelectedTransactions([
                                            ...selectedTransactions,
                                            transaction.id,
                                            ]);

                                        }

                                        }}
                                    />

                                </td>

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
                                    <span
                                        className={`
                                            rounded-full
                                            px-3
                                            py-1
                                            text-xs
                                            font-semibold
                                            ${
                                                transaction.type === "Income"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-red-500/20 text-red-400"
                                            }
                                        `}
                                    >
                                        {transaction.type}
                                    </span>
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
        </div>
    );

}