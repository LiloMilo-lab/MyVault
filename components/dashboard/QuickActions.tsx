import Link from "next/link";

export default function QuickActions() {
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
        ⚡ Quick Actions
      </h2>

      <p className="mt-2 text-sm text-neutral-500">
        Quickly manage your finances.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">

        <Link
          href="/transactions"
          className="
            rounded-xl
            border
            border-neutral-800
            bg-neutral-800/50
            p-4
            transition
            hover:border-emerald-500
            hover:bg-neutral-800
          "
        >
          <p className="font-semibold">
            💳 Transactions
          </p>

          <p className="mt-1 text-sm text-neutral-500">
            View and manage transactions
          </p>
        </Link>


        <Link
          href="/assets"
          className="
            rounded-xl
            border
            border-neutral-800
            bg-neutral-800/50
            p-4
            transition
            hover:border-emerald-500
            hover:bg-neutral-800
          "
        >
          <p className="font-semibold">
            💼 Portfolio
          </p>

          <p className="mt-1 text-sm text-neutral-500">
            Manage your assets
          </p>
        </Link>


        <Link
          href="/budgets"
          className="
            rounded-xl
            border
            border-neutral-800
            bg-neutral-800/50
            p-4
            transition
            hover:border-emerald-500
            hover:bg-neutral-800
          "
        >
          <p className="font-semibold">
            📊 Budgets
          </p>

          <p className="mt-1 text-sm text-neutral-500">
            Track spending limits
          </p>
        </Link>


        <Link
          href="/goals"
          className="
            rounded-xl
            border
            border-neutral-800
            bg-neutral-800/50
            p-4
            transition
            hover:border-emerald-500
            hover:bg-neutral-800
          "
        >
          <p className="font-semibold">
            🎯 Goals
          </p>

          <p className="mt-1 text-sm text-neutral-500">
            Track financial targets
          </p>
        </Link>

      </div>
    </div>
  );
}