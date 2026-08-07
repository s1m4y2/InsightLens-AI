"use client";

import { toast } from "sonner";

import {
    CheckCircle2,
    BrainCircuit,
    Sparkles,
    Star,
    Copy,
} from "lucide-react";

import Badge from "@/components/ui/Badge";

interface Props {
    result: {
        summary: string;
        sentiment: string;
        emotion: string;
        category: string;
        confidence: number;
        keywords: string[];
        suggested_reply: string;
    };
}

export default function AnalyzeResult({
    result,
}: Props) {

    const copySummary = () => {

        navigator.clipboard.writeText(result.summary);

        toast.success("Summary copied.");

    };

    const copyReply = () => {

        navigator.clipboard.writeText(result.suggested_reply);

        toast.success("Reply copied.");

    };

    return (

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            {/* Header */}

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h2 className="text-3xl font-bold">

                        AI Analysis Result

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Generated using Google Gemini AI

                    </p>

                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white">

                    <BrainCircuit size={30} />

                </div>

            </div>

            {/* Summary */}

            <div className="space-y-3">

                <div className="flex items-center justify-between">

                    <h3 className="font-semibold">

                        AI Summary

                    </h3>

                    <button
                        onClick={copySummary}
                        className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition hover:bg-slate-100"
                    >
                        <Copy size={16} />

                        Copy

                    </button>

                </div>

                <div className="rounded-2xl bg-indigo-50 p-5">

                    <p className="leading-7 text-slate-700">

                        {result.summary}

                    </p>

                </div>

            </div>

            {/* Info Cards */}

            <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">

                <div className="rounded-2xl border bg-slate-50 p-5">

                    <p className="mb-3 text-sm text-slate-500">

                        Sentiment

                    </p>

                    <Badge color="green">

                        {result.sentiment}

                    </Badge>

                </div>

                <div className="rounded-2xl border bg-slate-50 p-5">

                    <p className="mb-3 text-sm text-slate-500">

                        Emotion

                    </p>

                    <Badge color="blue">

                        {result.emotion}

                    </Badge>

                </div>

                <div className="rounded-2xl border bg-slate-50 p-5">

                    <p className="mb-3 text-sm text-slate-500">

                        Category

                    </p>

                    <Badge>

                        {result.category}

                    </Badge>

                </div>

                <div className="rounded-2xl border bg-slate-50 p-5">

                    <p className="mb-3 text-sm text-slate-500">

                        AI Confidence

                    </p>

                    <Badge color="green">

                        %{result.confidence}

                    </Badge>

                </div>

            </div>

            {/* Keywords */}

            <div className="mt-8">

                <h3 className="mb-4 font-semibold">

                    Keywords

                </h3>

                <div className="flex flex-wrap gap-3">

                    {result.keywords.map((keyword) => (

                        <Badge
                            key={keyword}
                        >
                            {keyword}
                        </Badge>

                    ))}

                </div>

            </div>

            {/* Suggested Reply */}

            <div className="mt-8">

                <div className="mb-3 flex items-center justify-between">

                    <h3 className="font-semibold">

                        Suggested Reply

                    </h3>

                    <button
                        onClick={copyReply}
                        className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm shadow transition hover:bg-slate-50"
                    >

                        <Copy size={16} />

                        Copy Reply

                    </button>

                </div>

                <div className="rounded-2xl border border-green-200 bg-green-50 p-6">

                    <p className="mb-3 font-semibold text-green-700">

                        AI Generated Response

                    </p>

                    <p className="leading-7">

                        {result.suggested_reply}

                    </p>

                </div>

            </div>

            {/* AI Analysis */}

            <div className="mt-8 rounded-2xl border bg-slate-50 p-6">

                <div className="mb-5 flex items-center gap-3">

                    <Sparkles className="text-indigo-600" />

                    <h3 className="font-semibold">

                        AI Analysis

                    </h3>

                </div>

                <ul className="space-y-3 text-sm">

                    <li className="flex items-center gap-2">

                        <CheckCircle2
                            size={18}
                            className="text-green-600"
                        />

                        Positive sentiment detected

                    </li>

                    <li className="flex items-center gap-2">

                        <CheckCircle2
                            size={18}
                            className="text-green-600"
                        />

                        High confidence ({result.confidence}%)

                    </li>

                    <li className="flex items-center gap-2">

                        <CheckCircle2
                            size={18}
                            className="text-green-600"
                        />

                        Product category identified

                    </li>

                    <li className="flex items-center gap-2">

                        <CheckCircle2
                            size={18}
                            className="text-green-600"
                        />

                        Suggested reply generated

                    </li>

                </ul>

            </div>

            {/* Rating */}

            <div className="mt-8">

                <h3 className="mb-4 font-semibold">

                    AI Quality Score

                </h3>

                <div className="flex gap-2">

                    {[...Array(5)].map((_, index) => (

                        <Star
                            key={index}
                            className="h-6 w-6 fill-yellow-400 text-yellow-400"
                        />

                    ))}

                </div>

            </div>

            {/* Save */}

            <button
                onClick={() =>
                    toast.success("Review saved successfully.")
                }
                className="mt-10 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 text-lg font-semibold text-white transition hover:opacity-90"
            >

                Save to Reviews

            </button>
            
        </section>

    );

}