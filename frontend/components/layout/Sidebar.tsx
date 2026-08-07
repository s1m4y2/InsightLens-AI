"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import {
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  BrainCircuit,
  FileSpreadsheet,
  FileText,
  Settings,
  ChevronRight,
  Cpu,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Reviews",
    href: "/reviews",
    icon: MessageSquare,
  },
  {
    title: "AI Analyze",
    href: "/analyze",
    icon: Sparkles,
  },
  {
    title: "Prompt Management",
    href: "/prompts",
    icon: BrainCircuit,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileSpreadsheet,
  },
  {
    title: "AI Logs",
    href: "/logs",
    icon: FileText,
  },
];

export default function Sidebar() {

  const pathname = usePathname();
  const router = useRouter();
  return (

    <aside className="sticky top-0 flex h-screen w-72 flex-col border-r bg-white">

      {/* LOGO */}

      <div className="border-b p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">

            <Cpu size={28}/>

          </div>

          <div>

            <h1 className="text-xl font-bold">

              InsightLens

            </h1>

            <p className="text-sm text-slate-500">

              AI Platform

            </p>

          </div>

        </div>

      </div>

      {/* MENU */}

      <nav className="flex-1 space-y-2 p-5">

        {menuItems.map((item) => {

          const Icon = item.icon;

          const active = pathname === item.href;

          return (

            <Link

              key={item.title}

              href={item.href}

              className={`
              flex
              items-center
              justify-between
              rounded-2xl
              px-4
              py-3
              transition-all
              duration-300

              ${
                active
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                  : "hover:bg-slate-100 text-slate-700"
              }
            `}

            >

              <div className="flex items-center gap-3">

                <Icon size={20}/>

                <span>

                  {item.title}

                </span>

              </div>

              {active &&

                <ChevronRight size={18}/>

              }

            </Link>

          );

        })}

      </nav>

      {/* USER */}

      <div className="mt-auto border-t p-5">

        <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-lg font-bold text-white">

            S

          </div>

          <div className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-white">

            <p className="text-lg font-bold">

                Simay

            </p>

            <p className="text-sm opacity-80">

                Backend Developer

            </p>

        </div>

        </div>

        <button
          onClick={() => {

              AuthService.logout();

              router.push("/login");

          }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-red-600 transition hover:bg-red-50"
      >

          <Settings size={18} />

          Logout

      </button>

      </div>

    </aside>

  );

}