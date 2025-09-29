import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../src/firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "../styles/login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const uid = cred.user.uid;
      const snap = await getDoc(doc(db, "users", uid));
      if (!snap.exists()) {
        setErr("Invalid / not invited");
        await auth.signOut();
        setLoading(false);
        return;
      }
      const role = snap.data().role || "student";
      if (role === "admin") router.replace("/admin/dashboard");
      else if (role === "faculty") router.replace("/faculty/dashboard");
      else router.replace("/student/dashboard");
    } catch (e) {
      // show friendly message for auth errors
      setErr(e?.code === "auth/wrong-password" ? "Incorrect password" : (e?.message || "Login failed"));
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
        setErr("Google account not linked by admin");
        await auth.signOut();
        setLoading(false);
        return;
      }
      const role = snap.data().role || "student";
      if (role === "admin") router.replace("/admin/dashboard");
      else if (role === "faculty") router.replace("/faculty/dashboard");
      else router.replace("/student/dashboard");
    } catch (e) {
      setErr(e?.message || "Google sign-in failed");
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bgOverlay} />
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <img src="/logo.png" alt="logo" className={styles.logo} />
          <div className={styles.brandText}>EduVault</div>
        </div>
      </header>

      <main className={styles.centerArea}>
        <div className={styles.leftHero}>
          <h1>Welcome to<br/>EduVault</h1>
          <p>EduVault secure submissions & management</p>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>EduVault</h2>

          <form onSubmit={handleLogin} className={styles.form}>
            <input
              className={styles.input}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={styles.input}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className={styles.primary} type="submit" disabled={loading}>
              {loading ? <span className={styles.spinner} /> : "Login"}
            </button>

            {/* show error only when present */}
            {err && <div className={styles.error} role="alert">{err}</div>}
          </form>

          <div style={{height:8}} />

          <div className={styles.oauthRow}>
            <button
              type="button"
              className={styles.oauthBtn}
              onClick={handleGoogle}
              aria-label="Sign in with Google"
            >
              <span className={styles.icon} aria-hidden>
                {/* Official-style Google "G" mark */}
                <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M24 9.5c3.9 0 7.2 1.3 9.6 3.4l7.2-7.2C36 2.1 30.4 0 24 0 14.8 0 6.9 4.9 3 12.1l8.7 6.8C13.4 14 18.3 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.5 24.5c0-1.6-.2-3.1-.6-4.6H24v9.1h12.7c-.5 2.6-2.1 4.9-4.6 6.3l7 5.4C43.7 36.5 46.5 30.9 46.5 24.5z"/>
                  <path fill="#4A90E2" d="M12.3 29.6A14.9 14.9 0 0 1 12 24c0-1.5.3-2.9.8-4.2L3.9 13A24 24 0 0 0 0 24c0 3.9 1 7.6 2.9 10.8l9.4-5.2z"/>
                  <path fill="#FBBC05" d="M24 48c6.4 0 12-2.1 16-5.7l-7-5.4c-2 1.3-4.4 2.1-9 2.1-5.7 0-10.6-4.5-12.4-10.8l-9.4 5.2C6.9 43.1 14.8 48 24 48z"/>
                </svg>
              </span>
              <span>Sign in with Google</span>
            </button>

            <button
              type="button"
              className={styles.oauthBtnAlt}
              onClick={() => alert("Microsoft login placeholder")}
              aria-label="Sign in with Microsoft"
            >
              <span className={styles.icon} aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="10" height="10" fill="#F35325"/>
                  <rect x="13" y="1" width="10" height="10" fill="#81BC06"/>
                  <rect x="1" y="13" width="10" height="10" fill="#05A6F0"/>
                  <rect x="13" y="13" width="10" height="10" fill="#FFBA00"/>
                </svg>
              </span>
              <span>Microsoft</span>
            </button>
          </div>

          <div className={styles.cardFooter}>
            <Link href="/forgot">Forgot Password?</Link>
            <span>•</span>
            <Link href="/register">Register</Link>
          </div>
        </div>
      </main>

      <div className={styles.bottomSpark} />
    </div>
  );
}
