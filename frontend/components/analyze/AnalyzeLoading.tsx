import { Loader2 } from "lucide-react";

export default function AnalyzeLoading() {
    return (
        <div className="rounded-3xl border bg-white p-10">

            <div className="flex flex-col items-center">

                <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />

                <h3 className="mt-5 text-2xl font-bold">
                    Gemini AI is analyzing...
                </h3>

                <p className="mt-2 text-slate-500">
                    Please wait while the review is processed.
                </p>

            </div>

            <div className="mt-8 space-y-3">

                <div className="animate-pulse rounded-xl bg-slate-100 p-4">
                    🔍 Detecting sentiment...
                </div>

                <div className="animate-pulse rounded-xl bg-slate-100 p-4">
                    😊 Identifying emotion...
                </div>

                <div className="animate-pulse rounded-xl bg-slate-100 p-4">
                    🏷 Extracting keywords...
                </div>

                <div className="animate-pulse rounded-xl bg-slate-100 p-4">
                    ✍ Generating AI reply...
                </div>

            </div>

        </div>
    );
}