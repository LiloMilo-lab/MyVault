import { Asset } from "@/hooks/useAssets";

export function calculateAverageAsset(
  assets: Asset[]
) {
  if (assets.length === 0) {
    return 0;
  }

  const total = assets.reduce(
    (sum, asset) => sum + asset.value,
    0
  );

  return total / assets.length;
}