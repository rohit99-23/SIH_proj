import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AdminAuthForm from "../../../components/AdminAuthForm";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/admin/dashboard"); // Redirect to admin dashboard after login
    } catch (error) {
      setErr(error.message || "Login failed");
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: 40 }}>
      <h2>Admin Login</h2>
      <AdminAuthForm 
        email={email} 
        setEmail={setEmail} 
        password={password} 
        setPassword={setPassword} 
        handleLogin={handleLogin} 
        err={err} 
      />
    </div>
  );
}