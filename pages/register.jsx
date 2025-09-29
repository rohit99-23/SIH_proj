import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { auth, db } from "../src/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const inviteKey = email.trim().toLowerCase().replace(/\./g, ',');
      const inviteRef = doc(db, "invites", inviteKey);

      const inviteSnap = await getDoc(inviteRef);
      if (!inviteSnap.exists()) {
        setErr("No invite found for this email. Ask admin to invite you.");
        setLoading(false);
        return;
      }
      const inviteData = inviteSnap.data();

      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;
      await setDoc(doc(db, "users", uid), {
        email,
        role: inviteData.role,
        createdAt: new Date().toISOString(),
      });
      await deleteDoc(inviteRef).catch(() => {});

      if (inviteData.role === "student") router.replace("/student/dashboard");
      else if (inviteData.role === "faculty") router.replace("/faculty/dashboard");
      else router.replace("/");
    } catch (error) {
      console.error("Registration error:", error);
      if (error?.message?.toLowerCase().includes("offline")) {
        setErr("Network error: unable to reach Firestore. Check network/extensions/firewall.");
      } else if (error?.code === "permission-denied" || error?.message?.toLowerCase().includes("permission")) {
        setErr("Permission error: check Firestore rules and API key settings in Firebase/GCP console.");
      } else {
        setErr(error?.message || "Registration failed");
      }
      try { await signOut(auth); } catch {}
      setLoading(false);
    }
  }

  const card = {
    maxWidth: 480,
    margin: "48px auto",
    padding: 24,
    borderRadius: 10,
    boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
  };
  const input = { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e6e6e6", marginTop: 8 };
  const primary = { width: "100%", padding: 12, background: "#0b69ff", color: "#fff", border: "none", borderRadius: 8, marginTop: 14, cursor: "pointer", opacity: loading ? 0.7 : 1 };

  return (
    <div style={card}>
      <h2 style={{margin:0}}>Create account</h2>
      <p style={{color:"#555", marginTop:8}}>Register using the invite sent by admin</p>

      <form onSubmit={handleRegister}>
        <label>Email</label>
        <input style={input} value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required />

        <label style={{marginTop:10}}>Password</label>
        <input style={input} value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required />

        {err && <div style={{color:"crimson", marginTop:10}}>{err}</div>}

        <button style={primary} type="submit" disabled={loading}>{loading ? "Registering…" : "Register"}</button>
      </form>

      <div style={{marginTop:16, textAlign:"center"}}>
        Already have an account? <Link href="/login">Sign in</Link>
      </div>
    </div>
  );
}

// Firestore rules (paste into Firebase Console -> Firestore -> Rules)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // users collection: each user can read their own doc, admins can read/write users/invites
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId; // user creates their own profile on signup
      allow update: if request.auth != null && request.auth.uid == userId;
      allow delete: if false;
    }

    // invites: only admins (based on their users/<uid>.role) can create or delete invites
    match /invites/{inviteId} {
      allow read: if request.auth != null && (
        request.auth.uid == inviteId || // allow reading own invite doc (if inviteId is uid/email-based key)
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin"
      );
      allow create, delete: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
      allow update: if false;
    }

    // default: deny
    match /{document=**} {
      allow read, write: if false;
    }
  }
}