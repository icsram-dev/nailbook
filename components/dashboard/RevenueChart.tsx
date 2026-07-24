"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type RevenueChartProps = {
  data: {
    day: string;
    revenue: number;
  }[];
};

export function RevenueChart({
  data,
}: RevenueChartProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Heti bevétel
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis
              tickFormatter={(value) =>
                `${value / 1000}k`
              }
            />

           <Tooltip
  formatter={(value) =>
    new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
      maximumFractionDigits: 0,
    }).format(Number(value))
  }
  labelFormatter={(label) => `Nap: ${label}`}
/>

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#ec4899"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}