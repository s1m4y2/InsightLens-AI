"use client";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import ChartCard from "./ChartCard";

interface TrendItem {

    date: string;

    count: number;

}

interface Props {

    data: TrendItem[];

}

export default function ReviewTrendChart({

    data,

}: Props) {

    return (

        <ChartCard
            title="Review Trend"
            description="Reviews analyzed over time."
        >

            <div className="h-[350px]">

                <ResponsiveContainer width="100%" height="100%">

                    <AreaChart data={data}>

                        <defs>

                            <linearGradient
                                id="colorReviews"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="#6366F1"
                                    stopOpacity={0.8}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#6366F1"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="date" />

                        <YAxis />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#6366F1"
                            fill="url(#colorReviews)"
                            strokeWidth={3}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </ChartCard>

    );

}