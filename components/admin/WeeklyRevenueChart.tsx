"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Card } from "@/components/ui/Card";

type WeeklyRevenueChartProps = {
  data: {
    day: string;
    revenue: number;
  }[];
};

export default function WeeklyRevenueChart({
  data,
}: WeeklyRevenueChartProps) {
  return (
    <Card>
      <h2 className="mb-6 text-lg font-semibold">Heti bevétel</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis
              tickFormatter={(value) =>
                `${value.toLocaleString("hu-HU")} Ft`
              }
            />

            <Tooltip
  formatter={(value) => [
    `${Number(value).toLocaleString("hu-HU")} Ft`,
    "Bevétel",
  ]}
  labelFormatter={(label) => `Nap: ${label}`}
/>

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}