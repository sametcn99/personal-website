import { IconButton } from "@mui/material";
import Modal from "./components/modal/modal";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { BsArrowUpCircleFill } from "react-icons/bs";
import TestComponent from "./components/modal/test-component/test-component";

export default async function TestPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return <Modal />;
  }

  return <TestComponent />;
}
