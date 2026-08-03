import { Asset } from "@/hooks/useAssets";

export function calculateNetWorth(
  assets: Asset[]
) {

  return assets.reduce(

    (total, asset) => total + asset.value,

    0

  );

}