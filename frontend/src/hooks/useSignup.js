import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    profileImage,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    try {
      const formData = new FormData(); // Use FormData for file uploads
      formData.append("fullName", fullName);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("gender", gender);
      if (profileImage) formData.append("profileImage", profileImage);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        // headers: { "content-Type": "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("signup successfully");
      // Set the user to localStorage
      localStorage.setItem("auth-user", JSON.stringify(data));
      //Context
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill all the feilds ");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("password not matched ");

    return false;
  }
  if (password.length < 6) {
    toast.error("password should must be 6 character ");
    return false;
  }

  return true;
}
