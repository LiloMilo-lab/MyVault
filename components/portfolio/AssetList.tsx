import { Asset } from "@/hooks/useAssets";
import {
  Coins,
  Bitcoin,
  Landmark,
  TrendingUp,
  Wallet,
  Pencil,
  Trash2,
} from "lucide-react";

const assetIcons = {
  Gold: Coins,
  Crypto: Bitcoin,
  Stock: TrendingUp,
  Cash: Wallet,
  Bank: Landmark,
};

type AssetListProps = {
  assets: Asset[];
  totalValue: number;
  deleteAsset: (id: number) => void;
  editAsset: (id: number) => void;
};

export default function AssetList({
  assets,
  totalValue,
  deleteAsset,
  editAsset,
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

                {assets.length === 0 ? (

                    <div className="py-12 text-center text-neutral-500">
                    No assets found.
                    </div>

                ) : (

                    assets.map((asset, index) => (

                    <div
                        key={asset.id}
                        className="flex items-center justify-between rounded-xl bg-neutral-800 p-4"
                    >

                        <div className="flex items-center gap-3">

                        {(() => {

                            const Icon =
                            assetIcons[
                                asset.type as keyof typeof assetIcons
                            ] || Coins;

                            return (
                            <Icon
                                className="h-6 w-6 text-yellow-400"
                            />
                            );

                        })()}
                        <div>

                            <h3 className="font-semibold">
                            {asset.name}
                            </h3>

                            <p className="text-sm text-neutral-500">
                            {asset.type} •{" "}
                            {((asset.value / totalValue) * 100).toFixed(1)}%
                            </p>

                        </div>

                        </div>

                        <div className="text-right">

                        <p
                            className={`
                                font-bold
                                ${
                                    asset.type === "Gold"
                                        ? "text-yellow-400"
                                        : asset.type === "Crypto"
                                        ? "text-orange-400"
                                        : asset.type === "Stock"
                                        ? "text-emerald-400"
                                        : asset.type === "Cash"
                                        ? "text-sky-400"
                                        : "text-purple-400"
                                }
                            `}
                        >                            
                            Rp{asset.value.toLocaleString("id-ID")}
                        </p>

                        <div className="mt-2 flex justify-end gap-2">

                            <button
                            onClick={() => editAsset(asset.id)}
                            className="text-blue-400 transition hover:text-blue-300"
                            >
                            <Pencil className="h-4 w-4" />
                            </button>

                            <button
                            onClick={() => deleteAsset(asset.id)}
                            className="text-red-400 transition hover:text-red-300"
                            >
                            <Trash2 className="h-4 w-4" />
                            </button>

                        </div>

                        </div>

                    </div>

                    ))

                )}

            </div>

        </div>
    );
}