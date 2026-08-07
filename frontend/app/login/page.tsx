"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {

    const router = useRouter();

    const login = useLogin();

    const [email,setEmail]=useState("");

    const [password,setPassword]=useState("");

    async function handleLogin(){

        try{

            await login.mutateAsync({

                email,

                password,

            });

            toast.success("Login successful");

            router.push("/dashboard");

        }

        catch{

            toast.error("Wrong email or password");

        }

    }

    return(

        <div className="flex min-h-screen items-center justify-center bg-slate-100">

            <div className="w-[420px] rounded-3xl bg-white p-8 shadow-xl">

                <h1 className="mb-8 text-center text-3xl font-bold">

                    InsightLens AI

                </h1>

                <input

                    className="mb-4 w-full rounded-xl border p-3"

                    placeholder="Email"

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                />

                <input

                    type="password"

                    className="mb-6 w-full rounded-xl border p-3"

                    placeholder="Password"

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                />

                <button

                    onClick={handleLogin}

                    className="w-full rounded-xl bg-indigo-600 p-3 text-white"

                >

                    Login

                </button>

            </div>

        </div>

    )

}