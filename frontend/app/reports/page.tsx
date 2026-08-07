"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
    FileText,
    FileSpreadsheet,
    FileArchive,
    Check,
    Info,
    LayoutGrid,
    Sparkles,
    CheckCircle2,
    BarChart3,
    Clock,
    ArrowDown,
} from "lucide-react";
import { useReportExport } from "@/hooks/useReportExport";
import { useReviews } from "@/hooks/useReviews";
import { toast } from "sonner";

const LAST_EXPORT_KEY = "last_export_at";

const reportTypes = [
    {
        type: "pdf" as const,
        icon: FileText,
        iconColor: "text-red-500",
        title: "PDF Report",
        description: "Executive business report with AI insights",
        badge: { label: "Recommended", className: "bg-red-100 text-red-600" },
        includes: ["Summary", "Charts", "Categories", "AI Reply"],
        buttonClass: "bg-red-500 hover:bg-red-600",
    },
    {
        type: "excel" as const,
        icon: FileSpreadsheet,
        iconColor: "text-green-600",
        title: "Excel Report",
        description: "Structured spreadsheet for further analysis",
        badge: { label: "Spreadsheet", className: "bg-green-100 text-green-600" },
        includes: ["Reviews", "Sentiment", "Categories", "Keywords"],
        buttonClass: "bg-green-600 hover:bg-green-700",
    },
    {
        type: "csv" as const,
        icon: FileArchive,
        iconColor: "text-indigo-600",
        title: "CSV Report",
        description: "Raw customer review data export",
        badge: { label: "Raw Data", className: "bg-indigo-100 text-indigo-600" },
        includes: ["Raw Reviews", "Timestamps", "Ratings", "IDs"],
        buttonClass: "bg-indigo-600 hover:bg-indigo-700",
    },
];

