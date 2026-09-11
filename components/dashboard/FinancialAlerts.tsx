type FinancialAlert = {
  id: string;
  type: "success" | "warning" | "danger" | "info";
  title: string;
  message: string;
  priority: number;
};

type FinancialAlertsProps = {
  alerts: FinancialAlert[];
};

export default function FinancialAlerts({
  alerts,
}: FinancialAlertsProps) {

  if (alerts.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-neutral-800
          bg-neutral-900
          p-6
        "
      >
        <h2 className="text-xl font-bold">
          🔔 Financial Alerts
        </h2>

        <p className="mt-4 text-emerald-400">
          Everything looks good! 🎉
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        rounded-2xl
        border
        border-neutral-800
        bg-neutral-900
        p-6
      "
    >
      <h2 className="text-xl font-bold">
        🔔 Financial Alerts
      </h2>

      <div className="mt-5 space-y-3">

        {alerts.map((alert) => {

          const color =
            alert.type === "danger"
              ? "border-red-500/30 bg-red-500/10"
              : alert.type === "warning"
              ? "border-yellow-500/30 bg-yellow-500/10"
              : alert.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-blue-500/30 bg-blue-500/10";

          return (
            <div
              key={alert.id}
              className={`rounded-xl border p-4 ${color}`}
            >
              <p className="font-semibold">
                {alert.title}
              </p>

              <p className="mt-1 text-sm text-neutral-400">
                {alert.message}
              </p>
            </div>
          );
        })}

      </div>
    </div>
  );
}