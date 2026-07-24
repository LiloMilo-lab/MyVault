"use client";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import AssetCard from "@/components/portfolio/AssetCard";
import AssetList from "@/components/portfolio/AssetList";
import AssetAllocation from "@/components/portfolio/AssetAllocation";
import { useAssets } from "@/hooks/useAssets";

export default function AssetsPage() {
  const { assets } = useAssets();

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
                    />

                </div>

            </div>

        </section>

      </div>

    </main>
  );
}