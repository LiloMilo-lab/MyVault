import { Transaction } from "@/types/transaction";
import { PieChart } from "lucide-react";

import { calculateExpenseByCategory } from "@/lib/analytics/calculateExpenseByCategory";
import { formatCurrency } from "@/lib/format";

type CategoryBreakdownProps = {
  transactions: Transaction[];
};

export default function CategoryBreakdown({
    transactions,
}: CategoryBreakdownProps) {

    const data =
        calculateExpenseByCategory(
            transactions
        );
    if (data.length === 0) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-neutral-800
                bg-neutral-900
                p-6
                transition-all
                duration-300
                hover:border-neutral-700
                hover:-translate-y-1
            "
        >
            <div className="mb-6 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-yellow-400" />

                <h2 className="text-xl font-bold">
                    Category Breakdown
                </h2>
            </div>

            <div className="py-16 text-center">

                <div className="text-6xl">
                    📊
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                    No Expense Data
                </h3>

                <p className="mt-2 text-neutral-500">
                    Category statistics will appear here.
                </p>

            </div>

        </div>
    );
    }

    const max = Math.max(
        ...data.map(
            (item) => item.amount
        ),
        1
    );

    return (
        <div
            className="
                h-full
                rounded-2xl
                border
                border-neutral-800
                bg-neutral-900
                p-6
                transition-all
                duration-300
                hover:border-neutral-700
                hover:-translate-y-1
            "
        >    
        <div className="mb-6 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-yellow-400" />

            <h2 className="text-xl font-bold">
                Category Breakdown
            </h2>
        </div>

            <div className="space-y-5">

                {data.map((item) => (
                    <div key={item.category}>
                        <div className="mb-2 flex justify-between">
                            <span className="font-medium">
                                {item.category}
                            </span>

                            <span className="text-neutral-400">
                                {formatCurrency(item.amount)}
                            </span>
                        </div>

                        <div className="h-3 rounded-full bg-neutral-800">
                            <div
                                className="
                                    h-3
                                    rounded-full
                                    bg-emerald-500
                                    transition-all
                                    duration-500
                                    hover:brightness-110
                                "
                                style={{
                                    width: `${(item.amount / max) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );

}