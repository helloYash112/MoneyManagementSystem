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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white gap-4">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      {/* GitHub Login */}
      <button
        onClick={loginWithGithub}
        className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition"
      >
        <FaGithub size={24} />
        Login with GitHub
      </button>

      {/* Google Login */}
      <button
        onClick={loginWithGoogle}
        className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg shadow hover:bg-gray-100 transition"
      >
        <FcGoogle size={24} />
        Login with Google
      </button>
    </div>
  );
}
