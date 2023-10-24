export default function Modal() {
  return (
    <main className="fixed inset-0 z-50 flex justify-center items-center flex-col text-center h-screen bg-black select-none">
      <div className="modal-container bg-zinc-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <p>
          This page is a testing environment, accessible only through
          administrator authentication.
        </p>
      </div>
    </main>
  );
}
