"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReviewHeader from "@/components/reviews/ReviewHeader";
import ReviewStats from "@/components/reviews/ReviewStats";
import ReviewFilters from "@/components/reviews/ReviewFilters";
import ReviewsTable from "@/components/reviews/ReviewsTable";
import ReviewDetailsDialog from "@/components/reviews/ReviewDetailsDialog";
import { useDebounce } from "@/hooks/useDebounce";
import { Review } from "@/types/review";
import { toast } from "sonner";
import DeleteReviewDialog from "@/components/reviews/DeleteReviewDialog";
import { useReviews } from "@/hooks/useReviews";

export default function ReviewsPage() {
    const router = useRouter();
    useEffect(() => {

        const token = localStorage.getItem("access_token");

        if (!token) {

            router.push("/login");

        }

    }, [router]);
    
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [sentiment, setSentiment] = useState("All");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [page,setPage]=useState(1);
    const [emotion, setEmotion] = useState("All");
    const [category, setCategory] = useState("All");
    const {

        data,

        isLoading,

        refetch,

    }=useReviews({

        page,

        search: debouncedSearch,

        sentiment,

        emotion,

        category,

        });
    {isLoading && (

        <div className="mb-4 text-sm text-slate-500">

            Loading...

        </div>

    )}
    const exportCSV = () => {
        const headers = [
            "id",
            "review",
            "summary",
            "sentiment",
        ];
        const rows = (data?.items ?? []).map((r: Review) => [

            r.id,

            r.review_text,

            r.summary,

            r.sentiment,

        ].join(","));
        const csv = [headers.join(","), ...rows,].join("\n");
        const blob = new Blob([csv]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
            a.href = url;
            a.download = "reviews.csv";
            a.click();
    };
    useEffect(() => {

        setPage(1);

    }, [search, sentiment, emotion, category]);
    console.log({search, sentiment,});

  return (
    <DashboardLayout>
        <div className="space-y-8">
            <ReviewHeader />

            <ReviewStats

                total={data?.total ?? 0}

                positive={
                    data?.items.filter(
                        (r: Review) => r.sentiment === "Positive"
                    ).length ?? 0
                }

                negative={
                    data?.items.filter(
                        (r: Review) => r.sentiment === "Negative"
                    ).length ?? 0
                }

                mixed={
                    data?.items.filter(
                        (r: Review) => r.sentiment === "Mixed"
                    ).length ?? 0
                }

            />

            <ReviewFilters
                search={search}
                setSearch={setSearch}

                sentiment={sentiment}
                setSentiment={setSentiment}

                emotion={emotion}
                setEmotion={setEmotion}

                category={category}
                setCategory={setCategory}

                onReset={() => {
                    setSearch("");
                    setSentiment("All");
                    setEmotion("All");
                    setCategory("All");
                }}

                onExport={exportCSV}
                
            />
            
            <ReviewsTable
                reviews={data?.items ?? []}
                onView={(review) => {
                    setSelectedReview(review);
                    setDialogOpen(true);
                }}
                onAnalyze={(review)=>{

                    const loading = toast.loading(
                        "AI is analyzing review..."
                    );

                    setTimeout(() => {

                        toast.dismiss(loading);

                        toast.success(
                            `Analysis completed for Review #${review.id}`
                        );

                    }, 1500);

                }}
                onDelete={(review)=>{
                    setSelectedReview(review);
                    setDeleteOpen(true);
                }}

                
            />
            <div className="flex items-center justify-end gap-4 border-t p-4">

                <button
                    disabled={!data?.has_previous}
                    onClick={() => setPage(page - 1)}
                    className="rounded-lg border px-4 py-2 disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="font-medium">
                    {data?.page} / {data?.total_pages}
                </span>

                <button
                    disabled={!data?.has_next}
                    onClick={() => setPage(page + 1)}
                    className="rounded-lg border px-4 py-2 disabled:opacity-50"
                >
                    Next
                </button>

            </div>
        </div>

        <ReviewDetailsDialog
            review={selectedReview}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
        />
        <DeleteReviewDialog

            open={deleteOpen}

            onOpenChange={setDeleteOpen}

            onConfirm={() => {

                if (!selectedReview) return;

                toast.success("Review deleted.");

                setDeleteOpen(false);

                refetch();

            }}

        />
    </DashboardLayout>
  );
}