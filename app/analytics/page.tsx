"use client";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import { useTransactions } from "@/hooks/useTransactions";

import StatCard from "@/components/dashboard/StatCard";
import FinanceChart from "@/components/dashboard/FinanceChart";
import MonthlySummary from "@/components/dashboard/MonthlySummary";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";

import { calculateIncome } from "@/lib/analytics/calculateIncome";
import { calculateExpense } from "@/lib/analytics/calculateExpense";
import { calculateSavingRate } from "@/lib/analytics/calculateSavingRate";
import { calculateLargestExpense } from "@/lib/analytics/calculateLargestExpense";
import { calculateFinancialHealth } from "@/lib/analytics/calculateFinancialHealth";
import { calculateInsight } from "@/lib/analytics/calculateInsight";

import { formatCurrency } from "@/lib/format";

import {
  TrendingUp,
  Wallet,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";

import TransactionTrend from "@/components/analytics/TransactionTrend";
import { calculateTransactionTrend } from "@/lib/analytics/calculateTransactionTrend";
import { calculateTopExpenseCategory } from "@/lib/analytics/calculateTopExpenseCategory";
import { calculateAverageDailyExpense } from "@/lib/analytics/calculateAverageDailyExpense";

export default function AnalyticsPage() {
    const {
        transactions,
        mounted,
    } = useTransactions();

    const income =
        calculateIncome(transactions);

    const expense =
        calculateExpense(transactions);

    const savingRate =
        calculateSavingRate(
            income,
            expense
        );

    const largestExpense =
        calculateLargestExpense(
            transactions
        );

    const financialHealth =
        calculateFinancialHealth(
            savingRate
        );

    const insight =
        calculateInsight(
            savingRate,
            largestExpense
            ? largestExpense.category
            : "Unknown"
        );
    
    const trendData =
        calculateTransactionTrend(
            transactions
        );

    const topCategory =
        calculateTopExpenseCategory(
            transactions
        );

    const topCategoryPercentage =
        topCategory && expense > 0
            ? (topCategory.amount / expense) * 100
            : 0;

    const averageDailyExpense =
        calculateAverageDailyExpense(
            transactions
        );

  return (
    <main className="flex min-h-screen bg-neutral-950">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Header />

        <section className="flex-1 p-8">

            <div className="mb-8">

                <h1 className="text-4xl font-bold">
                Analytics
                </h1>

                <p className="mt-2 text-neutral-500">
                Analyze your financial performance.
                </p>

            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                <StatCard
                    title="Income"
                    value={formatCurrency(income)}
                    change="Total Income"
                    icon={TrendingUp}
                />

                <StatCard
                    title="Expense"
                    value={formatCurrency(expense)}
                    change="Total Expense"
                    icon={Wallet}
                />

                <StatCard
                    title="Saving Rate"
                    value={`${savingRate.toFixed(1)}%`}
                    change={financialHealth.label}
                    icon={ShieldCheck}
                />

                <StatCard
                    title="Daily Expense"
                    value={formatCurrency(
                        averageDailyExpense
                    )}
                    change="Average per day"
                    icon={CalendarDays}
                />

            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">

                <FinanceChart
                    income={income}
                    expense={expense}
                />
                <MonthlySummary
                    income={income}
                    expense={expense}
                />
                <TransactionTrend
                    data={trendData}
                />
                <CategoryBreakdown
                    transactions={transactions}
                />

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

                    <h2 className="text-xl font-bold">
                        🏆 Top Spending Category
                    </h2>

                    {topCategory ? (

                        <>

                        <p className="mt-6 text-3xl font-bold text-red-400">
                            {topCategory.category}
                        </p>

                        <p className="mt-3 text-lg text-neutral-300">
                            {formatCurrency(topCategory.amount)}
                        </p>

                        <p className="mt-2 text-sm text-neutral-500">
                            {topCategoryPercentage.toFixed(1)}%
                            {" "}of all expenses
                        </p>
                        <p
                            className={`
                                mt-6
                                rounded-xl
                                p-4
                                text-sm
                                ${
                                topCategoryPercentage >= 50
                                    ? "bg-red-500/10 text-red-400"
                                    : topCategoryPercentage >= 30
                                    ? "bg-yellow-500/10 text-yellow-400"
                                    : "bg-emerald-500/10 text-emerald-400"
                                }
                            `}
                        >
                            {
                                topCategoryPercentage >= 50
                                ? "⚠ This category dominates your spending."

                                : topCategoryPercentage >= 30
                                ? "💡 Keep monitoring this category."

                                : "✅ Your spending is well diversified."
                            }
                        </p>

                        </>

                    ) : (

                        <p className="mt-6 text-neutral-500">
                        No expense data.
                        </p>

                    )}

                    <div
                        className={`
                            rounded-2xl
                            border
                            p-6
                            transition-all
                            duration-300
                            hover:-translate-y-1

                            ${
                                insight.status === "Excellent"
                                    ? "border-emerald-500/30 bg-emerald-500/10"

                                    : insight.status === "Good"
                                    ? "border-yellow-500/30 bg-yellow-500/10"

                                    : "border-red-500/30 bg-red-500/10"
                            }
                        `}
                        >

                        <h2 className="text-xl font-bold">
                            🧠 Financial Insight
                        </h2>

                        <p className="mt-6 text-2xl font-bold">
                            {insight.status}
                        </p>

                        <p className="mt-4 leading-7 text-neutral-300">
                            {insight.message}
                        </p>

                    </div>

                </div>
            </div>

        </section>

      </div>

    </main>
  );
}