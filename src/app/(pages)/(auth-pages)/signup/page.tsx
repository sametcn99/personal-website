export default function Signup() {
  return (
    <form
      action="/auth/sign-up"
      method="post"
      className="max-w-sm mx-auto mt-8"
    >
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          name="email"
          className="w-full py-2 px-3 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="w-full py-2 px-3 border border-gray-300 rounded-md"
        />
      </div>
      <div className="text-center">
        <button className="w-full bg-blue-500 text-white py-2 rounded-md">
          Sign Up
        </button>
      </div>
    </form>
  );
}
