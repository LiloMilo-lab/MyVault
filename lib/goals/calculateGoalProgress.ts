import { Goal } from "@/types/goal";

export function calculateGoalProgress(
  goal: Goal
) {
  const targetAmount =
    Number(goal.targetAmount) || 0;

  const currentAmount =
    Number(goal.currentAmount) || 0;

  const percentage =
    targetAmount > 0
      ? (currentAmount / targetAmount) * 100
      : 0;

  const remaining =
    targetAmount - currentAmount;

  return {
    percentage: Number.isFinite(percentage)
      ? percentage
      : 0,
    remaining: Number.isFinite(remaining)
      ? remaining
      : 0,
  };
}