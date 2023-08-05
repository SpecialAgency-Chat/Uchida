import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-lg">
      <p className="mb-[13rem]">Hello</p>
      <p className="mb-[23rem] text-transparent mr-[60%] hover:underline hover:text-slate-900"><Link href="/login">Or... You are the member of SAC?</Link></p>
      <p className="my-[36rem]">Why are you still here?</p>
      <p className="px-3 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600" role="button"><Link href="/request">Join Request</Link></p>
    </main>
  );
}
