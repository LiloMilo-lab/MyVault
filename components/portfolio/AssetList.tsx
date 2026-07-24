import { Asset } from "@/hooks/useAssets";
import { Coins } from "lucide-react";

type AssetListProps = {
  assets: Asset[];
};

export default function AssetList({
  assets,
}: AssetListProps) {
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
            Assets
        </h2>

            <div className="space-y-4">

                {assets.map((asset, index) => (

                    <div
                        key={index}
                        className="flex items-center justify-between rounded-xl bg-neutral-800 p-4"
                    >

                        <div className="flex items-center gap-3">

                            <Coins className="h-6 w-6 text-yellow-400"/>

                            <div>

                                <h3 className="font-semibold">
                                    {asset.name}
                                </h3>

                                <p className="text-sm text-neutral-500">
                                    {asset.type}
                                </p>

                            </div>

                        </div>

                        <p className="font-bold text-yellow-400">
                            Rp{asset.value.toLocaleString("id-ID")}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}