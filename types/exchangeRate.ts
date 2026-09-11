import { CurrencyCode } from "./currency";

export type ExchangeRate = {
  from: CurrencyCode;
  to: CurrencyCode;
  rate: number;
  updatedAt: string;
};