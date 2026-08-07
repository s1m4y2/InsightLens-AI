"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function ReviewHeader() {
  const router = useRouter();
  return (
    <section className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div>
        <h1 className="text-4xl font-bold">
          Reviews
        </h1>

        <p className="mt-2 text-slate-500">
          Manage and monitor AI-analyzed customer reviews.
        </p>
      </div>

      <button

            onClick={() => router.push("/analyze")}

            className="..."

        >

            <Plus size={18}/>

            Analyze Review

        </button>

    </section>
  );
}