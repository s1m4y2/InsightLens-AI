import { MoreVertical } from "lucide-react";
import { Review } from "@/types/review";
import ReviewActionMenu from "@/components/reviews/ReviewActionMenu";
import { formatDate } from "@/lib/format";
import { Search } from "lucide-react";

interface Props {
    reviews: Review[];

    onView: (review: Review) => void;

    onAnalyze: (review: Review) => void;

    onDelete: (review: Review) => void;
}

export default function ReviewsTable({
    reviews, onView, onAnalyze, onDelete,
}: Props) {
    if (reviews.length === 0) {

        return (

            <div className="rounded-2xl bg-white p-16 text-center">

                <Search className="mx-auto mb-4 h-10 w-10 text-slate-400" />

                <h3 className="text-lg font-semibold">

                    No reviews found

                </h3>

                <p className="mt-2 text-slate-500">

                    Try adjusting your search or filters.

                </p>

            </div>

        );

    }

    return (

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <table className="w-full">

                <thead>

                    <tr className="border-b bg-slate-50">

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Review
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Summary
                        </th>

                        <th className="px-6 py-4">
                            Sentiment
                        </th>

                        <th className="px-6 py-4">
                            Emotion
                        </th>

                        <th className="px-6 py-4">
                            Category
                        </th>

                        <th className="px-6 py-4">
                            Date
                        </th>

                        <th className="px-6 py-4">
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {reviews.map((review) => (

                        <tr key={review.id} className="border-b transition hover:bg-slate-50">
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                                        {review.review_text.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="max-w-xs">
                                        <p className="line-clamp-2 font-medium">
                                            {review.review_text}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <td className="max-w-sm px-6 py-5">
                                <p className="line-clamp-2 text-slate-600">
                                    {review.summary}
                                </p>
                            </td>

                            <td className="px-6 py-5">
                                <span className={`rounded-full px-4 py-1 text-sm font-medium
                                    ${review.sentiment==="Positive" ? "bg-green-100 text-green-700" : review.sentiment==="Negative" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                                    {review.sentiment}
                                </span>
                            </td>

                            <td className="px-6 py-5">
                                <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-700">
                                    {review.emotion}
                                </span>
                            </td>

                            <td className="px-6 py-5">
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                                    {review.categories.join(", ")}
                                </span>
                            </td>

                            <td>
                                {formatDate(review.created_at)}
                            </td>

                            <td className="px-6 py-5 text-right">

                                <ReviewActionMenu
                                    onView={() => onView(review)}
                                    onAnalyze={() => onAnalyze(review)}
                                    onDelete={() => onDelete(review)}
                                />

                            </td>

                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    );
}