export function calculateInsight(
  savingRate: number,
  largestExpense: string
) {
  if (savingRate >= 30) {
    return {
      status: "Excellent",
      message:
        "Great job! Your saving rate is excellent. Keep investing consistently.",
    };
  }

  if (savingRate >= 15) {
    return {
      status: "Good",
      message:
        "You're saving regularly, but there is still room to improve.",
    };
  }

  return {
    status: "Warning",
    message: `Your biggest expense is ${largestExpense}. Try reducing spending in this category.`,
  };
}