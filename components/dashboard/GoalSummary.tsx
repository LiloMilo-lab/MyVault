import { Goal } from "@/types/goal";
import { formatCurrency } from "@/lib/format";

type GoalSummaryProps = {
  goals: Goal[];
};

export default function GoalSummary({
  goals,
}: GoalSummaryProps) {

    const totalTarget =
    goals.reduce(
      (total, goal) => {
        const target =
          Number(goal.targetAmount);

        return (
          total +
          (Number.isFinite(target)
            ? target
            : 0)
        );
      },
      0
    );

  const totalSaved =
    goals.reduce(
      (total, goal) => {
        const current =
          Number(goal.currentAmount);

        return (
          total +
          (Number.isFinite(current)
            ? current
            : 0)
        );
      },
      0
    );

  const completedGoals =
    goals.filter((goal) => {
      const target =
        Number(goal.targetAmount);

      const current =
        Number(goal.currentAmount);

      return (
        Number.isFinite(target) &&
        Number.isFinite(current) &&
        target > 0 &&
        current >= target
      );
    }).length;

  const overallProgress =
    totalTarget > 0
      ? (totalSaved / totalTarget) * 100
      : 0;

  return (
    <div
      className="
        rounded-2xl
        border
        border-neutral-800
        bg-neutral-900
        p-6
      "
    >
      <h2 className="text-xl font-bold">
        🎯 Goals Overview
      </h2>

      <div className="mt-5 space-y-5">

        <div>

          <div className="flex justify-between text-sm">

            <span className="text-neutral-500">
              Overall Progress
            </span>

            <span>
              {overallProgress.toFixed(1)}%
            </span>

          </div>

          <div
            className="
              mt-2
              h-3
              overflow-hidden
              rounded-full
              bg-neutral-800
            "
          >
            <div
              className="
                h-full
                bg-emerald-500
                transition-all
              "
                style={{
                    width: `${Math.min(
                        Math.max(overallProgress, 0),
                        100
                    )}%`,
                }}
            />
          </div>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-neutral-500">
              Total Saved
            </p>

            <p className="mt-1 font-bold">
              {formatCurrency(totalSaved)}
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">
              Total Target
            </p>

            <p className="mt-1 font-bold">
              {formatCurrency(totalTarget)}
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">
              Active Goals
            </p>

            <p className="mt-1 font-bold">
              {goals.length}
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">
              Completed
            </p>

            <p className="mt-1 font-bold text-emerald-400">
              {completedGoals}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}