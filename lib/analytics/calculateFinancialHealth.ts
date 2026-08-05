export function calculateFinancialHealth(
  savingRate: number
) {
  if (savingRate >= 40) {
    return {
      score: 100,
      label: "Excellent",
    };
  }

  if (savingRate >= 25) {
    return {
      score: 80,
      label: "Good",
    };
  }

  if (savingRate >= 10) {
    return {
      score: 60,
      label: "Fair",
    };
  }

  return {
    score: 30,
    label: "Poor",
  };
}