import { Goal } from "@/types/goal";

export function calculateGoalsSummary(
  goals: Goal[]
) {
  const normalizedGoals = goals.map((goal) => ({
    ...goal,
    targetAmount: Number(goal.targetAmount) || 0,
    currentAmount: Number(goal.currentAmount) || 0,
  }));

  const totalGoals =
    normalizedGoals.length;

  const totalTarget =
    normalizedGoals.reduce(
      (total, goal) =>
        total + goal.targetAmount,
      0
    );

  const totalSaved =
    normalizedGoals.reduce(
      (total, goal) =>
        total + goal.currentAmount,
      0
    );

  const completedGoals =
    normalizedGoals.filter(
      (goal) =>
        goal.targetAmount > 0 &&
        goal.currentAmount >= goal.targetAmount
    ).length;

  const progress =
    totalTarget > 0
      ? (totalSaved / totalTarget) * 100
      : 0;

  return {
    totalGoals,
    totalTarget,
    totalSaved,
    completedGoals,
    progress: Number.isFinite(progress)
      ? progress
      : 0,
  };
}