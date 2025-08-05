"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e0e7ff 0%, #fff 100%)",
        padding: 16,
      }}
    >
      <h1
        className="clinic-title"
        style={{
          fontSize: "2.2rem",
          fontWeight: 700,
          color: "#1e293b",
          marginBottom: 32,
          letterSpacing: 1,
          textAlign: "center",
        }}
      >
        Shree Samarth Dental Clinic
      </h1>
      <div
        className="role-buttons"
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 24,
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          maxWidth: 600,
        }}
      >
        <button
          className="role-btn"
          onClick={() => router.push("/reception")}
          style={{
            padding: "18px 32px",
            fontSize: "1.1rem",
            fontWeight: 600,
            borderRadius: 12,
            border: "none",
            background: "#2563eb",
            color: "#fff",
            boxShadow: "0 4px 16px rgba(37,99,235,0.08)",
            cursor: "pointer",
            transition: "background 0.2s",
            minWidth: 140,
            width: "100%",
            maxWidth: 220,
          }}
        >
          Reception
        </button>
        <button
          className="role-btn"
          onClick={() => router.push("/doctor")}
          style={{
            padding: "18px 32px",
            fontSize: "1.1rem",
            fontWeight: 600,
            borderRadius: 12,
            border: "none",
            background: "#059669",
            color: "#fff",
            boxShadow: "0 4px 16px rgba(5,150,105,0.08)",
            cursor: "pointer",
            transition: "background 0.2s",
            minWidth: 140,
            width: "100%",
            maxWidth: 220,
          }}
        >
          Doctor
        </button>
        <button
          className="role-btn"
          onClick={() => router.push("/owner")}
          style={{
            padding: "18px 32px",
            fontSize: "1.1rem",
            fontWeight: 600,
            borderRadius: 12,
            border: "none",
            background: "#f59e42",
            color: "#fff",
            boxShadow: "0 4px 16px rgba(245,158,66,0.08)",
            cursor: "pointer",
            transition: "background 0.2s",
            minWidth: 140,
            width: "100%",
            maxWidth: 220,
          }}
        >
          Owner
        </button>
      </div>
      <p style={{ color: "#64748b", fontSize: "1rem", textAlign: "center" }}>
        Please select your role to continue.
      </p>
      <style>
        {`
          @media (max-width: 900px) {
            .clinic-title {
              font-size: 1.6rem !important;
            }
            .role-buttons {
              gap: 14px !important;
              max-width: 100% !important;
            }
            .role-btn {
              font-size: 1rem !important;
              padding: 16px 0 !important;
              min-width: 120px !important;
              max-width: 100% !important;
            }
          }
          @media (max-width: 600px) {
            .clinic-title {
              font-size: 1.2rem !important;
            }
            .role-buttons {
              flex-direction: column !important;
              gap: 10px !important;
              align-items: stretch !important;
            }
            .role-btn {
              width: 100% !important;
              max-width: 100% !important;
              min-width: 100px !important;
              font-size: 0.98rem !important;
              padding: 14px 0 !important;
            }
          }
        `}
      </style>
    </div>
  );
}