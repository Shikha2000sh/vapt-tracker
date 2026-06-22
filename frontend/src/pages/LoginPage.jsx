import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await API.post("/auth/register", { email, password, name, role: "ADMIN" });
        showToast("Registered successfully! Please login.");
        setIsRegister(false);
      } else {
        const response = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", response.data.token);
        showToast("Login successful! Welcome back 👋");
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (error) {
      console.error(error);
      showToast(isRegister ? "Registration failed" : "Invalid Credentials", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
        <div className="bg-white p-12 rounded-3xl shadow-2xl flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold text-slate-800">VAPT Tracker</h1>
          <div className="flex gap-3">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
          <p className="text-slate-500 font-medium">Logging you in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl text-white font-medium transition-all duration-300 ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          <span>{toast.type === "error" ? "❌" : "✅"}</span>
          <span>{toast.message}</span>
        </div>
      )}

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">
          VAPT Tracker
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-300 p-4 rounded-2xl"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 p-4 rounded-2xl"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 p-4 rounded-2xl"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <p className="text-center text-slate-500 mt-6">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 font-semibold ml-1 hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
