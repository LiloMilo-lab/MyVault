export function getBudgetStatus(
  percentage: number
) {
  if (percentage >= 100) {
    return {
      label: "Exceeded",
      color: "text-red-400",
      progressColor: "bg-red-500",
    };
  }

  if (percentage >= 80) {
    return {
      label: "Warning",
      color: "text-yellow-400",
      progressColor: "bg-yellow-500",
    };
  }

  return {
    label: "Safe",
    color: "text-emerald-400",
    progressColor: "bg-emerald-500",
  };
}