import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Account() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/login");
  }
  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id);
  const profile = profiles?.[0]; // get the first profile from the array if it exists

  return (
    <form action="/auth/logout" method="post" className="mx-auto mt-8 max-w-sm">
      <div>
        {session.user.email}
        <br />
        {session.user.id}
        <br />
        {profile.role} {/* access the role property of the profile */}
        <br />
        <button className="py-2 w-full text-white bg-blue-500 rounded-md">
          Logout
        </button>
      </div>
    </form>
  );
}
