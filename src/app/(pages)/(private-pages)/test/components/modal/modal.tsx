export default function Modal() {
  return (
    <main className="flex fixed inset-0 z-50 flex-col justify-center items-center h-screen text-center bg-black select-none">
      <div className="overflow-y-auto z-50 mx-auto w-11/12 rounded shadow-lg md:max-w-md modal-container bg-zinc-900">
        <p>
          This page is a testing environment, accessible only through
          administrator authentication.
        </p>
      </div>
    </main>
  );
}
