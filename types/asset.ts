export type Asset = {
  id: string;

  name: string;

  category:
    | "Cash"
    | "Gold"
    | "Stock"
    | "Crypto"
    | "Mutual Fund"
    | "Foreign Currency"
    | "Property"
    | "Vehicle"
    | "Other";

  value: number;

  notes: string;

  createdAt: string;
};