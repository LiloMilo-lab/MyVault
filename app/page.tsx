import Sidebar from "@/components/layout/sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-neutral-950">

      <Sidebar />

      <section className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-neutral-400">
          Welcome back to MyVault.
        </p>

      </section>

    </main>
  );
}