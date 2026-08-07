"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRef } from "react";
import {
    Bell,
    Search,
    LayoutDashboard,
    FileText,
    Brain,
    FileBarChart,
    ScrollText,
    MessageSquare,
    CheckCircle2,
    Download,
    Sparkles,
    LogIn,
} from "lucide-react";

export default function Navbar() {
const router = useRouter();
const [notificationOpen, setNotificationOpen] = useState(false);
const [search, setSearch] = useState("");
const inputRef = useRef<HTMLInputElement>(null);
useEffect(() => {

    const handle = (e: KeyboardEvent) => {

        if ((e.ctrlKey || e.metaKey) && e.key === "k") {

            e.preventDefault();

            inputRef.current?.focus();

        }

    };

    window.addEventListener("keydown", handle);

    return () =>

        window.removeEventListener("keydown", handle);

}, []);
const notifications = [

    {
        id: 1,
        title: "Prompt updated",
        description: "review_analysis v2 saved",
        icon: FileText,
        color: "text-indigo-600",
    },

    {
        id: 2,
        title: "Report exported",
        description: "PDF report downloaded",
        icon: Download,
        color: "text-green-600",
    },

    {
        id: 3,
        title: "AI Analysis completed",
        description: "Customer review analyzed",
        icon: Sparkles,
        color: "text-purple-600",
    },

    {
        id: 4,
        title: "Login successful",
        description: "Welcome back!",
        icon: LogIn,
        color: "text-sky-600",
    },

];
const pages = [
    {
        name: "Dashboard",
        keywords: ["dashboard", "home"],
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Reviews",
        keywords: ["review", "reviews"],
        href: "/reviews",
        icon: MessageSquare,
    },
    {
        name: "AI Analyze",
        keywords: ["analyze", "analysis", "ai"],
        href: "/analyze",
        icon: Brain,
    },
    {
        name: "Prompt Management",
        keywords: ["prompt", "prompts"],
        href: "/prompts",
        icon: FileText,
    },
    {
        name: "Reports",
        keywords: ["report", "reports"],
        href: "/reports",
        icon: FileBarChart,
    },
    {
        name: "AI Logs",
        keywords: ["logs", "history"],
        href: "/logs",
        icon: ScrollText,
    },
];

const results = useMemo(() => {

    if (!search.trim()) return [];

    return pages.filter((page) =>
        page.name.toLowerCase().includes(search.toLowerCase()) ||

        page.keywords.some((keyword) =>
            keyword.includes(search.toLowerCase())
        )
    );

}, [search]);
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">

      <div>
        <h2 className="text-2xl font-bold">
            InsightLens AI
        </h2>

        <p className="text-sm text-slate-500">
            AI-powered Customer Review Analytics
        </p>
    </div>

      <div className="flex items-center gap-5">

        <div className="relative">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search... (Ctrl + K)"
              className="max-w-sm rounded-xl border bg-slate-50 py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
              onKeyDown={(e) => {

                  if (e.key === "Enter" && results.length > 0) {

                      router.push(results[0].href);

                      setSearch("");

                  }

              }}
              onBlur={() => {

                  setTimeout(() => {

                      setSearch("");

                  }, 150);

              }}
          />
          {results.length > 0 && (
            
            <div className="absolute mt-2 w-full rounded-xl border bg-white shadow-xl transition-all duration-200 animate-in fade-in zoom-in-95 z-50">

                {results.map((page) => {

                    const Icon = page.icon;

                    return (

                        <button
                            key={page.href}
                            onClick={() => {

                                router.push(page.href);

                                setSearch("");

                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-100"
                        >

                            <Icon
                                size={18}
                                className="rounded-lg bg-indigo-100 p-1 text-indigo-600"
                            />

                            {page.name}

                        </button>

                    );

                })}
              
            </div>
            

        )}
        {search && results.length === 0 && (

                  <div className="absolute mt-2 w-full rounded-xl border bg-white p-4 text-sm text-slate-500 shadow-xl">

                      No matching pages found.

                  </div>

              )}
        </div>

        <div className="flex items-center gap-4">

          <div className="relative">

            <button

                onClick={() =>
                    setNotificationOpen(!notificationOpen)
                }

                className="relative rounded-xl border p-2 hover:bg-slate-100"

            >

                <Bell size={20}/>

                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">

                    {notifications.length}

                </span>

            </button>
            {notificationOpen && (

              <div className="absolute right-0 mt-3 w-96 rounded-2xl border bg-white shadow-2xl z-50">

                  <div className="border-b p-4">

                      <h2 className="font-bold">

                          Notifications

                      </h2>

                      <p className="text-sm text-slate-500">

                          Recent activities

                      </p>

                  </div>

                  {notifications.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.id}
                            className="flex items-start gap-4 border-b p-4 hover:bg-slate-50"
                        >

                            <div className={`rounded-xl bg-slate-100 p-2 ${item.color}`}>

                                <Icon size={18} />

                            </div>

                            <div>

                                <h3 className="font-semibold">

                                    {item.title}

                                </h3>

                                <p className="text-sm text-slate-500">

                                    {item.description}

                                </p>

                            </div>

                        </div>

                    );

                })}

                 

              </div>

              )}

          <div className="h-8 w-px bg-slate-200"/>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-bold text-white">
              S
          </div>

      </div>
    </div>
      </div>

    </header>
  );
}