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

import { calculateNetWorth } from "@/lib/portfolio/calculateNetWorth";
import { calculateLargestAsset } from "@/lib/portfolio/calculateLargestAsset";
import { calculateAverageAsset } from "@/lib/portfolio/calculateAverageAsset";
import { calculateAssetTypes } from "@/lib/portfolio/calculateAssetTypes";
import { calculateDiversification } from "@/lib/portfolio/calculateDiversification";
import { calculateAllocation } from "@/lib/portfolio/calculateAllocation";
import { calculateRecommendation } from "@/lib/portfolio/calculateRecommendation";
import { usePortfolioHistory } from "@/hooks/usePortfolioHistory";
import PortfolioChart from "@/components/portfolio/PortfolioChart";

export default function AssetsPage() {
const {
    assets,
    setAssets,
    totalAssetValue,
} = useAssets();

const history =
  usePortfolioHistory(
    totalAssetValue
  );
  
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
  
  const averageAsset =
    calculateAverageAsset(assets);

  const netWorth =
    calculateNetWorth(assets);

  const assetTypes =
    calculateAssetTypes(assets);

  const largestAsset =
    calculateLargestAsset(assets);

const allocation =
  calculateAllocation(assets);

const diversificationScore =
  calculateDiversification(
    allocation
  );

const recommendation =
  calculateRecommendation(
    allocation
  );
  
const diversificationLabel =
  diversificationScore >= 80
    ? "Excellent"

    : diversificationScore >= 60
    ? "Good"

    : diversificationScore >= 40
    ? "Fair"

    : "Poor";
    
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
                {formatCurrency(totalAssetValue)}
              </p>

            </div>

            <div className="grid gap-6 md:grid-cols-3">

                <AssetCard
                  title="Net Worth"
                  value={formatCurrency(netWorth)}
                  change="+12.5%"
                />

                <AssetCard
                  title="Diversification"
                  value={`${diversificationScore}/100`}
                  change={diversificationLabel}
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
                      ? `Rp${largestAsset.value.toLocaleString("id-ID")}`
                      : "-"
                  }              
                  />

                <div className="mt-6 grid gap-6 md:col-span-3 lg:grid-cols-2">

                    <AssetAllocation
                      assets={assets}
                      totalAssetValue={totalAssetValue}
                    />

                    <div
                      className="
                        rounded-2xl
                        border
                        border-neutral-800
                        bg-neutral-900
                        p-6
                      "
                    >

                      <h2 className="text-xl font-bold">
                        💡 Portfolio Recommendation
                      </h2>

                      <p
                        className={`
                          mt-5
                          text-lg
                          font-semibold

                          ${
                            recommendation.status === "Warning"
                              ? "text-red-400"
                              : recommendation.status === "Balanced"
                              ? "text-yellow-400"
                              : "text-emerald-400"
                          }
                        `}
                      >
                        {recommendation.status}
                      </p>

                      <p className="mt-3 text-neutral-300 leading-7">
                        {recommendation.message}
                      </p>

                    </div>

                    <div className="mt-6">
                      <PortfolioChart
                        history={history}
                      />
                    </div>
                    
                    <div className="mt-6">
                      <AssetList
                        assets={assets}
                        totalValue={totalAssetValue}
                        deleteAsset={deleteAsset}
                        editAsset={editAsset}
                      />
                    </div>

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