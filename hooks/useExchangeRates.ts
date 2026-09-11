import { useEffect, useState } from "react";
import { DEFAULT_EXCHANGE_RATES } from "@/lib/currency/defaultExchangeRates";

const CACHE_KEY = "exchangeRates";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

type CachedExchangeRates = {
  rates: Record<string, number>;
  updatedAt: string;
};

type ExchangeRateStatus =
  | "loading"
  | "live"
  | "cached"
  | "fallback";

export function useExchangeRates() {
  const [rates, setRates] = useState<Record<string, number>>(
    DEFAULT_EXCHANGE_RATES
  );

  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const [status, setStatus] =
    useState<ExchangeRateStatus>("loading");

  useEffect(() => {
    const loadRates = async () => {
      let cached: CachedExchangeRates | null = null;

      const stored = localStorage.getItem(CACHE_KEY);

      if (stored) {
        try {
          cached = JSON.parse(stored) as CachedExchangeRates;

          if (cached?.rates) {
            setRates(cached.rates);
            setUpdatedAt(cached.updatedAt);

            const cacheAge =
              Date.now() -
              new Date(cached.updatedAt).getTime();

            if (cacheAge < CACHE_DURATION) {
              setStatus("cached");
              return;
            }
          }
        } catch {
          cached = null;
        }
      }

      try {
        const response = await fetch(
          "https://api.frankfurter.dev/v2/rates?base=IDR&quotes=USD,SGD,MYR,EUR,JPY,GBP"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }

        const data = await response.json();

        const liveRates: Record<string, number> = {
            IDR_IDR: 1,
        };

        if (Array.isArray(data)) {
            data.forEach(
                (item: {
                    base: string;
                    quote: string;
                    rate: number;
                }) => {
                    if (item.base !== "IDR") return;

                    const numericRate = Number(item.rate);

                    if (
                        !Number.isFinite(numericRate) ||
                        numericRate <= 0
                    ) {
                        return;
                    }

                    liveRates[`IDR_${item.quote}`] = numericRate;
                    liveRates[`${item.quote}_IDR`] = 1 / numericRate;
                }
            );
        }

        const now = new Date().toISOString();

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            rates: liveRates,
            updatedAt: now,
          })
        );

        setRates(liveRates);
        setUpdatedAt(now);
        setStatus("live");
      } catch {
        if (cached?.rates) {
          setRates(cached.rates);
          setUpdatedAt(cached.updatedAt);
          setStatus("cached");
        } else {
          setRates(DEFAULT_EXCHANGE_RATES);
          setUpdatedAt(null);
          setStatus("fallback");
        }
      }
    };

    loadRates();
  }, []);

  return {
    rates,
    updatedAt,
    status,
  };
}