import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=https%3A%2F%2Fapi.sachat.cloud%2Flinked-roles&response_type=code&scope=identify%20guilds.join%20role_connections.write`);
}