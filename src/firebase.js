import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../src/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleSelect, setRoleSelect] = useState("student"); // user chooses which dashboard they expect
  const [err, setErr] = useState("");
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
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;
      const userSnap = await getDoc(doc(db, "users", uid));
      if (!userSnap.exists()) {
        setErr("Account not created by admin. Contact admin.");
        await auth.signOut();
        return;
      }
      const role = userSnap.data().role;
      if (role !== roleSelect) {
        setErr(`This account is registered as ${role}. Choose the correct role before signing in.`);
        await auth.signOut();
        return;
      }
      await redirectByRole(role);
    } catch (error) {
      setErr(error?.message || "Login failed");
    }
  }

  async function handleGoogle() {
    setErr("");
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const uid = res.user.uid;
      const userSnap = await getDoc(doc(db, "users", uid));
      if (!userSnap.exists()) {
        setErr("Google account not linked by admin. Contact admin.");
        await auth.signOut();
        return;
      }
      const role = userSnap.data().role;
      await redirectByRole(role);
    } catch (error) {
      setErr(error?.message || "Google sign-in failed");
    }
  }

  const card = { maxWidth:420, margin:"48px auto", padding:24, borderRadius:8, boxShadow:"0 6px 18px rgba(0,0,0,0.08)" };
  const input = { width:"100%", padding:10, borderRadius:6, border:"1px solid #ddd", marginTop:8 };
  const primary = { width:"100%", padding:10, background:"#0b69ff", color:"#fff", border:"none", borderRadius:6, marginTop:12 };

  return (
    <div style={card}>
      <h2>Sign in</h2>
      <p style={{color:"#555"}}>Sign in to continue</p>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input style={input} value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        <label style={{marginTop:8}}>Password</label>
        <input style={input} value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        <label style={{marginTop:8}}>Login as</label>
        <select style={input} value={roleSelect} onChange={e=>setRoleSelect(e.target.value)}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>
        {err && <div style={{color:"crimson", marginTop:8}}>{err}</div>}
        <button style={primary} type="submit">Sign in</button>
      </form>

      <div style={{display:"flex", alignItems:"center", marginTop:12}}>
        <hr style={{flex:1, borderColor:"#eee"}} />
        <small style={{margin:"0 8px", color:"#888"}}>or</small>
        <hr style={{flex:1, borderColor:"#eee"}} />
      </div>
      <button onClick={handleGoogle} style={{...primary, background:"#ea4335"}}>Continue with Google</button>

      <div style={{marginTop:12, textAlign:"center"}}>
        Need an account? <Link href="/register">Register</Link>
      </div>
    </div>
  );
}