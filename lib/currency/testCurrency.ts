import { convertCurrency } from "./convertCurrency";
import { DEFAULT_EXCHANGE_RATES } from "./defaultExchangeRates";

console.log(
  "100 SGD → IDR:",
  convertCurrency(
    100,
    "SGD",
    "IDR",
    DEFAULT_EXCHANGE_RATES
  )
);

console.log(
  "100 USD → IDR:",
  convertCurrency(
    100,
    "USD",
    "IDR",
    DEFAULT_EXCHANGE_RATES
  )
);

console.log(
  "100000 IDR → SGD:",
  convertCurrency(
    100000,
    "IDR",
    "SGD",
    DEFAULT_EXCHANGE_RATES
  )
);