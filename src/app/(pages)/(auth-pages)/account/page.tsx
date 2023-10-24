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
  return (
    <form action="/auth/logout" method="post" className="max-w-sm mx-auto mt-8">
      <div>
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md">
          Logout
        </button>
      </div>
    </form>
  );
}
