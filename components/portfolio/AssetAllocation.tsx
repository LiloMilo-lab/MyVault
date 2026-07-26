import { Asset } from "@/hooks/useAssets";

type AssetAllocationProps = {
  assets: Asset[];
};

export default function AssetAllocation({
  assets,
}: AssetAllocationProps) {  

  const totalValue = assets.reduce(
    (sum, asset) => sum + asset.value,
    0
  );

  if (assets.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-neutral-800
          bg-neutral-900
          p-6
        "
      >
        <h2 className="mb-6 text-xl font-bold">
          Asset Allocation
        </h2>

        <div className="py-10 text-center text-neutral-500">
          No assets yet.
        </div>
      </div>
    );
  }

  const colors: Record<string, string> = {
    Gold: "bg-yellow-500",
    Crypto: "bg-orange-500",
    Stock: "bg-emerald-500",
    Cash: "bg-blue-500",
  };

  const icons: Record<string, string> = {
    Gold: "🥇",
    Crypto: "₿",
    Stock: "📈",
    Cash: "💵",
  };

  return (
    <div
      className="
        rounded-2xl
        border
        border-neutral-800
        bg-neutral-900
        p-6
        transition-all
        duration-300
        hover:border-neutral-700
        hover:-translate-y-1
      "
    >
      <h2 className="mb-6 text-xl font-bold">
        Asset Allocation
      </h2>

      <div className="space-y-5">

        {assets.map((asset) => {

          const percentage =
            totalValue === 0
              ? 0
              : (asset.value / totalValue) * 100;

          return (

            <div key={asset.id}>

              <div className="mb-2 flex justify-between">

                <span>
                  {icons[asset.type] ?? "📦"} {asset.name}
                </span>

                <span>
                  {percentage.toFixed(1)}%
                </span>

              </div>

              <div className="h-3 rounded-full bg-neutral-800">

                <div
                  className={`h-3 rounded-full ${
                    colors[asset.type] ?? "bg-neutral-500"
                  }`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}