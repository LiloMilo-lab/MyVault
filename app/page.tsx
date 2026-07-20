import { join } from "path";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold">MyVault</h1>
        <p className="mt-4 text-gray-400">
          Your Personal Finance Operating System
        </p>
      </div>
    </main>
  );
}