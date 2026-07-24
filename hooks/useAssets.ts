import { useState } from "react";

export type Asset = {
  name: string;
  type: string;
  value: number;
};

export function useAssets() {

  const [assets, setAssets] = useState<Asset[]>([
        {
            name: "Gold",
            type: "Precious Metal",
            value: 250000,
        },
        {
            name: "Bitcoin",
            type: "Crypto",
            value: 700000,
        }
    ]);

  return {
    assets,
    setAssets,
  };
}