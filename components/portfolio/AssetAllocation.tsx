export default function AssetAllocation() {
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
      <h2 className="mb-6 text-xl font-bold">
        Asset Allocation
      </h2>

      <div className="space-y-5">

        <div>

          <div className="mb-2 flex justify-between">

            <span>🥇 Gold</span>

            <span>50%</span>

          </div>

          <div className="h-3 rounded-full bg-neutral-800">

            <div
              className="h-3 rounded-full bg-yellow-500"
              style={{
                width: "50%",
              }}
            />

          </div>

        </div>

        <div>

          <div className="mb-2 flex justify-between">

            <span>📈 Stock</span>

            <span>30%</span>

          </div>

          <div className="h-3 rounded-full bg-neutral-800">

            <div
              className="h-3 rounded-full bg-emerald-500"
              style={{
                width: "30%",
              }}
            />

          </div>

        </div>

        <div>

          <div className="mb-2 flex justify-between">

            <span>₿ Crypto</span>

            <span>20%</span>

          </div>

          <div className="h-3 rounded-full bg-neutral-800">

            <div
              className="h-3 rounded-full bg-orange-500"
              style={{
                width: "20%",
              }}
            />

          </div>

        </div>

      </div>

    </div>
  );
}