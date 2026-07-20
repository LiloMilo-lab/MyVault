export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-neutral-800 px-8 py-5">

      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-sm text-neutral-400">
          Welcome back to MyVault
        </p>
      </div>

      <div className="rounded-xl bg-neutral-900 px-5 py-3 text-sm text-neutral-300">
        Offline Mode
      </div>

    </header>
  );
}