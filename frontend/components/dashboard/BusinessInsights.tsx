import {
    CheckCircle,
    AlertTriangle,
    Lightbulb,
    BrainCircuit,
} from "lucide-react";

import { BusinessInsights as Insight } from "@/types/business";

interface Props {

    data: Insight;

}

export default function BusinessInsights({

    data,

}: Props) {

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

           

            <div className="mb-8 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-indigo-50 p-6">

                <div className="mb-4 flex items-center gap-3">

                    <BrainCircuit
                        className="text-indigo-600"
                    />

                    <h3 className="text-xl font-bold">

                        Executive Summary

                    </h3>

                </div>

                <p className="max-w-4xl leading-8 text-slate-600">

                    {data.overall_summary}

                </p>

            </div>

            <div className="grid gap-8 lg:grid-cols-3">

                <div>

                    <div className="mb-3 flex items-center gap-2">

                        <CheckCircle
                            className="text-green-600"
                        />

                        <h3 className="text-lg font-bold tracking-tight">

                            Strengths

                        </h3>

                    </div>

                    <ul className="space-y-3">
                        {data.strengths.map((item) => (

                            <li key={item} className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-5 transition hover:-translate-y-1 hover:shadow-md">
                                <CheckCircle
                                    size={18}
                                    className="mt-1 shrink-0 text-green-600"
                                    />

                                    <p className="text-sm leading-6">

                                    {item}

                                    </p>
                            </li>
                        ))}
                    </ul>

                </div>

                <div>

                    <div className="mb-3 flex items-center gap-2">

                        <AlertTriangle className="text-red-500"/>

                        <h3 className="text-lg font-bold tracking-tight">
                            Issues
                        </h3>

                    </div>

                    <ul className="space-y-3">

                        {data.issues.map((item) => (
                            <li key={item} className="flex items-start rounded-xl border border-red-200 bg-red-50 p-5 transition hover:-translate-y-1 hover:shadow-md">
                                <AlertTriangle
                                    size={18}
                                    className="mt-1 shrink-0 text-red-500"
                                />

                                    <p className="text-sm leading-6">

                                    {item}

                                    </p>
                            </li>
                        ))}

                    </ul>

                </div>

                <div>

                    <div className="mb-3 flex items-center gap-2">

                        <Lightbulb
                            className="text-yellow-500"
                        />

                        <h3 className="text-lg font-bold tracking-tight">

                            Recommendations

                        </h3>

                    </div>

                    <ul className="space-y-3">
                        {data.recommendations.map((item) => (
                            <li key={item} className="flex items-start rounded-xl border border-yellow-200 bg-yellow-50 p-5 transition hover:-translate-y-1 hover:shadow-md">
                                <Lightbulb
                                    size={18}
                                    className="mt-1 shrink-0 text-yellow-500"
                                />

                                    <p className="text-sm leading-6">

                                    {item}

                                    </p>
                            </li>
                        ))}

                    </ul>

                </div>

            </div>

        </div>
    
    );

}