export default function ReportsPage() {

    const { download } = useReportExport();
    const [exporting, setExporting] = useState<string | null>(null);
    const [lastExport, setLastExport] = useState<string>("—");

    // Not: sayfa filtresi olmadan toplam review sayısını almak için mevcut useReviews hook'u
    // tekrar kullanıldı. Gerçek API'nde ayrı bir "stats" endpoint'i varsa oradan çekmek daha doğru olur.
    const { data } = useReviews({
        page: 1,
        search: "",
        sentiment: "All",
        emotion: "All",
        category: "All",
    });

    const totalReviews = data?.total ?? 0;

    const reportContents = [
        { title: "Reviews", subtitle: `${totalReviews} Reviews Included` },
        { title: "Summary", subtitle: "AI Generated" },
        { title: "Sentiment", subtitle: "3 Types Detected" },
        { title: "Categories", subtitle: "12 Categories" },
    ];

    useEffect(() => {

        const stored = localStorage.getItem(LAST_EXPORT_KEY);

        if (stored) {

            setLastExport(formatLastExport(stored));

        }

    }, []);

    function formatLastExport(iso: string) {

        const date = new Date(iso);
        const now = new Date();

        const isToday =
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();

        if (isToday) {

            return `Today, ${date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}`;

        }

        return date.toLocaleDateString();

    }

    async function exportReport(
        type: "pdf" | "excel" | "csv"
    ) {

        setExporting(type);

        const loading = toast.loading(
            "Preparing report..."
        );

        try {

            await download(type);

            const now = new Date().toISOString();
            localStorage.setItem(LAST_EXPORT_KEY, now);
            setLastExport(formatLastExport(now));

            toast.dismiss(loading);

            toast.success(
                `${type.toUpperCase()} report downloaded.`
            );

        }

        catch {

            toast.dismiss(loading);

            toast.error(
                "Export failed."
            );

        }

        finally {

            setExporting(null);

        }

    }

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        Reports

                    </h1>

                    <p className="mt-2 text-slate-500">

                        Export AI analytics reports for management and business analysis.

                    </p>

                </div>

                {/* Live data overview */}
                <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">

                    <div className="flex items-center justify-between rounded-3xl border bg-white p-6 shadow-sm transition hover:border-indigo-300">
                        <div>
                            <p className="text-sm text-slate-500">
                                Total Reviews
                            </p>
                            <div className="mt-1 flex items-center gap-2">
                                <h2 className="text-3xl font-bold">
                                    {totalReviews}
                                </h2>
                                <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-600">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                    LIVE
                                </span>
                            </div>
                        </div>
                        <BarChart3 className="text-slate-300" size={28} />
                    </div>

                    <div className="flex items-center justify-between rounded-3xl border bg-white p-6 shadow-sm transition hover:border-indigo-300">
                        <div>
                            <p className="text-sm text-slate-500">
                                Last Export
                            </p>
                            <h2 className="mt-1 text-3xl font-bold">
                                {lastExport}
                            </h2>
                        </div>
                        <Clock className="text-slate-300" size={28} />
                    </div>

                    <div className="flex items-center justify-between rounded-3xl border bg-white p-6 shadow-sm transition hover:border-indigo-300">
                        <div>
                            <p className="text-sm text-slate-500">
                                Available Reports
                            </p>
                            <h2 className="mt-1 text-3xl font-bold">
                                {reportTypes.length}
                            </h2>
                        </div>
                        <FileText className="text-slate-300" size={28} />
                    </div>

                </section>

                {/* Compact info cards */}
                <section className="grid grid-cols-1 gap-6 md:grid-cols-3">

                    <div className="flex items-center justify-between rounded-3xl border bg-white p-6 shadow-sm transition hover:border-indigo-300">
                        <div>
                            <p className="text-sm text-slate-500">
                                Available Formats
                            </p>
                            <h3 className="mt-1 text-2xl font-bold">
                                3
                            </h3>
                            <p className="mt-1 text-sm text-slate-400">
                                PDF · Excel · CSV
                            </p>
                        </div>
                        <LayoutGrid className="text-slate-300" size={26} />
                    </div>

                    <div className="flex items-center justify-between rounded-3xl border bg-white p-6 shadow-sm transition hover:border-indigo-300">
                        <div>
                            <p className="text-sm text-slate-500">
                                Included Data
                            </p>
                            <h3 className="mt-1 text-2xl font-bold">
                                AI Reviews
                            </h3>
                            <p className="mt-1 text-sm text-slate-400">
                                Reviews, summaries & insights
                            </p>
                        </div>
                        <Sparkles className="text-slate-300" size={26} />
                    </div>

                    <div className="flex items-center justify-between rounded-3xl border bg-white p-6 shadow-sm transition hover:border-indigo-300">
                        <div>
                            <p className="text-sm text-slate-500">
                                Export Status
                            </p>
                            <h3 className="mt-1 text-2xl font-bold text-green-600">
                                Ready
                            </h3>
                            <p className="mt-1 text-sm text-slate-400">
                                Generated instantly
                            </p>
                        </div>
                        <CheckCircle2 className="text-green-500" size={26} />
                    </div>

                </section>

                {/* Export cards */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {reportTypes.map((report) => {

                        const Icon = report.icon;
                        const isExporting = exporting === report.type;

                        return (

                            <div
                                key={report.type}
                                className="group flex flex-col rounded-3xl border bg-white p-8 shadow-sm transition hover:border-indigo-300 hover:shadow-lg"
                            >

                                <div className="flex items-center gap-3">

                                    <Icon
                                        className={report.iconColor}
                                        size={32}
                                    />

                                    <h2 className="text-2xl font-semibold">

                                        {report.title}

                                    </h2>

                                </div>

                                <p className="mt-3 text-slate-500">

                                    {report.description}

                                </p>

                                <span
                                    className={`mt-4 w-fit rounded-full px-3 py-1 text-xs font-medium ${report.badge.className}`}
                                >

                                    {report.badge.label}

                                </span>

                                <div className="my-6 border-t" />

                                <ul className="grid grid-cols-2 gap-y-2 text-sm text-slate-600">

                                    {report.includes.map((item) => (

                                        <li
                                            key={item}
                                            className="flex items-center gap-2"
                                        >

                                            <Check className="h-3.5 w-3.5 shrink-0 text-green-600" />

                                            {item}

                                        </li>

                                    ))}

                                </ul>

                                <button
                                    onClick={() => exportReport(report.type)}
                                    disabled={exporting !== null}
                                    className={`mt-6 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${report.buttonClass}`}
                                >

                                    {isExporting
                                        ? "Preparing..."
                                        : `Download ${report.title.split(" ")[0]}`}

                                    {!isExporting && (
                                        <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                                    )}

                                </button>

                            </div>

                        );

                    })}

                </div>

                {/* Report contents */}
                <section className="rounded-3xl border bg-white p-8 shadow-sm">

                    <h2 className="text-2xl font-bold">

                        Report Contents

                    </h2>

                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">

                        {reportContents.map((item) => (

                            <div
                                key={item.title}
                                className="rounded-xl bg-slate-50 px-4 py-3 transition hover:bg-indigo-50"
                            >

                                <p className="flex items-center gap-1.5 text-sm font-semibold">
                                    <Check className="h-3.5 w-3.5 text-green-600" />
                                    {item.title}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    {item.subtitle}
                                </p>

                            </div>

                        ))}

                    </div>

                </section>

                {/* Export information banner */}
                <div className="flex items-start gap-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-indigo-50/40 px-6 py-5">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100">
                        <Info className="h-4 w-4 text-indigo-600" />
                    </div>

                    <div className="text-sm text-indigo-900">

                        <p className="font-semibold">
                            Every exported report includes
                        </p>

                        <p className="mt-1 text-indigo-700">
                            AI summaries · sentiment analysis · categories · keywords · suggested replies
                        </p>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}