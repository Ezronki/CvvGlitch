import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

const AuthLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Disable body scroll globally for this page
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data.payload.message });
        // navigate("/dashboard"); // Navigate to dashboard on success
      } else {
        toast({
  title: data?.payload?.message,
  variant: "destructive",
  className: "text-white",
});

      }
    });
  };

  return (
    <motion.div
  className="h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-0 m-0"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-lg rounded-xl p-8 border border-gray-700 shadow-2xl m-0">
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          CVV GLITCH SHOP
        </motion.h1>
        <motion.p
          className="mt-4 text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
          >
            Register here
          </Link>
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-gray-200 px-4 py-3 
              focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none
              placeholder:text-gray-500 transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-gray-200 px-4 py-3 
                focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none
                placeholder:text-gray-500 pr-10 transition-all"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-gray-300 transition-colors"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="mt-6 w-full py-3 px-4 rounded-lg text-sm font-semibold text-white 
              bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 
              focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all
              shadow-lg hover:shadow-purple-500/20"
          >
            Sign In
          </button>
        </div>
      </form>
    </motion.div>
  </div>
</motion.div>
  );
};
export default AuthLogin;