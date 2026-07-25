"use client";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import AssetCard from "@/components/portfolio/AssetCard";
import AssetList from "@/components/portfolio/AssetList";
import AssetAllocation from "@/components/portfolio/AssetAllocation";
import { useAssets } from "@/hooks/useAssets";
import { useState } from "react";
import AssetModal from "@/components/portfolio/AssetModal";

export default function AssetsPage() {
  const {
    assets,
    setAssets,
  } = useAssets();
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] =
    useState<number | null>(null);

  function deleteAsset(index: number) {

    setAssets((prev) =>
      prev.filter((_, i) => i !== index)
    );

  }

  function editAsset(index: number) {

    setEditingIndex(index);

    setIsOpen(true);

  }

  return (
    <main className="flex min-h-screen bg-neutral-950">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Header />

        <section className="flex-1 p-8">

            <h1 className="mb-8 text-4xl font-bold">
                Portfolio
            </h1>

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
                change="+1 Asset"
                />

                <AssetCard
                title="Investments"
                value={`Rp${assets
                  .reduce((sum, asset) => sum + asset.value, 0)
                  .toLocaleString("id-ID")}`}
                change="+5.8%"
                />

                <div className="mt-6 grid gap-6 md:col-span-3 lg:grid-cols-2">

                    <AssetAllocation />

                    <AssetList
                      assets={assets}
                      deleteAsset={deleteAsset}
                      editAsset={editAsset}
                    />

                </div>

                <button
                  onClick={() => {

                      setEditingIndex(null);

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
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
              assets={assets}
            />

        </section>

      </div>

    </main>
  );
}