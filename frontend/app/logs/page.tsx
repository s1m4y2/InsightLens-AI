"use client";

import { useEffect, useState } from "react";
import {
    Search,
    ScrollText,
    Clock,
    Cpu,
    ChevronRight,
    X,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
    getAILogs,
    getAILog,
    AILog,
} from "@/services/ai-log.service";


export default function AILogsPage() {

    const [logs, setLogs] = useState<AILog[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [search, setSearch] =
        useState("");

    const [selectedLog, setSelectedLog] =
        useState<AILog | null>(null);

    const [detailLoading, setDetailLoading] =
        useState(false);
    

    // =========================
    // LOAD LOGS
    // =========================

    useEffect(() => {

        async function loadLogs() {

            try {

                setLoading(true);

                const data =
                    await getAILogs();

                setLogs(data);

            } catch (error) {

                console.error(
                    "Failed to load AI logs:",
                    error
                );

                setError(
                    "AI logs could not be loaded."
                );

            } finally {

                setLoading(false);

            }

        }

        loadLogs();

    }, []);


    // =========================
    // SEARCH
    // =========================

    const filteredLogs =
        logs.filter((log) => {

            const query =
                search.toLowerCase();

            return (

                log.module
                    .toLowerCase()
                    .includes(query)

                ||

                log.version
                    .toLowerCase()
                    .includes(query)

                ||

                log.provider
                    .toLowerCase()
                    .includes(query)

            );

        });


    // =========================
    // OPEN DETAIL
    // =========================

    async function handleOpenLog(
        logId: number
    ) {

        try {

            setDetailLoading(true);

            const log =
                await getAILog(logId);

            setSelectedLog(log);

        } catch (error) {

            console.error(
                "Failed to load AI log:",
                error
            );

        } finally {

            setDetailLoading(false);

        }

    }


    // =========================
    // FORMAT DATE
    // =========================

    function formatDate(
        date: string
    ) {

        return new Date(date)
            .toLocaleString(
                "tr-TR",
                {
                    dateStyle: "medium",
                    timeStyle: "short",
                }
            );

    }


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex min-h-[500px] items-center justify-center">

                    <div className="text-center">

                        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

                        <p className="text-sm text-slate-500">

                            Loading AI logs...

                        </p>

                    </div>

                </div>

            </DashboardLayout>

        );

    }


    // =========================
    // ERROR
    // =========================

    if (error) {

        return (

            <DashboardLayout>

                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

                    <h2 className="font-semibold text-red-700">

                        Unable to load AI logs

                    </h2>

                    <p className="mt-2 text-sm text-red-600">

                        {error}

                    </p>

                </div>

            </DashboardLayout>

        );

    }


    return (

        <DashboardLayout>

            <div className="space-y-8">


                {/* =========================
                    HEADER
                ========================= */}

                <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="rounded-2xl bg-indigo-100 p-3">

                                    <ScrollText
                                        className="text-indigo-600"
                                        size={24}
                                    />

                                </div>

                                <div>

                                    <h1 className="text-3xl font-bold">

                                        AI Logs

                                    </h1>

                                    <p className="mt-1 text-slate-500">

                                        Monitor AI requests and responses.

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* TOTAL */}

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4">

                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">

                                Total Logs

                            </p>

                            <p className="mt-1 text-2xl font-bold">

                                {logs.length}

                            </p>

                        </div>

                    </div>

                </section>


                {/* =========================
                    SEARCH
                ========================= */}

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="relative">

                        <Search
                            size={18}
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                        />

                        <input
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder="Search by module, version or provider..."
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                py-3
                                pl-11
                                pr-4
                                outline-none
                                transition
                                focus:border-indigo-400
                                focus:ring-2
                                focus:ring-indigo-100
                            "
                        />

                    </div>

                </section>


                {/* =========================
                    TABLE
                ========================= */}

                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="border-b bg-slate-50">

                                <tr>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">

                                        Module

                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">

                                        Version

                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">

                                        Provider

                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">

                                        Execution

                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">

                                        Created

                                    </th>

                                    <th className="px-6 py-4" />

                                </tr>

                            </thead>


                            <tbody className="divide-y">

                                {filteredLogs.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={6}
                                            className="px-6 py-16 text-center"
                                        >

                                            <ScrollText
                                                size={40}
                                                className="mx-auto text-slate-300"
                                            />

                                            <p className="mt-4 font-medium text-slate-600">

                                                No AI logs found

                                            </p>

                                            <p className="mt-1 text-sm text-slate-400">

                                                Try another search.

                                            </p>

                                        </td>

                                    </tr>

                                ) : (

                                    filteredLogs.map(
                                        (log) => (

                                            <tr
                                                key={log.id}
                                                className="transition hover:bg-slate-50"
                                            >

                                                {/* MODULE */}

                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-3">

                                                        <div className="rounded-xl bg-indigo-100 p-2">

                                                            <Cpu
                                                                size={18}
                                                                className="text-indigo-600"
                                                            />

                                                        </div>

                                                        <span className="font-semibold">

                                                            {log.module}

                                                        </span>

                                                    </div>

                                                </td>


                                                {/* VERSION */}

                                                <td className="px-6 py-5">

                                                    <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium">

                                                        {log.version}

                                                    </span>

                                                </td>


                                                {/* PROVIDER */}

                                                <td className="px-6 py-5">

                                                    <span className="text-sm font-medium">

                                                        {log.provider}

                                                    </span>

                                                </td>


                                                {/* EXECUTION */}

                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-2 text-sm text-slate-600">

                                                        <Clock size={16} />

                                                        {log.execution_time_ms !== null
                                                            ? `${log.execution_time_ms} ms`
                                                            : "-"
                                                        }

                                                    </div>

                                                </td>


                                                {/* CREATED */}

                                                <td className="px-6 py-5 text-sm text-slate-500">

                                                    {formatDate(
                                                        log.created_at
                                                    )}

                                                </td>


                                                {/* DETAIL */}

                                                <td className="px-6 py-5 text-right">

                                                    <button
                                                        onClick={() =>
                                                            handleOpenLog(log.id)
                                                        }
                                                        disabled={detailLoading}
                                                        className="
                                                            inline-flex
                                                            items-center
                                                            gap-1
                                                            rounded-xl
                                                            px-3
                                                            py-2
                                                            text-sm
                                                            font-semibold
                                                            text-indigo-600
                                                            hover:bg-indigo-50
                                                            disabled:cursor-not-allowed
                                                            disabled:opacity-50
                                                        "
                                                    >

                                                        {detailLoading
                                                            ? "Loading..."
                                                            : "Details"
                                                        }

                                                        {!detailLoading && (
                                                            <ChevronRight size={16} />
                                                        )}

                                                    </button>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </section>

            </div>


            {/* =========================
                DETAIL MODAL
            ========================= */}

            {selectedLog && (

                <div
                    className="
                        fixed
                        inset-0
                        z-[100]
                        flex
                        items-center
                        justify-center
                        bg-black/40
                        p-6
                    "
                    onClick={() =>
                        setSelectedLog(null)
                    }
                >

                    <div
                        className="
                            max-h-[90vh]
                            w-full
                            max-w-4xl
                            overflow-hidden
                            rounded-3xl
                            bg-white
                            shadow-2xl
                        "
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* MODAL HEADER */}

                        <div className="flex items-center justify-between border-b p-6">

                            <div>

                                <h2 className="text-xl font-bold">

                                    AI Log Details

                                </h2>

                                <p className="mt-1 text-sm text-slate-500">

                                    {selectedLog.module} · {selectedLog.version}

                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    setSelectedLog(null)
                                }
                                className="rounded-xl p-2 hover:bg-slate-100"
                            >

                                <X size={20} />

                            </button>

                        </div>


                        {/* MODAL CONTENT */}

                        <div className="max-h-[calc(90vh-90px)] space-y-6 overflow-y-auto p-6">


                            {/* METADATA */}

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

                                <div className="rounded-2xl bg-slate-50 p-4">

                                    <p className="text-xs uppercase text-slate-400">

                                        Module

                                    </p>

                                    <p className="mt-1 font-semibold">

                                        {selectedLog.module}

                                    </p>

                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4">

                                    <p className="text-xs uppercase text-slate-400">

                                        Version

                                    </p>

                                    <p className="mt-1 font-semibold">

                                        {selectedLog.version}

                                    </p>

                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4">

                                    <p className="text-xs uppercase text-slate-400">

                                        Provider

                                    </p>

                                    <p className="mt-1 font-semibold">

                                        {selectedLog.provider}

                                    </p>

                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4">

                                    <p className="text-xs uppercase text-slate-400">

                                        Execution

                                    </p>

                                    <p className="mt-1 font-semibold">

                                        {selectedLog.execution_time_ms !== null
                                            ? `${selectedLog.execution_time_ms} ms`
                                            : "-"
                                        }

                                    </p>

                                </div>

                            </div>


                            {/* PROMPT */}

                            <div>

                                <h3 className="mb-2 font-semibold">

                                    Prompt

                                </h3>

                                <pre className="
                                    whitespace-pre-wrap
                                    rounded-2xl
                                    bg-slate-900
                                    p-5
                                    text-sm
                                    leading-6
                                    text-slate-100
                                    overflow-x-auto
                                ">

                                    {selectedLog.prompt}

                                </pre>

                            </div>


                            {/* RESPONSE */}

                            <div>

                                <h3 className="mb-2 font-semibold">

                                    Response

                                </h3>

                                <pre className="
                                    whitespace-pre-wrap
                                    rounded-2xl
                                    bg-slate-50
                                    p-5
                                    text-sm
                                    leading-6
                                    text-slate-700
                                    overflow-x-auto
                                ">

                                    {selectedLog.response}

                                </pre>

                            </div>

                            {/* CREATED */}

                            <div>

                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">

                                    Created At

                                </p>

                                <p className="mt-1 text-sm text-slate-600">

                                    {formatDate(
                                        selectedLog.created_at
                                    )}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </DashboardLayout>

    );

}