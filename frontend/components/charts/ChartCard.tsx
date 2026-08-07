interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function ChartCard({
  title,
  description,
  children,
}: Props) {

  return (

    <div className="flex min-h-[470px] flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="mb-6">

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>

      </div>

      {children}

    </div>

  );

}