"use client";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import AssetCard from "@/components/portfolio/AssetCard";
import AssetList from "@/components/portfolio/AssetList";
import AssetAllocation from "@/components/portfolio/AssetAllocation";
import { useAssets } from "@/hooks/useAssets";
import { formatCurrency } from "@/lib/format";
import { useState } from "react";
import AssetModal from "@/components/portfolio/AssetModal";

export default function AssetsPage() {
  const {
    assets,
    setAssets,
  } = useAssets();
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] =
    useState<number | null>(null);

  function deleteAsset(id: number) {

    setAssets((prev) =>
      prev.filter((asset) => asset.id !== id)
    );

  }

  function editAsset(id: number) {

    setEditingId(id);

    setIsOpen(true);

  }

  const totalValue = assets.reduce(
    (sum, asset) => sum + asset.value,
    0
  );

  const assetTypes = new Set(
    assets.map((asset) => asset.type)
  ).size;

  const largestAsset =
    assets.length === 0
      ? null
      : assets.reduce((largest, current) =>
          current.value > largest.value
            ? current
            : largest
        );

  return (
    <main className="flex min-h-screen bg-neutral-950">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Header />

        <section className="flex-1 p-8">

            <div className="mb-8">

              <h1 className="text-4xl font-bold">
                Portfolio
              </h1>

              <p className="mt-2 text-neutral-500">
                Total Asset Value:
                {" "}
                {formatCurrency(totalValue)}
              </p>

            </div>

            <div className="grid gap-6 md:grid-cols-3">

                <AssetCard
                title="Net Worth"
                value={`Rp${assets
                  .reduce((sum, asset) => sum + asset.value, 0)
                  .toLocaleString("id-ID")}`}
                change="+12.5%"
                />

                <AssetCard
                title="Assets"
                value={assets.length.toString()}
                change={`${assetTypes} Types`}
                />

                <AssetCard
                  title="Largest Asset"
                  value={
                    largestAsset
                      ? largestAsset.name
                      : "-"
                  }
                  change={
                    largestAsset
                      ? formatCurrency(largestAsset.value)
                      : "-"
                  }
                />

                <div className="mt-6 grid gap-6 md:col-span-3 lg:grid-cols-2">

                    <AssetAllocation 
                      assets={assets}
                    />

                    <AssetList
                      assets={assets}
                      totalValue={totalValue}
                      deleteAsset={deleteAsset}
                      editAsset={editAsset}
                    />

                </div>

                <button
                  onClick={() => {

                      setEditingId(null);

                      setIsOpen(true);

                  }}                  
                  className="mt-8 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
                >
                  + Add Asset
                </button>

            </div>

            <AssetModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setAssets={setAssets}
              editingId={editingId}
              setEditingId={setEditingId}
              assets={assets}
            />

        </section>

      </div>

    </main>
  );
}