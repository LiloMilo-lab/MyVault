import { Asset } from "@/hooks/useAssets";
import {
  Coins,
  Pencil,
  Trash2,
} from "lucide-react";

type AssetListProps = {
  assets: Asset[];

  deleteAsset: (index: number) => void;

  editAsset: (index: number) => void;
};

export default function AssetList({
  assets,
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

                        <div className="text-right">

                            <p className="font-bold text-yellow-400">
                                Rp{asset.value.toLocaleString("id-ID")}
                            </p>

                            <div className="mt-2 flex justify-end gap-2">

                                <button
                                onClick={() => editAsset(index)}
                                className="text-blue-400 transition hover:text-blue-300"
                                >
                                <Pencil className="h-4 w-4" />
                                </button>

                                <button
                                onClick={() => deleteAsset(index)}
                                className="text-red-400 transition hover:text-red-300"
                                >
                                <Trash2 className="h-4 w-4" />
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}