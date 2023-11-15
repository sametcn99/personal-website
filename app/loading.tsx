export default function Loading() {
  return (
    <>
      <div className="flex justify-center items-center animate-pulse bg-black h-screen w-full">
        <div className="border-t-4 border-blue-500 border-solid h-12 w-12 rounded-full animate-spin"></div>
      </div>
    </>
  );
}
