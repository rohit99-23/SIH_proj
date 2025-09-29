import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../src/firebase";
import { setDoc, doc } from "firebase/firestore";
import Link from "next/link";

export default function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function handleSignup(e) {
    e.preventDefault();
    setErr("");
    try {
      if (code !== process.env.NEXT_PUBLIC_ADMIN_SIGNUP_CODE) {
        setErr("Invalid signup code.");
        return;
      }
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", cred.user.uid), { email, role: "admin", createdAt: new Date().toISOString() });
      router.replace("/admin/dashboard");
    } catch (error) {
      setErr(error?.message || "Signup failed");
    }
  }

  return (
    <div style={{maxWidth:420, margin:40}}>
      <h2>Admin Sign up (one-time)</h2>
      <form onSubmit={handleSignup}>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" required />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" required />
        <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Signup code" required />
        {err && <div style={{color:"crimson"}}>{err}</div>}
        <button type="submit">Sign up</button>
      </form>
      <p style={{marginTop:12}}>
        Already admin? <Link href="/admin/login">Sign in</Link>
      </p>
    </div>
  );
}