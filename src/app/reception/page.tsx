"use client";
import { useState } from "react";

const treatmentOptions = [
  "Cleaning (Scaling)",
  "Filling",
  "Root Canal Treatment (RCT)",
  "Crown/Cap",
  "Extraction",
  "Braces/Orthodontics",
  "Implant",
  "Dentures",
  "Whitening",
  "Veneers",
  "Bridge",
  "Gum Treatment",
  "Pediatric Dentistry",
  "Other",
];

export default function ReceptionPage() {
  const [form, setForm] = useState({
    name: "",
    mobileNo: "",
    address: "",
    email: "",
    opdType: "new",
    treatment: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Submitting...");
    try {
      const res = await fetch("/api/patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Patient registered!");
        setForm({ name: "", mobileNo: "", address: "", email: "", opdType: "new", treatment: "" });
      } else {
        setMessage(data.error || "Error registering patient.");
      }
    } catch {
      setMessage("Network error.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 420,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 16px rgba(0,0,0,0.09)",
          padding: "32px 24px",
          margin: "32px 0",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 24,
            fontWeight: 700,
            fontSize: "1.35rem",
            color: "#1e293b",
            letterSpacing: 1,
          }}
        >
          Reception Dashboard
        </h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="name" style={labelStyle}>
              Patient Name*
            </label>
            <input
              id="name"
              name="name"
              style={inputStyle}
              placeholder="Patient Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="mobileNo" style={labelStyle}>
              Mobile No*
            </label>
            <input
              id="mobileNo"
              name="mobileNo"
              style={inputStyle}
              placeholder="Mobile No"
              value={form.mobileNo}
              onChange={handleChange}
              required
              type="tel"
              pattern="[0-9]{10}"
              maxLength={10}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="address" style={labelStyle}>
              Address*
            </label>
            <input
              id="address"
              name="address"
              style={inputStyle}
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="email" style={labelStyle}>
              Email (optional)
            </label>
            <input
              id="email"
              name="email"
              style={inputStyle}
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              type="email"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="opdType" style={labelStyle}>
              OPD Type*
            </label>
            <select
              id="opdType"
              name="opdType"
              style={inputStyle}
              value={form.opdType}
              onChange={handleChange}
              required
            >
              <option value="new">New OPD</option>
              <option value="old">Old OPD</option>
            </select>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label htmlFor="treatment" style={labelStyle}>
              Treatment*
            </label>
            <select
              id="treatment"
              name="treatment"
              style={inputStyle}
              value={form.treatment}
              onChange={handleChange}
              required
            >
              <option value="">Select Treatment</option>
              {treatmentOptions.map((treat) => (
                <option key={treat} value={treat}>
                  {treat}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#2563eb",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.08rem",
              border: "none",
              borderRadius: 6,
              padding: "12px 0",
              marginTop: 4,
              letterSpacing: 1,
              boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
              transition: "background 0.2s",
            }}
          >
            Register Patient
          </button>
          {message && (
            <div
              style={{
                background: "#e0f7e9",
                color: "#059669",
                borderRadius: 6,
                marginTop: 18,
                padding: "10px 0",
                textAlign: "center",
                fontSize: "0.98rem",
              }}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontWeight: 500,
  color: "#334155",
  marginBottom: 4,
  display: "block",
  fontSize: "0.98rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  fontSize: "1rem",
  padding: "9px 10px",
  marginTop: 2,
  marginBottom: 0,
  outline: "none",
  background: "#f9fafb",
  boxSizing: "border-box",
};