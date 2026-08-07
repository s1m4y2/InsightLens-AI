"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useEffect } from "react";
import { Save } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";
import { usePrompts } from "@/hooks/usePrompts";
import { usePromptVersions } from "@/hooks/usePromptVersions";
import { usePrompt } from "@/hooks/usePrompt";
import NewVersionDialog from "@/components/prompts/NewVersionDialog";
import { useComparePrompt } from "@/hooks/useComparePrompt";
import Editor from "@monaco-editor/react";

export default function PromptPage() {

    const [module, setModule] = useState<string>();
    const [version, setVersion] = useState<string>();
    const { data: modules } = usePrompts();
    const { data: versions } = usePromptVersions(module);
    const { data: prompt } = usePrompt(module, version);
    const [content, setContent] = useState("");
        useEffect(() => {
            if (prompt) {
                setContent(prompt.content);
            }
        }, [prompt]);
    const isDirty = prompt && content !== prompt.content;
    useEffect(() => {

        const handle = async (e: KeyboardEvent) => {

            if ((e.ctrlKey || e.metaKey) && e.key === "s") {

                e.preventDefault();

                if (!isDirty) return;

                try {

                    await api.put("/prompt", {

                        module,

                        version,

                        content

                    });

                    await queryClient.invalidateQueries({

                        queryKey: ["prompt", module, version]

                    });

                    toast.success("Prompt saved.");

                }

                catch {

                    toast.error("Save failed.");

                }

            }

        };

        window.addEventListener("keydown", handle);

        return () =>

            window.removeEventListener("keydown", handle);

    }, [content, module, version, isDirty]);
    const [review, setReview] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);    
    const [dialogOpen, setDialogOpen] = useState(false);
    const queryClient = useQueryClient();
    const compareMutation = useComparePrompt();
    const [compareResult,setCompareResult]=useState<any>(null);

    return (

        <DashboardLayout>

            <div className="grid grid-cols-12 gap-6">

                {/* LEFT */}

                <div className="col-span-3 rounded-2xl border bg-white p-5">

                    <h2 className="mb-4 text-xl font-bold">

                        Prompt Modules

                    </h2>

                    {modules?.map((m) => (

                        <div key={m}>

                            <button

                                onClick={() => {

                                    setModule(m);

                                    setVersion(undefined);

                                }}

                                className="w-full rounded-xl px-3 py-2 text-left hover:bg-slate-100"

                            >

                                📁 {m}

                            </button>

                            {

                                module === m &&

                                versions?.map((v) => (

                                    <button

                                        key={v}

                                        onClick={() => setVersion(v)}

                                        className="ml-6 mt-1 block rounded-lg px-3 py-2 text-sm hover:bg-slate-100"

                                    >

                                        📄 {v}

                                    </button>

                                ))

                            }

                        </div>

                    ))}

                </div>

                {/* RIGHT */}
                
                <div className="col-span-9 rounded-2xl border bg-white p-6">

                    {

                        !prompt ?

                        (

                            <div className="text-slate-400">

                                Select a prompt...

                            </div>

                        )

                        :

                        (

                            <>

                                <div className="mb-4 flex items-center justify-between">

                                    <div>

                                        <h2 className="text-2xl font-bold">

                                            {prompt.module}

                                            {isDirty && (

                                                <span className="ml-3 rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">

                                                    ● Unsaved

                                                </span>

                                            )}
                                            
                                        </h2>

                                        <p className="text-slate-500">

                                            {prompt.version}

                                        </p>

                                    </div>
                                    <div className="flex gap-3">
                                    <button

                                        onClick={()=>setDialogOpen(true)}

                                        className="rounded-xl bg-indigo-600 px-5 py-2 text-white"

                                    >

                                        + New Version

                                    </button>
                                    <button

                                        onClick={async () => {

                                            if (!module || !version) return;

                                            if (content === prompt.content) {

                                                toast.info("No changes.");

                                                return;

                                            }

                                            try {

                                                await api.put("/prompt", {

                                                    module,

                                                    version,

                                                    content

                                                });

                                                await queryClient.invalidateQueries({

                                                    queryKey: ["prompt", module, version]

                                                });

                                                toast.success("Prompt updated.");

                                            }

                                            catch {

                                                toast.error("Update failed.");

                                            }

                                        }}

                                        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"

                                    >

                                        <Save size={18}/>

                                        Save

                                    </button>
                                    <button

                                        disabled={!versions || versions.length < 2}

                                        onClick={async()=>{

                                            if(!module) return;

                                            if(!review.trim()){

                                                toast.error("Write a test review.");

                                                return;

                                            }

                                            const versionsToCompare = versions ?? [];

                                            try{

                                                const result = await compareMutation.mutateAsync({

                                                    module,

                                                    versions: versionsToCompare,

                                                    review

                                                });

                                                setCompareResult(result);

                                            }

                                            catch{

                                                toast.error("Compare failed.");

                                            }

                                        }}

                                        className="rounded-xl bg-orange-600 px-5 py-2 text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-400"

                                    >

                                        Compare

                                    </button>
                                    <button

                                        onClick={async()=>{
                                            if(!module || !version) return;
                                            setLoading(true);
                                            try{
                                                const {data}=await api.post("/prompt/test", {
                                                        module, version, variables:{review}
                                                    }
                                                );
                                                setResult(data);
                                            }
                                            catch{
                                                toast.error("Prompt test failed.");
                                            }
                                            finally{
                                                setLoading(false);
                                            }
                                        }}

                                        className="rounded-xl bg-green-600 px-5 py-2 text-white hover:bg-green-700"
                                    >
                                        Test Prompt
                                    </button>
                                    </div>
                                </div>
                                <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-100 p-4">

                                    <div>

                                        <p className="font-semibold">

                                            Variables

                                        </p>

                                        <code className="rounded bg-white px-2 py-1">

                                            {"{{review}}"}

                                        </code>

                                    </div>

                                    <div className="text-sm text-slate-500">

                                        Markdown Prompt

                                    </div>

                                </div>
                                <Editor
                                    height="600px"
                                    defaultLanguage="markdown"
                                    theme="vs-dark"
                                    value={content}
                                    onChange={(value: string | undefined) => setContent(value ?? "")}
                                    options={{
                                        fontSize: 14,
                                        minimap: { enabled: false },
                                        wordWrap: "on",
                                        automaticLayout: true,
                                        scrollBeyondLastLine: false,
                                        lineNumbers: "on",
                                        tabSize: 2,
                                    }}
                                />
                                <div className="mt-8">

                                    <h3 className="mb-3 text-lg font-semibold">
                                        Test Review
                                    </h3>

                                    <textarea
                                        value={review}
                                        onChange={(e)=>setReview(e.target.value)}
                                        placeholder="Write a sample review..."
                                        className="h-36 w-full rounded-xl border p-4"
                                    />

                                </div>
                                {
                                    loading &&
                                    <div className="mt-6">
                                        Gemini is thinking...
                                    </div>
                                }
                                {

                                    result &&
                                    <pre className="mt-6 overflow-auto rounded-xl bg-slate-900 p-5 text-green-300">
                                        {JSON.stringify(
                                            result, null, 2
                                        )}
                                    </pre>
                                }
                            </>

                        )

                    }
                <NewVersionDialog

                    open={dialogOpen}

                    onClose={()=>setDialogOpen(false)}

                    onCreate={async(version)=>{

                        await api.post("/prompt", {
                            module,
                            version,
                            content
                        });

                        await queryClient.invalidateQueries({
                            queryKey: ["prompt-versions", module]
                        });

                        setVersion(version);

                        toast.success("New version created.");

                        setDialogOpen(false);

                    }}

                />
                {

                    compareResult &&

                    <div className="mt-10">

                        <h2 className="mb-5 text-2xl font-bold">

                            Prompt Comparison

                        </h2>

                        <div className="grid gap-6 lg:grid-cols-2">

                            {

                                Object.entries(compareResult).map(

                                    ([version,result]:any)=>(

                                        <div

                                            key={version}

                                            className="rounded-2xl border bg-white p-5"

                                        >

                                            <h3 className="mb-4 text-xl font-bold">

                                                {version}

                                            </h3>

                                            <pre className="overflow-auto rounded-xl bg-slate-900 p-4 text-green-300">

                                                {JSON.stringify(

                                                    result,

                                                    null,

                                                    2

                                                )}

                                            </pre>

                                        </div>

                                    )

                                )

                            }

                        </div>

                    </div>

                    }
                </div>
                    
            </div>

        </DashboardLayout>

    );

}