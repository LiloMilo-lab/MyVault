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

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [cash, setCash] = useState(2300000);
  const [amount, setAmount] = useState("");

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
            {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60">

              <div className="w-full max-w-md rounded-2xl border border-neutral-700 bg-neutral-900 p-6">

                <div className="flex items-center justify-between">

                  <h2 className="text-xl font-bold">
                    Add Transaction
                  </h2>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-neutral-400 transition hover:text-white"
                  >
                    ✕
                  </button>

                </div>

                <div className="mt-6">

                  <label className="mb-2 block text-sm text-neutral-400">
                    Amount
                  </label>

                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3 outline-none focus:border-emerald-500"
                  />

                </div>

                <div className="mt-8 flex justify-end gap-3">

                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl border border-neutral-700 px-5 py-2"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {

                      if (!amount) return;

                      setCash(cash + Number(amount));

                      setAmount("");

                      setIsOpen(false);
                    }}
                    className="rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-black"
                    >
                    Save
                  </button>

                </div>

              </div>

            </div>
          )}
          </div>

        </section>

      </div>

    </main>
  );
}
