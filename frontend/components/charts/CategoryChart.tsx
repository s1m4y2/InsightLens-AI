"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import ChartCard from "./ChartCard";

interface Category {
  label: string;
  count: number;
}

interface Props {
  data: Category[];
}

export default function CategoryChart({
  data,
}: Props) {
  return (
    <ChartCard
      title="Top Categories"
      description="Most frequently mentioned product categories."
    >
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
            />

            <YAxis />

            <Tooltip />

            <XAxis
                dataKey="label"
                tick={{ fontSize: 12 }}
            />

            <YAxis allowDecimals={false} />

            <Bar
                dataKey="count"
                fill="#6366F1"
                radius={[10,10,0,0]}
                maxBarSize={70}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}