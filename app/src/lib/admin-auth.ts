import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ADMIN_COOKIE = "admin_session";
const ADMIN_COOKIE_VALUE = "authenticated";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === ADMIN_COOKIE_VALUE;
}

export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdminAuthenticated()) return null;
  return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
}
