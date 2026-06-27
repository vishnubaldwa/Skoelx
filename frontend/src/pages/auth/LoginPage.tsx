import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../../hooks/useLogin";
import { useAuthStore } from "../../store/auth.store";

export default function LoginPage() {
  const navigate = useNavigate();

  const { mutate, isPending } = useLogin();

  const auth = useAuthStore();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function handleLogin() {
    mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (response) => {
          auth.login(
            response.data.token,
            response.data.user
          );

          navigate("/dashboard");
        },

        onError: () => {
          alert("Invalid email or password");
        },
      }
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">

      <div className="w-96 rounded-xl bg-white p-8 shadow-xl">

        <h1 className="mb-8 text-4xl font-bold">
          Skoelx Login
        </h1>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-5 w-full rounded-lg border p-4"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-8 w-full rounded-lg border p-4"
        />

        <button
          onClick={handleLogin}
          disabled={isPending}
          className="w-full rounded-lg bg-blue-600 py-4 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {isPending ? "Signing In..." : "Login"}
        </button>

      </div>

    </div>
  );
}