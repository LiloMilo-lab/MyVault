import { LucideIcon } from "lucide-react";
type StatCardProps = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
};

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="
        rounded-2xl
        border
        border-neutral-800
        bg-neutral-900
        p-6
        transition-all
        duration-300
        hover:border-emerald-500
        hover:shadow-lg
        hover:shadow-emerald-500/10
        hover:-translate-y-1
        ">

        <div className="flex items-center justify-between">

            <p className="text-sm text-neutral-400">
            {title}
            </p>

            <Icon className="h-6 w-6 text-emerald-400" />

        </div>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
            {value}
        </h2>

        <p className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-400">
            {change}
        </p>

    </div>
  );
}