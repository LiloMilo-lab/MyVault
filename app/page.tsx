"use client";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatCard from "@/components/dashboard/StatCard";
import { dashboardData } from "@/data/dashboard";
import {
  Wallet,
  Landmark,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import TransactionModal from "@/components/dashboard/TransactionModal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [cash, setCash] = useState(2300000);

  return (
    <main className="flex min-h-screen bg-neutral-950">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Header />

        <section className="flex-1 p-8">

          <div className="grid gap-6 md:grid-cols-3">

            <StatCard
            title="Net Worth"
            value={dashboardData.netWorth.value}
            change={dashboardData.netWorth.change}
            icon={Wallet}
            />

            <StatCard
            title="Cash"
            value={`Rp${cash.toLocaleString("id-ID")}`}
            change={dashboardData.cash.change}
            icon={Landmark}
            />

            <StatCard
            title="Investments"
            value={dashboardData.investments.value}
            change={dashboardData.investments.change}
            icon={TrendingUp}
            />

            <button
              onClick={() => setIsOpen(true)}
              className="mt-8 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
              >
              + Add Transaction
            </button>
              <TransactionModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                cash={cash}
                setCash={setCash}
              />
          </div>

        </section>

      </div>

    </main>
  );
}
