"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data based on the screenshot shape
const data = Array.from({ length: 20 }).map((_, i) => ({
    name: `${(i + 1) * 1}k`,
    no: Math.floor(Math.random() * 20) + 10,
    yes: Math.floor(Math.random() * 15) + 5,
}));

export default function IncomeDistributionChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#a1a1aa", fontSize: 12 }}
                    dy={10}
                    label={{ value: "Applicant_Income", position: "insideBottom", dy: 20, fill: "#a1a1aa", fontSize: 12 }}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#a1a1aa", fontSize: 12 }}
                    label={{ value: "count", angle: -90, position: "insideLeft", fill: "#a1a1aa", fontSize: 12 }}
                />
                <Tooltip
                    cursor={{ fill: "#27272a" }}
                    contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "#fafafa" }}
                />
                <Legend
                    verticalAlign="top"
                    align="left"
                    iconType="square"
                    wrapperStyle={{ paddingBottom: "20px" }}
                />
                <Bar dataKey="no" name="No" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
                <Bar dataKey="yes" name="Yes" stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
