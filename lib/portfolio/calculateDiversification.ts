import { AllocationItem } from "./calculateAllocation";

export function calculateDiversification(
  allocation: AllocationItem[]
) {

  if (allocation.length === 0) {
    return 0;
  }

  const largestAllocation =
    Math.max(
      ...allocation.map(
        (item) => item.percentage
      )
    );

  const score =
    100 - largestAllocation;

  return Math.max(
    Math.round(score),
    0
  );

}