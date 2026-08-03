import { Asset } from "@/hooks/useAssets";

export function calculateLargestAsset(
  assets: Asset[]
) {
  if (assets.length === 0) {
    return null;
  }

  return assets.reduce((largest, current) =>
    current.value > largest.value
      ? current
      : largest
  );
}