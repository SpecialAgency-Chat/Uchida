export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 text-lg">
        <p>Error: No search params</p>
      </main>
    );
  }
  const { code, state: inviteCode } = searchParams;
  if (!code || !inviteCode) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 text-lg">
        <p>Error: No code or invite code</p>
      </main>
    );
  }
  const d = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/invites?code=${searchParams?.state}&timestamp=${new Date().getTime()}`,
  );
  const json = await d.json();
  if (json.error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 text-lg">
        <p>Error: {json.error}</p>
      </main>
    );
  }
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/invites/callback?timestamp=${new Date().getTime()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inviteCode,
        code,
      }),
    }
  );
  const resultJson = await result.json();
  if (resultJson.error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 text-lg">
        <p>Error: {resultJson.error}</p>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24 text-lg">
      <p className="mb-6">Congrats.</p>
      <p className="mb-6">You are now a member of SAC.</p>
    </main>
  );
}
