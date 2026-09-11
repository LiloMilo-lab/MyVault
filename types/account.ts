import { CurrencyCode } from "./currency";

export type AccountType =
  | "Cash"
  | "Bank"
  | "E-Wallet"
  | "Crypto"
  | "Investment";

export type Account = {
  id: number;
  name: string;
  type: AccountType;
  balance: number;
  currency: CurrencyCode;
  color: string;
};