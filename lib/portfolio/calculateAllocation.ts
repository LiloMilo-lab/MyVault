import { Asset } from "@/hooks/useAssets";

export type AllocationItem = {
  type: string;
  value: number;
  percentage: number;
};

export function calculateAllocation(
  assets: Asset[]
): AllocationItem[] {

  const total = assets.reduce(
    (sum, asset) => sum + asset.value,
    0
  );

  const grouped = assets.reduce(
    (acc, asset) => {

      acc[asset.type] =
        (acc[asset.type] || 0) +
        asset.value;

      return acc;

    },
    {} as Record<string, number>
  );

  return Object.entries(grouped).map(
    ([type, value]) => ({

      type,

      value,

      percentage:
        total === 0
          ? 0
          : (value / total) * 100,

    })
  );

}