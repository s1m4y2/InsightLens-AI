"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAnalyzeReview } from "@/hooks/useAnalyzeReview";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import AnalyzeHeader from "@/components/analyze/AnalyzeHeader";
import AnalyzeInput from "@/components/analyze/AnalyzeInput";
import AnalyzeLoading from "@/components/analyze/AnalyzeLoading";
import AnalyzeResult from "@/components/analyze/AnalyzeResult";
import { toast } from "sonner";

export default function AnalyzePage() {
const router = useRouter();
useEffect(()=>{

    const token = localStorage.getItem("access_token");

    if(!token){

        router.push("/login");

    }

},[]);
const [review, setReview] = useState("");
const [result, setResult] = useState<any>(null);
const analyzeMutation = useAnalyzeReview();
const analyze = async () => {

    if (!review.trim()) return;

    setResult(null);

    const loading = toast.loading(
        "Gemini is analyzing..."
    );

    try {

        const result =
            await analyzeMutation.mutateAsync(review);

        toast.dismiss(loading);

        setResult(result);

        toast.success(
            "Analysis completed."
        );

    }

    catch (error: any) {

        toast.dismiss(loading);

        toast.error(
            error.response?.data?.detail?.[0]?.msg ??
            error.response?.data?.detail ??
            "Analysis failed."
        );

    }

};
    return (

    <DashboardLayout>

        <div className="space-y-8">

            <AnalyzeHeader />

            <AnalyzeInput

                value={review}

                onChange={setReview}

                onAnalyze={analyze}

                loading={analyzeMutation.isPending}
                disabled={analyzeMutation.isPending}

            />

            {analyzeMutation.isPending && (
                <AnalyzeLoading />
            )}

            {result && !analyzeMutation.isPending && (

            <>
                <AnalyzeResult result={result} />

                <div className="flex justify-end">

                    <button
                        onClick={() => {
                            setReview("");
                            setResult(null);
                        }}
                        className="rounded-xl border border-slate-300 bg-white px-5 py-3 transition hover:bg-slate-50"
                    >
                        New Analysis
                    </button>

                </div>
            </>

        )}

        </div>

    </DashboardLayout>

);

}