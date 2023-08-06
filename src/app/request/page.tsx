"use client";

import Image from "next/image";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  if (!searchParams?.code) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 text-lg">
        <p>Error: Code invalid</p>
      </main>
    )
  }
  const ons = async (token: string) => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joinrequest?timestamp=${new Date().getTime()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: searchParams?.code,
        token,
      }),
    });
    const resultJson = await result.json();
    if (resultJson.error) {
      setStatus("error");
      setError(resultJson.error);
    } else {
      setStatus("success");
    }

  }
  if (!process.env.NEXT_PUBLIC_TURNSTILE_KEY) {
    throw new Error("NEXT_PUBLIC_TURNSTILE_KEY is not defined");
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 text-lg">
      {status === "loading" ? 
        <>
          <p>Almost done.</p>
          <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_KEY} onSuccess={ons} />
          <p className="mb-6">Please wait for a few seconds.</p>
        </>
      : status === "success" ?
        <>
          <p className="mb-6">Congrats.</p>
          <p className="mb-6">Join request succeed. Request will be reviewed by SAC staffs.</p>
        </>
          : status === "error" ?
        <>
          <p>Error: {error}</p>
        </>
      : null}
    </main>
  );
}
