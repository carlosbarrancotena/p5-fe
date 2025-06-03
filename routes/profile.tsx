import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies, setCookie } from "https://deno.land/std/http/cookie.ts";
import ProfileClient from "../islands/ProfileClient.tsx";

type Data = {
  username: string | null;
};

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const cookies = getCookies(req.headers);
    const username = cookies.username || null;
    return ctx.render({ username });
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const username = form.get("username")?.toString() || "";

    const headers = new Headers();
    setCookie(headers, {
      name: "username",
      value: username,
      path: "/",
      sameSite: "Lax",
    });

    headers.set("Location", "/profile");

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function ProfilePage({ data }: PageProps<Data>) {
  return <ProfileClient username={data.username} />;
}
