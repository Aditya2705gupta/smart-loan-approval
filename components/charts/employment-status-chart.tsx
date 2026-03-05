"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
    { name: "Salaried", value: 48.9, color: "#7b8cf6" },
    { name: "Contract", value: 22.4, color: "#4ade80" },
    { name: "Self-employed", value: 19.2, color: "#f87171" },
    { name: "Unemployed", value: 9.47, color: "#fbbf24" },
];

export default function EmploymentStatusChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
                        const x = Number(cx) + radius * Math.cos(-(midAngle || 0) * RADIAN);
                        const y = Number(cy) + radius * Math.sin(-(midAngle || 0) * RADIAN);

                        return (
                            <text
                                x={x}
                                y={y}
                                fill="#18181b"
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize="11"
                                fontWeight="bold"
                            >
                                {`${((percent || 0) * 100).toFixed(1)}%`}
                            </text>
                        );
                    }}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "#fafafa" }}
                    itemStyle={{ color: "#fafafa" }}
                />
                <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="square"
                    wrapperStyle={{ paddingLeft: "20px" }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}
