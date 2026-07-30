import { Asset } from "@/hooks/useAssets";
import { Transaction } from "@/types/transaction";

export function syncPortfolio(
  assets: Asset[],
  transaction: Transaction
) {
    const updatedAssets = [...assets];
    const assetIndex =
        updatedAssets.findIndex(
            (asset) =>
            asset.type === transaction.category
        );
    
    if (assetIndex === -1) {
        return updatedAssets;
    }

    if (transaction.type === "Income") {

        updatedAssets[assetIndex].value +=
            transaction.amount;

    } else {

        updatedAssets[assetIndex].value -=
            transaction.amount;

        return updatedAssets;

    }

}