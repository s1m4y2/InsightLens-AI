import { LucideIcon, TrendingUp } from "lucide-react";

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: Props) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            {value}
          </h2>

          <div className="mt-4 flex items-center gap-2">

            <TrendingUp
              size={16}
              className="text-green-500"
            />

            <span className="text-sm font-medium text-green-600">
              Real-time
            </span>

          </div>

        </div>

        <div
          className={`rounded-2xl p-4 text-white shadow-lg ${color}`}
        >
          <Icon size={24} />
        </div>

      </div>

    </div>
  );
}