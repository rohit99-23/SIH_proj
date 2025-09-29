import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) router.replace("/login");
    });
    return () => unsub();
  }, [router]);

  if (!user) return <div>Checking auth...</div>;

  return (
    <div style={{ maxWidth: 720, margin: 40 }}>
      <h1>Welcome, {user.email}</h1>
      <button
        onClick={async () => {
          await signOut(auth);
          router.push("/login");
        }}
        style={{ padding: 8 }}
      >
        Sign out
      </button>
      <p>
        Go to <Link href="/login">Login</Link> or{" "}
        <Link href="/register">Register</Link>
      </p>
    </div>
  );
}