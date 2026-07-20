import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-neutral-950">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Header />

        <section className="flex-1 p-8">

          <div className="rounded-2xl border border-dashed border-neutral-700 h-[500px] flex items-center justify-center">

            <span className="text-neutral-500 text-lg">
              Dashboard Content Coming Soon...
            </span>

          </div>

        </section>

      </div>

    </main>
  );
}
