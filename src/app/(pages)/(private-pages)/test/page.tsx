import Modal from "./components/modal/modal";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function TestPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return <Modal />;
  }
  return (
    <main className="flex justify-center items-center flex-col text-center h-screen">
      <h1>Test Page</h1>
    </main>
  );
}
