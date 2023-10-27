export default function Login() {
  return (
    <form action="/auth/login" method="post" className="mx-auto mt-8 max-w-sm">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          name="email"
          className="py-2 px-3 w-full rounded-md border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="py-2 px-3 w-full text-black rounded-md border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <button className="py-2 w-full text-white bg-blue-500 rounded-md">
          Sign In
        </button>
      </div>
    </form>
  );
}
