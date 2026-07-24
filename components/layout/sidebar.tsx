"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  ReceiptText,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Portfolio",
    href: "/assets",
    icon: Briefcase,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: ReceiptText,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {

const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-neutral-900 border-r border-neutral-800 p-6">

      <h1 className="text-2xl font-bold text-white">
        MyVault
      </h1>

      <p className="text-sm text-neutral-400 mt-1">
        Personal Finance OS
      </p>

      <nav className="mt-10 space-y-3">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 ${
                pathname === item.href
                  ? "bg-emerald-500 text-black"
                  : "text-neutral-300 hover:bg-neutral-800"
              }`}
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </Link>
          );
        })}
        
      </nav>

    </aside>
  );
}