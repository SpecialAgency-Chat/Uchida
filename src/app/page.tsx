import Image from "next/image";
import Link from "next/link";

export default function Home() {
  if (!process.env.NEXT_PUBLIC_REQUEST_REDIRECT_URI) {
    throw new Error("NEXT_PUBLIC_REQUEST_REDIRECT_URI is not defined");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-lg">
      <p className="mb-[13rem]">Hello</p>
      <p className="mb-[23rem] text-transparent mr-[60%] hover:underline hover:text-slate-900"><Link href="/login">Or... You are the member of SAC?</Link></p>
      <p className="my-[36rem]">Why are you still here?</p>
      <a href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_REQUEST_REDIRECT_URI)}&response_type=code&scope=identify%20guilds.join%20role_connections.write&prompt=none`} className="px-3 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600" role="button">Join Request</a>
    </main>
  );
}
