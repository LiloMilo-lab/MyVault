import { Asset } from "@/hooks/useAssets";

export function calculateAssetTypes(
  assets: Asset[]
) {
  return new Set(
    assets.map((asset) => asset.type)
  ).size;
}