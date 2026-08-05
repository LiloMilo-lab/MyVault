"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { Legend } from "recharts";

type TrendData = {
  date: string;
  income: number;
  expense: number;
};

type TransactionTrendProps = {
  data: TrendData[];
};

export default function TransactionTrend({
  data,
}: TransactionTrendProps) {
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
                Transaction Trend
            </h2>

            <div className="h-80">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart data={data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#404040"
                        />

                        <XAxis dataKey="date" />

                        <YAxis />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#171717",
                                border: "1px solid #404040",
                                borderRadius: "12px",
                            }}
                        />

                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#22c55e"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />

                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#ef4444"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}