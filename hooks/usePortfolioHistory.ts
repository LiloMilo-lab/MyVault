import { useEffect, useState } from "react";

export type PortfolioHistory = {
  date: string;
  value: number;
};

export function usePortfolioHistory(
  totalAssetValue: number
) {
    const [history, setHistory] =
        useState<PortfolioHistory[]>([]);

    const [loaded, setLoaded] =
        useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "portfolio-history"
      );

    if (saved) {
        setHistory(JSON.parse(saved));
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (totalAssetValue === 0) return;

    const today = new Date()
      .toISOString()
      .split("T")[0];

    setHistory((prev) => {
      const last =
        prev[prev.length - 1];

      if (
        last &&
        last.date === today
      ) {
        const updated = [
          ...prev.slice(0, -1),
          {
            date: today,
            value: totalAssetValue,
          },
        ];

        localStorage.setItem(
          "portfolio-history",
          JSON.stringify(updated)
        );

        return updated;
      }

      const updated = [
        ...prev,
        {
          date: today,
          value: totalAssetValue,
        },
      ];

      localStorage.setItem(
        "portfolio-history",
        JSON.stringify(updated)
      );

      return updated;
    });
  }, [loaded, totalAssetValue]);

  return history;
}