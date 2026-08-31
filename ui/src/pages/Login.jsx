import { Github, Wallet } from "lucide-react";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google";
  };

  const handleGithubLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/github";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="bg-emerald-500 p-4 rounded-xl text-white">
            <Wallet size={36} />
          </div>

          <h1 className="mt-4 text-2xl font-bold">
            Money Management System
          </h1>

          <p className="mt-2 text-gray-500 text-center">
            Login using your OAuth provider
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-medium hover:bg-gray-50"
          >
            Continue with Google
          </button>

          <button
            onClick={handleGithubLogin}
            className="w-full rounded-lg bg-black text-white px-4 py-3 font-medium hover:bg-gray-900 flex items-center justify-center gap-2"
          >
            <Github size={18} />
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}