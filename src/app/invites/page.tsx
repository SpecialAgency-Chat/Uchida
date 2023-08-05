export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (!process.env.NEXT_PUBLIC_INVITE_REDIRECT_URI) {
    throw new Error("Developer Error: NEXT_PUBLIC_INVITE_REDIRECT_URI is not set");
  }
  const d = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/invites?code=${searchParams?.code}`,
  );
  const json = await d.json();
  if (json.error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 text-lg">
        <p>Error: {json.error}</p>
      </main>
    );
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center p-24 text-lg">
        <p className="mb-6">Congrats.</p>
        <a href={`https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_INVITE_REDIRECT_URI)}&response_type=code&prompt=none&scope=identify%20guilds.join%20role_connections.write&state=${json.code}`} className="px-3 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600" role="button">Join Server</a>
      </main>
    )
  }
}
