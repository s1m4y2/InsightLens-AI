interface Props {
  children: React.ReactNode;
  color?: "green" | "red" | "yellow" | "blue" | "gray";
}

const colors = {
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  yellow: "bg-yellow-100 text-yellow-700",
  blue: "bg-blue-100 text-blue-700",
  gray: "bg-slate-100 text-slate-700",
};

export default function Badge({
  children,
  color = "gray",
}: Props) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
}