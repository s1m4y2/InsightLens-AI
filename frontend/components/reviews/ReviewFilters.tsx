"use client";

import {
  Search,
  RotateCcw,
  Download,
} from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  sentiment: string;
  setSentiment: (value: string) => void;

  emotion: string;
  setEmotion: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  onReset: () => void;
  onExport: () => void;
}

export default function ReviewFilters({
  search,
  setSearch,
  sentiment,
  setSentiment,
  emotion,
  setEmotion,
  category,
  setCategory,
  onReset,
  onExport,
  
}: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">

        {/* Search */}

        <div className="relative lg:col-span-2">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none transition focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        {/* Sentiment */}

        <select
          value={sentiment}
          onChange={(e) => setSentiment(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
        >

          <option value="All">All Sentiments</option>
          <option value="Positive">Positive</option>
          <option value="Negative">Negative</option>
          <option value="Mixed">Mixed</option>

        </select>

        {/* Emotion */}

        <select
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
        >

            <option value="All">All Emotions</option>

            <option value="Joy">Joy</option>

            <option value="Disappointment">
                Disappointment
            </option>

        </select>

        {/* Category */}

        <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
        >

            <option value="All">All Categories</option>

            <option value="Product Quality">
                Product Quality
            </option>

            <option value="Product Satisfaction">
                Product Satisfaction
            </option>

            <option value="Retail">
                Retail
            </option>

        </select>

        {/* Reset */}

        <button onClick={onReset} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:bg-slate-100">

          <RotateCcw size={16} />

          Reset

        </button>

        {/* Export */}

        <button onClick={onExport} className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700">

          <Download size={16} />

          Export

        </button>

      </div>

    </section>
    
  );
}