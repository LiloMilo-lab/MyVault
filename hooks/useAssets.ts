import { useState, useEffect } from "react";

export type Asset = {
  name: string;
  type: string;
  value: number;
};

export function useAssets() {

  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {

    const saved = localStorage.getItem("assets");

    if (saved) {

      const parsed: Asset[] = JSON.parse(saved);

      if (parsed.length > 0) {

        setAssets(parsed);

      } else {

        setAssets([
          {
            name: "Gold",
            type: "Gold",
            value: 250000,
          },
        ]);

      }

    } else {

      setAssets([
        {
          name: "Gold",
          type: "Gold",
          value: 250000,
        },
      ]);

    }

  }, []);

  useEffect(() => {

    if (assets.length > 0) {
      localStorage.setItem(
        "assets",
        JSON.stringify(assets)
      );
    }

  }, [assets]);

  return {
    assets,
    setAssets,
  };

}