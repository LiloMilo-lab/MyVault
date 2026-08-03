import { AllocationItem } from "./calculateAllocation";

export function calculateRecommendation(
  allocation: AllocationItem[]
) {

  if (allocation.length === 0) {

    return {
      status: "Empty",
      message: "No assets found.",
    };

  }

  const largest =
    allocation.reduce(
      (largest, current) =>
        current.percentage >
        largest.percentage
          ? current
          : largest
    );

  if (largest.percentage >= 70) {

    return {

      status: "Warning",

      message:
        `${largest.type} dominates your portfolio (${largest.percentage.toFixed(1)}%). Consider adding other asset types.`

    };

  }

  if (largest.percentage >= 50) {

    return {

      status: "Balanced",

      message:
        "Portfolio is fairly balanced but could still be improved."

    };

  }

  return {

    status: "Excellent",

    message:
      "Portfolio is well diversified. Keep maintaining this allocation."

  };

}