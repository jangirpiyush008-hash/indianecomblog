import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Keeps Supabase session cookies in sync and redirects unauth'd users
 * away from /admin to /admin/login.
 */
export async function updateSession(req: NextRequest) {
  let res = NextResponse.next({ request: req });

  // Skip auth check when Supabase isn't configured yet (e.g. local dev before setup)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return res;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (all) => {
          all.forEach(({ name, value, options }) => {
            req.cookies.set(name, value);
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLogin = req.nextUrl.pathname === "/admin/login";

  if (isAdminRoute && !isLogin && !user) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return res;
}
