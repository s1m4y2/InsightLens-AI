"use client";

import { Review } from "@/types/review";
import { formatDate } from "@/lib/format";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Badge from "../ui/Badge";
import { Star, Copy, Tag, MessageCircle, Sparkles, TrendingUp, Check } from "lucide-react";
import { toast } from "sonner";

interface Props {
  review: Review | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReviewDetailsDialog({
  review,
  open,
  onOpenChange,
}: Props) {
  if (!review) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-2xl md:max-w-4xl lg:max-w-6xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Review Details
          </DialogTitle>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Review #{review.id}</span>
            <span>•</span>
            <span>{formatDate(review.created_at)}</span>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          {/* Original Review + AI Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-3 rounded-2xl border p-4">
              <h3 className="font-semibold text-slate-900">Original Review</h3>

              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < (review.rating ?? 0)
                        ? "h-5 w-5 fill-yellow-400 text-yellow-400"
                        : "h-5 w-5 text-slate-300"
                    }
                  />
                ))}
              </div>

              <p className="rounded-xl bg-slate-50 p-4 leading-7 text-slate-700">
                {review.review_text}
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">AI Summary</h3>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(review.summary);
                    toast.success("Summary copied!");
                  }}
                  className="flex shrink-0 items-center gap-1 rounded-lg border px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </button>
              </div>

              <p className="rounded-xl bg-indigo-50 p-4 leading-7 text-slate-700">
                {review.summary}
              </p>
            </div>
          </div>

          {/* Sentiment / Emotion / Confidence / Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 rounded-2xl border">
            <div className="p-4">
              <p className="mb-2 text-sm font-semibold text-slate-900">
                Sentiment
              </p>
              <Badge color="green">{review.sentiment}</Badge>
            </div>

            <div className="p-4">
              <p className="mb-2 text-sm font-semibold text-slate-900">
                Emotion
              </p>
              <Badge color="blue">{review.emotion}</Badge>
            </div>

            <div className="p-4">
              <p className="mb-2 whitespace-nowrap text-sm font-semibold text-slate-900">
                AI Confidence
              </p>
              <Badge color="green">
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  %{review.confidence}
                </span>
              </Badge>
            </div>

            <div className="p-4">
              <p className="mb-2 text-sm font-semibold text-slate-900">
                Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {review.categories?.map((category) => (
                  <Badge key={category}>{category}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div className="space-y-3 rounded-2xl border p-4">
            <h3 className="flex items-center gap-2 font-semibold text-slate-900">
              <Tag className="h-4 w-4" />
              Keywords
            </h3>

            <div className="flex flex-wrap gap-2">
              {review.keywords?.map((keyword) => (
                <Badge key={keyword}>{keyword}</Badge>
              ))}
            </div>
          </div>

          {/* Suggested Reply + AI Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-3 rounded-2xl border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 whitespace-nowrap font-semibold text-slate-900">
                  <MessageCircle className="h-4 w-4" />
                  Suggested Reply
                </h3>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(review.suggested_reply ?? "");
                    toast.success("Reply copied!");
                  }}
                  className="flex shrink-0 items-center gap-1 rounded-lg border px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy Reply
                </button>
              </div>

              <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-700">
                  AI Suggested Reply
                </p>
                <p className="mt-2 leading-7 text-slate-700">
                  {review.suggested_reply}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
                <Sparkles className="h-4 w-4" />
                AI Analysis
              </h3>

              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-slate-900" />
                  {review.sentiment} sentiment detected
                </li>

                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-slate-900" />
                  {review.categories.join(", ")}
                </li>

                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-slate-900" />
                  High confidence ({review.confidence}%)
                </li>

                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-slate-900" />
                  Suggested reply generated
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}