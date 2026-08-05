import { CalendarDays } from "lucide-react";

import { calculateCashFlow } from "@/lib/analytics/calculateCashFlow";
import { calculateSavingRate } from "@/lib/analytics/calculateSavingRate";
import { formatCurrency } from "@/lib/format";

type MonthlySummaryProps = {
  income: number;
  expense: number;
};

export default function MonthlySummary({
  income,
  expense,
}: MonthlySummaryProps) {

const saving =
  calculateCashFlow(
    income,
    expense
  );

const savingRate =
  calculateSavingRate(
    income,
    expense
  );
    
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
                <CalendarDays className="h-5 w-5 text-blue-400" />

                <h2 className="text-xl font-bold">
                    Monthly Summary
                </h2>
            </div>

            <div className="space-y-4">

                <div className="flex justify-between">

                    <span>Income</span>

                    <span className="text-green-400 font-semibold">
                        {formatCurrency(income)}
                    </span>

                </div>

                <div className="flex justify-between">

                    <span>Expense</span>

                    <span className="text-red-400 font-semibold">
                        {formatCurrency(expense)}
                    </span>

                </div>

                <div className="flex justify-between">

                    <span>Saving</span>

                    <span
                        className={`font-bold ${
                            saving >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                    >
                        {formatCurrency(saving)}
                    </span>

                </div>

                <div className="mt-8">

                    <div className="mb-2 flex justify-between">

                        <span>Saving Rate</span>

                        <span>
                            {savingRate.toFixed(1)}%
                        </span>

                    </div>

                    <div className="h-3 rounded-full bg-neutral-800">

                        <div
                        className="h-3 rounded-full bg-emerald-500 transition-all"
                            style={{
                                width: `${Math.min(
                                    Math.max(savingRate, 0),
                                    100
                                )}%`,
                            }}
                        />

                    </div>

                </div>

            </div>
        </div>
    );

}