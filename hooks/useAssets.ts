import { useState, useEffect } from "react";

export type Asset = {
  id: number;
  name: string;
  type: string;
  value: number;
  notes?: string;
}

export function useAssets() {

  const [assets, setAssets] = useState<Asset[]>([]);
  const [mounted, setMounted] = useState(false);

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

    setMounted(true);

  }, []);

  useEffect(() => {

    if (!mounted) return;

    localStorage.setItem(
      "assets",
      JSON.stringify(assets)
    );
  }, [assets, mounted]);

  const totalAssetValue =
    assets.reduce(
      (sum, asset) => sum + asset.value,
      0
    );

  return {
    assets,
    setAssets,
    totalAssetValue,
  };

}