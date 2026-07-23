type FinanceChartProps = {
  income: number;
  expense: number;
};

export default function FinanceChart({
  income,
  expense,
}: FinanceChartProps) {

  const max = Math.max(income, expense, 1);

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
      <h2 className="mb-6 text-xl font-bold">
        Finance Overview
      </h2>

      {/* Income */}

      <div className="mb-6">

        <div className="mb-2 flex justify-between">

          <span>Income</span>

          <span>
            Rp{income.toLocaleString("id-ID")}
          </span>

        </div>

        <div className="h-4 rounded-full bg-neutral-800">

          <div
            className="
                h-4 
                rounded-full 
                bg-green-500 
                transition-all
                duration-700
                "
                style={{
              width: `${(income / max) * 100}%`,
            }}
                />

            </div>

        </div>

      {/* Expense */}

      <div>

        <div className="mb-2 flex justify-between">

          <span>Expense</span>

          <span>
            Rp{expense.toLocaleString("id-ID")}
          </span>

        </div>

        <div className="h-4 rounded-full bg-neutral-800">

          <div
            className="
                h-4 
                rounded-full 
                bg-red-500 
                transition-all
                duration-700"
            style={{
              width: `${(expense / max) * 100}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}