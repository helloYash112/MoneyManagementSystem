import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const loginWithGithub = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 border border-gray-700 rounded-2xl bg-gray-800 shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-2">
          Login
        </h1>

        <h3 className="text-center text-gray-300 mb-8">
          Welcome to MoneyManagementSystem
        </h3>

        {/* GitHub Login */}
        <button
          onClick={loginWithGithub}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 mb-4 bg-gray-700 rounded-lg shadow hover:bg-gray-600 transition"
        >
          <FaGithub size={24} />
          Login with GitHub
        </button>

        {/* Google Login */}
        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-lg shadow hover:bg-gray-100 transition"
        >
          <FcGoogle size={24} />
          Login with Google
        </button>
      </div>
    </div>
  );
}
