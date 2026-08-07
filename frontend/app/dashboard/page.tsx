"use client";
import { useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import EmotionChart from "@/components/charts/EmotionChart";
import SummaryCards from "@/components/dashboard/SummaryCards";
import RecentReviews from "@/components/dashboard/RecentReviews";
import BusinessInsights from "@/components/dashboard/BusinessInsights";
import { useAnalytics } from "@/hooks/useAnalytics";
import SentimentChart from "@/components/charts/SentimentChart";
import CategoryChart from "@/components/charts/CategoryChart";
import ReviewTrendChart from "@/components/charts/ReviewTrendChart";
import { useDashboard } from "@/hooks/useDashboard";
import { useRouter } from "next/navigation";
import { useBusinessInsights } from "@/hooks/useBusinessInsights";

export default function DashboardPage() {
  const router = useRouter();
  useEffect(()=>{

        const token = localStorage.getItem("access_token");

        if(!token){

            router.push("/login");

        }

    },[]);
  const {
    data: dashboard,
    isLoading,
    error,
  } = useDashboard();

  const {
    data: insights,
  } = useBusinessInsights();

  const {
      data: analytics,
      isLoading: analyticsLoading,
  } = useAnalytics();

  if (isLoading || analyticsLoading) {
    return (
      <DashboardLayout>
        <div className="p-10">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  console.log("dashboard", dashboard);
console.log("dashboard error", error);
console.log("analytics", analytics);
console.log("insights", insights);

if (error) {
    return (
        <DashboardLayout>
            <pre className="p-10">
                {JSON.stringify(error, null, 2)}
            </pre>
        </DashboardLayout>
    );
}

  const positive = analytics?.sentiment_chart.find((x: { label: string; })=>x.label==="Positive")?.count ?? 0;

  const negative = analytics?.sentiment_chart.find((x: { label: string; })=>x.label==="Negative")?.count ?? 0;

  const mixed = analytics?.sentiment_chart.find((x: { label: string; })=>x.label==="Mixed")?.count ?? 0;

  return (
    <DashboardLayout>

      <div className="space-y-8 rounded-3xl bg-slate-50 p-2">

        {/* HEADER */}

        <section className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div>

              <h1 className="text-4xl font-bold">

                  Dashboard

              </h1>

              <p className="mt-2 text-slate-500">

                  Welcome back 👋 Here's what's happening today.

              </p>

          </div>

          <div className="hidden lg:flex gap-3">

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">

                <p className="text-xs text-slate-400">

                    STATUS

                </p>

                <p className="font-semibold text-green-600">

                    ● Online

                </p>

            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">

                <p className="text-xs text-slate-400">

                    MODEL

                </p>

                <p className="font-semibold">

                    Gemini 3 Flash

                </p>

            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">

                <p className="text-xs text-slate-400">

                    DATABASE

                </p>

                <p className="font-semibold">

                    PostgreSQL

                </p>

            </div>

        </div>

      </section>

      

        {/* SUMMARY */}

        <SummaryCards data={dashboard} />

        {/* ANALYTICS */}

        <section className="space-y-6">

          <div className="flex items-center justify-between">

            <div>

                <h2 className="text-2xl font-bold">

                    Customer Analytics

                </h2>

                <p className="mt-1 text-slate-500">

                    AI-powered analytics from customer feedback

                </p>

            </div>

            <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">

                Live Dashboard

            </span>

        </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

              <SentimentChart
                  positive={positive}
                  negative={negative}
                  mixed={mixed}
              />

              <CategoryChart
                  data={analytics?.category_chart ?? []}
              />

              <EmotionChart
                  data={analytics?.emotion_chart ?? []}
              />

          </div>

          <div className="mt-6">

              <ReviewTrendChart
                  data={analytics?.review_trend ?? []}
              />

          </div>

        </section>

        {/* REVIEWS */}

        <section className="space-y-6">

          <div className="flex items-center justify-between">

              <div>

                  <h2 className="text-2xl font-bold">
                      Recent Reviews
                  </h2>

                  <p className="text-slate-500">
                      Latest AI analyzed reviews.
                  </p>

              </div>

              <button
                    onClick={() => router.push("/reviews")}
                    className="rounded-xl bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
                >
                    View All
                </button>

          </div>

          <RecentReviews
              reviews={dashboard.recent_reviews}
          />

      </section>

        {/* BUSINESS */}

        {insights && (

          <section className="space-y-6">

              <div>

                  <h2 className="text-2xl font-bold">

                      AI Business Insights

                  </h2>

                  <p className="text-slate-500">

                      Executive summary and recommendations generated by Gemini.

                  </p>

              </div>

              <BusinessInsights
                  data={insights}
              />

          </section>

          )}
      <footer className="mt-12 border-t border-slate-200 py-8 text-center text-sm text-slate-400">

          © 2026 InsightLens AI • Built with FastAPI, Next.js & Google Gemini

      </footer>
      </div>

    </DashboardLayout>
  );
}