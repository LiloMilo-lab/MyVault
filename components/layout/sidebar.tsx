export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-neutral-900 border-r border-neutral-800 p-6">

      <h1 className="text-2xl font-bold text-white">
        MyVault
      </h1>

      <p className="text-sm text-neutral-400 mt-1">
        Personal Finance OS
      </p>

      <nav className="mt-10 space-y-3">

        <button className="w-full text-left rounded-lg px-4 py-3 bg-neutral-800 text-white">
          Dashboard
        </button>

        <button className="w-full text-left rounded-lg px-4 py-3 hover:bg-neutral-800 text-neutral-300">
          Portfolio
        </button>

        <button className="w-full text-left rounded-lg px-4 py-3 hover:bg-neutral-800 text-neutral-300">
          Transactions
        </button>

        <button className="w-full text-left rounded-lg px-4 py-3 hover:bg-neutral-800 text-neutral-300">
          Analytics
        </button>

        <button className="w-full text-left rounded-lg px-4 py-3 hover:bg-neutral-800 text-neutral-300">
          Settings
        </button>

      </nav>

    </aside>
  );
}