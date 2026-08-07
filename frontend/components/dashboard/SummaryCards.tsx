import StatCard from "./StatCard";
import {MessageSquare, Smile, Frown, Scale,} from "lucide-react";
import { DashboardResponse } from "@/types/dashboard";


interface Props {data: DashboardResponse;}

export default function SummaryCards({data,}: Props) {

  const cards = [

    {
      title: "Total Reviews",
      value: data.total_reviews,
      icon: MessageSquare,
      color: "bg-indigo-600",
    },

    {
      title: "Positive",
      value: data.positive,
      icon: Smile,
      color: "bg-green-500",
    },

    {
      title: "Negative",
      value: data.negative,
      icon: Frown,
      color: "bg-red-500",
    },

    {
      title: "Mixed",
      value: data.mixed,
      icon: Scale,
      color: "bg-amber-500",
    },

  ];

  return (

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => (

        <StatCard
          key={card.title}
          {...card}
        />

      ))}

    </div>

  );
}