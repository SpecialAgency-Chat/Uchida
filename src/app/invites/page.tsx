export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const d = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invites?code=${searchParams?.code}`);
  return <h1>{searchParams?.greeting || await d.text()}</h1>;
}