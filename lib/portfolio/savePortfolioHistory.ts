export function savePortfolioHistory(
  value: number
) {
  const saved =
    localStorage.getItem(
      "portfolioHistory"
    );

  const history = saved
    ? JSON.parse(saved)
    : [];

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const todayIndex =
    history.findIndex(
      (item: any) =>
        item.date === today
    );

  if (todayIndex >= 0) {

    history[todayIndex].value = value;

  } else {

    history.push({
      date: today,
      value,
    });

  }

  localStorage.setItem(
    "portfolioHistory",
    JSON.stringify(history)
  );
}