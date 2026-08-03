"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { PortfolioHistory } from "@/hooks/usePortfolioHistory";

type PortfolioChartProps = {
  history: PortfolioHistory[];
};

export default function PortfolioChart({
  history,
}: PortfolioChartProps) {
    if (history.length === 0) {

        return (
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
                    Portfolio History
                </h2>

                <div className="py-10 text-center text-neutral-500">
                    No history yet.
                </div>

            </div>

        );

    }

    return (

        <div
        className="
            rounded-2xl
            border
            border-neutral-800
            bg-neutral-900
            p-6
            "
        >

            <h2 className="mb-6 text-xl font-bold">
                Portfolio History
            </h2>

            <div className="h-72">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <LineChart
                        data={history}
                    >
                        <CartesianGrid
                            strokeDasharray="4 4"
                            stroke="#404040"
                        />

                        <XAxis
                            dataKey="date"
                            tickFormatter={(date) => 
                                date.slice(5)
                            }
                        />

                        <YAxis
                            tickFormatter={(value) =>
                                `Rp${(value / 1000000).toFixed(0)}M`
                            }
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#171717",
                                border: "1px solid #404040",
                                borderRadius: "12px",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ r: 4}}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>


            </ div>      

        </div>
        );


                
}