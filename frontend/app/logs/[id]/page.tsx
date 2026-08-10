"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    Clock3,
    Cpu,
    FileText,
    Loader2,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
    getAILog,
    AILog,
} from "@/services/ai-log.service";


export default function AILogDetailPage() {

    const router = useRouter();

    const params = useParams();

    const id = Number(
        params.id
    );

    const [log, setLog] =
        useState<AILog | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);


    useEffect(() => {

        const token =
            localStorage.getItem(
                "access_token"
            );

        if (!token) {

            router.push("/login");

            return;

        }


        async function loadLog() {

            try {

                const data =
                    await getAILog(id);

                setLog(data);

            } catch (error) {

                console.error(
                    "Failed to load AI log:",
                    error
                );

                setError(
                    "AI log could not be loaded."
                );

            } finally {

                setLoading(false);

            }

        }


        if (
            Number.isFinite(id)
        ) {

            loadLog();

        } else {

            setError(
                "Invalid log ID."
            );

            setLoading(false);

        }

    }, [id, router]);


    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex min-h-[60vh] items-center justify-center">

                    <div className="flex items-center gap-3 text-slate-500">

                        <Loader2
                            size={20}
                            className="animate-spin"
                        />

                        Loading log...

                    </div>

                </div>

            </DashboardLayout>

        );

    }


    if (
        error ||
        !log
    ) {

        return (

            <DashboardLayout>

                <div className="rounded-3xl border border-red-200 bg-red-50 p-8">

                    <h1 className="text-xl font-bold text-red-700">

                        AI Log Not Found

                    </h1>

                    <p className="mt-2 text-red-600">

                        {error ??
                            "The requested AI log does not exist."}

                    </p>

                    <button
                        onClick={() =>
                            router.push(
                                "/logs"
                            )
                        }
                        className="mt-6 rounded-xl bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
                    >

                        Back to Logs

                    </button>

                </div>

            </DashboardLayout>

        );

    }


    return (

        <DashboardLayout>

            <div className="space-y-8 rounded-3xl bg-slate-50 p-2">


                {/* HEADER */}

                <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                    <button
                        onClick={() =>
                            router.push(
                                "/logs"
                            )
                        }
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
                    >

                        <ArrowLeft
                            size={17}
                        />

                        Back to AI Logs

                    </button>


                    <div className="flex items-center gap-4">

                        <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">

                            <Cpu
                                size={25}
                            />

                        </div>

                        <div>

                            <h1 className="text-4xl font-bold">

                                AI Log #{log.id}

                            </h1>

                            <p className="mt-2 text-slate-500">

                                Detailed AI execution information.

                            </p>

                        </div>

                    </div>

                </section>


                {/* METADATA */}

                <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">


                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                        <p className="text-sm text-slate-500">

                            Module

                        </p>

                        <p className="mt-2 font-bold">

                            {log.module}

                        </p>

                    </div>


                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                        <p className="text-sm text-slate-500">

                            Provider

                        </p>

                        <p className="mt-2 font-bold">

                            {log.provider}

                        </p>

                    </div>


                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                        <p className="text-sm text-slate-500">

                            Version

                        </p>

                        <p className="mt-2 font-bold">

                            {log.version}

                        </p>

                    </div>


                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                        <p className="text-sm text-slate-500">

                            Execution Time

                        </p>

                        <div className="mt-2 flex items-center gap-2 font-bold">

                            <Clock3
                                size={17}
                                className="text-indigo-600"
                            />

                            {log.execution_time_ms !== null
                                ? `${log.execution_time_ms} ms`
                                : "—"}

                        </div>

                    </div>


                </section>


                {/* PROMPT */}

                <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex items-center gap-3 border-b border-slate-200 p-6">

                        <FileText
                            size={20}
                            className="text-indigo-600"
                        />

                        <div>

                            <h2 className="text-xl font-bold">

                                Prompt

                            </h2>

                            <p className="text-sm text-slate-500">

                                Input sent to the AI model.

                            </p>

                        </div>

                    </div>


                    <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap p-6 text-sm leading-7 text-slate-700">

                        {log.prompt}

                    </pre>

                </section>


                {/* RESPONSE */}

                <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex items-center gap-3 border-b border-slate-200 p-6">

                        <Cpu
                            size={20}
                            className="text-purple-600"
                        />

                        <div>

                            <h2 className="text-xl font-bold">

                                AI Response

                            </h2>

                            <p className="text-sm text-slate-500">

                                Response returned by the AI model.

                            </p>

                        </div>

                    </div>


                    <pre className="max-h-[700px] overflow-auto whitespace-pre-wrap p-6 text-sm leading-7 text-slate-700">

                        {log.response}

                    </pre>

                </section>


                {/* DATE */}

                <div className="text-center text-sm text-slate-400">

                    Created at{" "}

                    {new Date(
                        log.created_at
                    ).toLocaleString(
                        "tr-TR"
                    )}

                </div>


            </div>

        </DashboardLayout>

    );

}