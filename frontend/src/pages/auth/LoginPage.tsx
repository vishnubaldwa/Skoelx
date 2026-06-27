export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">

      <div className="w-96 rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-6 text-3xl font-bold">
          Skoelx Login
        </h1>

        <input
          placeholder="Email"
          className="mb-4 w-full rounded border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded border p-3"
        />

        <button
          className="w-full rounded bg-blue-600 py-3 text-white"
        >
          Login
        </button>

      </div>

    </div>
  );
}