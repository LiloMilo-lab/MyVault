export function getGoalStatus(
  percentage: number
) {
  if (percentage >= 100) {
    return {
      label: "Completed",
      color: "text-emerald-400",
      progressColor: "bg-emerald-500",
    };
  }

  if (percentage >= 75) {
    return {
      label: "Almost There",
      color: "text-blue-400",
      progressColor: "bg-blue-500",
    };
  }

  return {
    label: "In Progress",
    color: "text-yellow-400",
    progressColor: "bg-yellow-500",
  };
}