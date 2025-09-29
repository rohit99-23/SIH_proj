import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/", { replace: true });
    });
    return () => unsub();
  }, [navigate]);

  async function handleEmailSignIn(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will redirect
    } catch (err) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 20, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Sign in</h2>
      <form onSubmit={handleEmailSignIn}>
        <div style={{ marginBottom: 8 }}>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <hr style={{ margin: "16px 0" }} />

      <button onClick={handleGoogleSignIn} disabled={loading} style={{ width: "100%", padding: 10 }}>
        Continue with Google
      </button>

      <p style={{ marginTop: 12 }}>
        Need an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}