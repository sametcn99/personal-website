import { Suspense } from "react";
import Portfolio from "./portfolio/page";
import Loading from "./loading";

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Portfolio />
      </Suspense>
    </>
  );
}
