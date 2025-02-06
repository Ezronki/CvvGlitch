import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

const initialState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Passwords do not match!", variant: "destructive" });
      return;
    }
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data.payload.message });
        navigate("/auth/login");
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
      }
    });
  };

  return (
    <motion.div
      className="h-screen w-screen bg-gradient-to-br from-white to-gray-200 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className=" w-full h-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-300">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <motion.h1
              className="text-3xl font-extrabold text-gray-800"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Create New Account
            </motion.h1>
            <motion.p
              className="mt-2 text-gray-600 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Already have an account?{' '}
              <Link to="/auth/login" className="font-medium text-blue-500 hover:underline">
                Login
              </Link>
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[{ label: "Username", type: "text", id: "userName" }, { label: "Email", type: "email", id: "email" }].map(({ label, type, id }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  value={formData[id]}
                  onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-800 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                />
              </div>
            ))}
            {[{ id: "password", label: "Password", show: showPassword, toggle: setShowPassword }, { id: "confirmPassword", label: "Confirm Password", show: showConfirmPassword, toggle: setShowConfirmPassword }].map(({ id, label, show, toggle }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <div className="relative mt-1">
                  <input
                    type={show ? "text" : "password"}
                    id={id}
                    value={formData[id]}
                    onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                    required
                    className="block w-full rounded-md border-gray-300 bg-gray-50 text-gray-800 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10 transition-all"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => toggle((prev) => !prev)}
                  >
                    {show ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                  </div>
                </div>
              </div>
            ))}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-md shadow-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                Sign Up
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AuthRegister;
