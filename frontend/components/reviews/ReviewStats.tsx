import {
    MessageSquare,
    Smile,
    Frown,
    Scale,
} from "lucide-react";
import StatCard from "../dashboard/StatCard";

interface Props {

    total: number;

    positive: number;

    negative: number;

    mixed: number;

}

export default function ReviewStats({

    total,
    positive,
    negative,
    mixed,

}: Props) {

    return (

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatCard
                title="Total Reviews"
                value={total}
                icon={MessageSquare}
                color="bg-gradient-to-r from-indigo-600 to-violet-600"
            />

            <StatCard
                title="Positive"
                value={positive}
                icon={Smile}
                color="bg-gradient-to-r from-green-500 to-emerald-600"
            />

            <StatCard
                title="Negative"
                value={negative}
                icon={Frown}
                color="bg-gradient-to-r from-red-500 to-rose-600"
            />

            <StatCard
                title="Mixed"
                value={mixed}
                icon={Scale}
                color="bg-gradient-to-r from-yellow-500 to-orange-500"
            />

        </section>

    );

}