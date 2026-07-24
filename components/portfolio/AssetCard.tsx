type AssetCardProps = {
    title: string;
    value: string;
    change: string;
};

export default function AssetCard({
  title,
  value,
  change,
}: AssetCardProps) {
  return (
        <div
            className="
                rounded-2xl
                border
                border-neutral-800
                bg-neutral-900
                p-6
                transition-all
                duration-300
                hover:border-neutral-700
                hover:-translate-y-1
            "
        >
            <p className="text-sm text-neutral-500">
                {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
                {value}
            </h2>

            <p className="mt-2 text-sm font-semibold text-emerald-400">
                {change}
            </p>

        </div>
    );
}