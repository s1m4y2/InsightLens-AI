"use client";
import ChartCard from "./ChartCard";
import {

    ResponsiveContainer,

    PieChart,

    Pie,

    Tooltip,

    Cell,

    Legend,

} from "recharts";

interface Item{

    label:string;

    count:number;

}

interface Props{

    data:Item[];

}

export default function EmotionChart({

    data,

}:Props){

    const colors=[

        "#6366F1",

        "#22C55E",

        "#F59E0B",

        "#EF4444",

        "#06B6D4",

        "#8B5CF6"

    ];

    return(

    <ChartCard
            title="Top Emotions"
            description="Most common customer emotions."
        >

            <div className="h-[350px]">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="count"
                            nameKey="label"
                            innerRadius={80}
                            outerRadius={120}
                        >

                            {data.map((_,index)=>(

                                <Cell
                                    key={index}
                                    fill={colors[index % colors.length]}
                                />

                            ))}

                        </Pie>

                        <Tooltip/>

                        <Legend/>

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </ChartCard>

    );

}