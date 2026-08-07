"use client";

import { formatDate } from "@/lib/format";
import { useRouter } from "next/navigation";
interface Review {
  id: number;
  review_text: string;
  summary: string;
  sentiment: string;
  emotion: string;
  created_at: string;
}

interface Props {
  reviews: Review[];
}

export default function RecentReviews({
  reviews,
}: Props) {
  const router = useRouter();
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-hidden rounded-2xl border">
        

        <table className="w-full">

          <thead>

            <tr className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">

              <th className="px-6 py-4">Review</th>

              <th className="px-6 py-4">Summary</th>

              <th className="px-6 py-4">Sentiment</th>

              <th className="px-6 py-4">Emotion</th>

              <th className="px-6 py-4">Created</th>

            </tr>

          </thead>

          <tbody>

            {reviews.map((review) => (

              <tr
                  key={review.id}
                  onClick={() => router.push(`/reviews?id=${review.id}`)}
                  className="cursor-pointer border-b transition hover:bg-slate-50"
              >

                <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                        <div className=" flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                            {review.review_text.charAt(0).toUpperCase()}
                        </div>

                        <div className="max-w-xs">
                            <p className="font-medium line-clamp-2">
                                {review.review_text}
                            </p>
                        </div>

                    </div>

                </td>

                <td className="px-6 py-5 max-w-md">
                  <p className="line-clamp-3 text-slate-600 leading-6">
                      {review.summary}
                  </p>
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`rounded-full px-4 py-1 text-sm font-medium

                    ${
                      review.sentiment === "Positive"
                        ? "bg-green-100 text-green-700"

                        : review.sentiment === "Negative"

                        ? "bg-red-100 text-red-700"

                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >

                    {review.sentiment}

                  </span>

                </td>

                <td className="px-6 py-5">
                    <span className=" rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-sm">
                        {review.emotion}
                    </span>
                </td>

                <td>
                  {formatDate(review.created_at)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}