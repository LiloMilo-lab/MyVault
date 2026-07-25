import { useState, useEffect } from "react";

export type Asset = {
  id: number;
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
            id: 1,
            name: "Gold",
            type: "Gold",
            value: 250000,
          },
        ]);

      }

    } else {

      setAssets([
        {
          id:1,
          name: "Gold",
          type: "Gold",
          value: 250000,
        },
      ]);

    }

  }, []);

  useEffect(() => {

      localStorage.setItem(
        "assets",
        JSON.stringify(assets)
      );

  }, [assets]);

  return {
    assets,
    setAssets,
  };

}