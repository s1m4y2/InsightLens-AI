"use client";

import { useState } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    onCreate: (version: string) => void;
}

export default function NewVersionDialog({
    open,
    onClose,
    onCreate
}: Props) {

    const [version, setVersion] = useState("");

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-[450px] rounded-2xl bg-white p-6">

                <h2 className="text-xl font-bold">

                    Create New Version

                </h2>

                <input

                    value={version}

                    onChange={(e)=>setVersion(e.target.value)}

                    placeholder="v2"

                    className="mt-4 w-full rounded-xl border p-3"

                />

                <div className="mt-6 flex justify-end gap-3">

                    <button

                        onClick={onClose}

                        className="rounded-xl border px-4 py-2"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={()=>{

                            onCreate(version);

                            setVersion("");

                        }}

                        className="rounded-xl bg-indigo-600 px-4 py-2 text-white"

                    >

                        Create

                    </button>

                </div>

            </div>

        </div>

    );

}