import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../src/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function redirectByRole(role) {
    if (role === "student") router.replace("/student/dashboard");
    else if (role === "faculty") router.replace("/faculty/dashboard");
    else if (role === "admin") router.replace("/admin/dashboard");
    else router.replace("/");
  }

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;
      const snap = await getDoc(doc(db, "users", uid));
      if (!snap.exists()) {
        setErr("Account not created by admin. Contact admin.");
        await auth.signOut();
        setLoading(false);
        return;
      }
      const role = snap.data().role;
      await redirectByRole(role);
    } catch (error) {
      setErr(error?.message || "Login failed");
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setErr("");
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const uid = res.user.uid;
      const snap = await getDoc(doc(db, "users", uid));
      if (!snap.exists()) {
        setErr("Google account not linked by admin. Contact admin.");
        await auth.signOut();
        setLoading(false);
        return;
      }
      const role = snap.data().role;
      await redirectByRole(role);
    } catch (error) {
      setErr(error?.message || "Google sign-in failed");
      setLoading(false);
    }
  }

  const card = { maxWidth:420, margin:"48px auto", padding:24, borderRadius:8, boxShadow:"0 6px 18px rgba(0,0,0,0.08)" };
  const input = { width:"100%", padding:10, borderRadius:6, border:"1px solid #ddd", marginTop:8 };
  const primary = { width:"100%", padding:10, background:"#0b69ff", color:"#fff", border:"none", borderRadius:6, marginTop:12, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 };

  return (
    <div style={card}>
      <h2 style={{margin:0}}>Sign in</h2>
      <p style={{color:"#555", marginTop:8}}>Sign in to continue</p>

      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input style={input} value={email} onChange={e=>setEmail(e.target.value)} type="email" required />

        <label style={{marginTop:8}}>Password</label>
        <input style={input} value={password} onChange={e=>setPassword(e.target.value)} type="password" required />

        {err && <div style={{color:"crimson", marginTop:8}}>{err}</div>}

        <button style={primary} type="submit" disabled={loading}>Sign in</button>
      </form>

      <div style={{display:"flex", alignItems:"center", marginTop:12}}>
        <hr style={{flex:1, borderColor:"#eee"}} />
        <small style={{margin:"0 8px", color:"#888"}}>or</small>
        <hr style={{flex:1, borderColor:"#eee"}} />
      </div>

      <button onClick={handleGoogle} style={{...primary, background:"#ea4335"}} disabled={loading}>Continue with Google</button>
    </div>
  );
}