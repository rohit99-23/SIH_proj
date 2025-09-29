import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function FacultyDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return router.replace("/login");
      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists() || snap.data().role !== "faculty") {
        await signOut(auth);
        return router.replace("/login");
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{margin:40}}>Loading...</div>;
  return (
    <div style={{margin:40}}>
      <h2>Faculty Dashboard</h2>
      <p>Welcome, faculty.</p>
      <button onClick={() => signOut(auth).then(()=>window.location.href = "/login")}>Sign out</button>
    </div>
  );
}