import { Loader2 } from "lucide-react";
interface Props {
    value: string;
    onChange: (value: string) => void;
    onAnalyze: () => void;
    loading: boolean;
    disabled?: boolean;
}

export default function AnalyzeInput({
    value,
    onChange,
    onAnalyze,
    loading,
    disabled,
}: Props) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <label className="mb-3 block font-semibold">
                Customer Review
            </label>

            <textarea
                rows={8}
                disabled={disabled}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Paste a customer review..."
                className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
                disabled={loading || !value.trim()}
                onClick={onAnalyze}
                className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing...
                    </>
                ) : (
                    <>
                        ✨ Analyze Review
                    </>
                )}
            </button>

        </div>
    );
}