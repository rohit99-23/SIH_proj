import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../src/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const snap = await getDoc(doc(db, "users", cred.user.uid));
      if (!snap.exists() || snap.data().role !== "admin") {
        setErr("Not an admin account.");
        await auth.signOut();
        return;
      }
      router.replace("/admin/dashboard");
    } catch (error) {
      setErr(error?.message || "Login failed");
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: 40 }}>
      <h2>Admin Sign in</h2>
      <form onSubmit={handleLogin}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        {err && <div style={{ color: "crimson" }}>{err}</div>}
        <button type="submit">Sign in</button>
      </form>
      <p>
        Need an admin account?{" "}
        <Link href="/admin/signup">Sign up</Link>
      </p>
    </div>
  );
}