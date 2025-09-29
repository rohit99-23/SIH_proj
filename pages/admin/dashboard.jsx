import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../../src/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function AdminDashboard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return router.replace("/admin/login");
      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists() || snap.data().role !== "admin") {
        await signOut(auth);
        return router.replace("/admin/login");
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  async function handleInvite(e) {
    e.preventDefault();
    setMessage("");
    try {
      const key = email.trim().toLowerCase().replace(/\./g, ','); // stable key
      await setDoc(doc(db, "invites", key), { email, role, invitedAt: new Date().toISOString() });
      setMessage(`Invite created for ${email} as ${role}`);
      setEmail("");
    } catch (err) {
      setMessage(err.message || "Failed to create invite");
    }
  }

  if (loading) return <div style={{margin:40}}>Loading...</div>;
  return (
    <div style={{maxWidth:480, margin:40}}>
      <h2>Admin — Create Invite</h2>
      <form onSubmit={handleInvite}>
        <label>User email</label>
        <input style={{width:"100%",padding:8}} value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        <label style={{marginTop:8}}>Role</label>
        <select style={{width:"100%",padding:8}} value={role} onChange={e=>setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        <button style={{marginTop:12,padding:8,width:"100%"}} type="submit">Create Invite</button>
      </form>
      {message && <div style={{marginTop:12}}>{message}</div>}
    </div>
  );
}