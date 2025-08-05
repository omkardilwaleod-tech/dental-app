"use client";
import { useRouter } from "next/navigation";

export default function DisplayPage() {
  const router = useRouter();

  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, marginTop: 60 }}>
      <h1>Choose Role</h1>
      <div style={{ display: "flex", gap: 24 }}>
        <button onClick={() => router.push("/reception")} style={{ padding: "12px 32px", fontSize: 18 }}>Reception</button>
        <button onClick={() => router.push("/doctor")} style={{ padding: "12px 32px", fontSize: 18 }}>Doctor</button>
        <button onClick={() => router.push("/owner")} style={{ padding: "12px 32px", fontSize: 18 }}>Owner</button>
      </div>
    </main>
  );
}