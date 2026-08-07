"use client";
import ChartCard from "./ChartCard";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Label,
} from "recharts";

interface Props {
    positive: number;
    negative: number;
    mixed: number;
}

export default function SentimentChart({
    positive,
    negative,
    mixed,
}: Props) {

    const data = [
        {
            name: "Positive",
            value: positive,
        },
        {
            name: "Negative",
            value: negative,
        },
        {
            name: "Mixed",
            value: mixed,
        },
    ];

    const COLORS = [
        "#22c55e",
        "#ef4444",
        "#f59e0b",
    ];

    return (

        <ChartCard
            title="Sentiment Distribution"
            description="AI generated sentiment distribution."
        >

            <div className="h-[350px]">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={80}
                            outerRadius={120}
                            isAnimationActive
                            animationDuration={1000}
                        >

                            <Label
                                value={positive + negative + mixed}
                                position="center"
                                fontSize={34}
                                fontWeight="bold"
                            />

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </ChartCard>

    );

}