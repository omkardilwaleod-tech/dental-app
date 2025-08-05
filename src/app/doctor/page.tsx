"use client";
import { useEffect, useState } from "react";

const treatmentPrices: Record<string, number> = {
  "Cleaning (Scaling)": 500,
  "Filling": 800,
  "Root Canal Treatment (RCT)": 3500,
  "Crown/Cap": 2500,
  "Extraction": 1000,
  "Braces/Orthodontics": 25000,
  "Implant": 20000,
  "Dentures": 8000,
  "Whitening": 3000,
  "Veneers": 7000,
  "Bridge": 6000,
  "Gum Treatment": 2000,
  "Pediatric Dentistry": 1500,
  "Other": 0,
};

const consultants = [
  { name: "No", fee: 0 },
  { name: "Dr. A", fee: 1000 },
  { name: "Dr. B", fee: 1200 },
  { name: "Dr. C", fee: 1500 },
];

const treatmentOptions = Object.keys(treatmentPrices);

export default function DoctorPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editRows, setEditRows] = useState<Record<string, any>>({});
  const [todayTotal, setTodayTotal] = useState(0);
  const [tab, setTab] = useState<"completed" | "next" | "pending">("pending");

  useEffect(() => {
    fetch("/api/patient")
      .then((res) => res.json())
      .then((data) => {
        setPatients(data.patients || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Calculate today's total collection
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const total = patients
      .filter(
        (p) =>
          p.status === "completed" &&
          p.updatedAt &&
          new Date(p.updatedAt).setHours(0, 0, 0, 0) === today.getTime()
      )
      .reduce((sum, p) => sum + (p.total || 0), 0);
    setTodayTotal(total);
  }, [patients]);

  const handleEditChange = (id: string, field: string, value: any) => {
    setEditRows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const getTotal = (row: any) => {
    const treatment = row.treatment || "";
    const treatmentPrice = treatmentPrices[treatment] || 0;
    return treatmentPrice;
  };

  const handleSubmit = async (id: string, rowOverride?: any) => {
    const row = rowOverride || editRows[id];
    if (!row) return;
    const res = await fetch("/api/patient", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: id,
        treatment: row.treatment,
        treatmentPrice: row.treatmentPrice,
        consultant: row.consultant,
        consultantFee: row.consultantFee,
        status: row.status,
        total: Number(row.treatmentPrice) || 0,
        nextDate: row.nextDate || "",
        nextTime: row.nextTime || "",
        seating: row.seating,
        checkupType: row.checkupType || "checkup",
      }),
    });
    if (res.ok) {
      // Optionally, refresh patients list here
    }
  };

  const filteredPatients = patients.filter((p) => {
    if (tab === "completed") return p.status === "completed";
    if (tab === "next") return p.status === "next_seating";
    // pending: status is empty, null, or undefined
    return !p.status;
  });

  const formatVisitNumber = (n: number) => {
    if (n === 1) return "1st";
    if (n === 2) return "2nd";
    if (n === 3) return "3rd";
    return `${n}th`;
  };

  return (
    <div style={{ width: "100vw", minHeight: "100vh", background: "#f8fafc", padding: "8px 0" }}>
      <div style={{ width: "100vw", margin: "0 auto", padding: "0 2vw" }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: 10,
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "#1e293b",
          letterSpacing: 1,
        }}>
          All Registered Patients
        </h2>
        <div style={{
          fontWeight: 600,
          fontSize: "1.1rem",
          color: "#059669",
          marginBottom: 12,
          textAlign: "right"
        }}>
          Today's Collection: ₹{todayTotal}
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
          <button
            onClick={() => setTab("pending")}
            style={{
              ...tabBtnStyle,
              background: tab === "pending" ? "#f59e42" : "#e5e7eb",
              color: tab === "pending" ? "#fff" : "#334155",
            }}
          >
            Pending OPD
          </button>
          <button
            onClick={() => setTab("next")}
            style={{
              ...tabBtnStyle,
              background: tab === "next" ? "#2563eb" : "#e5e7eb",
              color: tab === "next" ? "#fff" : "#334155",
            }}
          >
            Next Seating/Visit
          </button>
          <button
            onClick={() => setTab("completed")}
            style={{
              ...tabBtnStyle,
              background: tab === "completed" ? "#059669" : "#e5e7eb",
              color: tab === "completed" ? "#fff" : "#334155",
            }}
          >
            Treatment Completed
          </button>
        </div>
        {loading ? (
          <div className="text-center my-4">Loading...</div>
        ) : filteredPatients.length === 0 ? (
          <div className="text-center my-4">No patients found.</div>
        ) : (
          <div style={{
            overflowX: "auto",
            background: "#fff",
            borderRadius: 6,
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            padding: "0 0 4px 0"
          }}>
            <table className="table table-striped table-hover" style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 900,
              fontFamily: "'Segoe UI', Arial, sans-serif",
              fontSize: "0.85rem"
            }}>
              <thead className="table-primary">
                <tr>
                  <th style={thStyle}>#</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Mobile</th>
                  <th style={thStyle}>Address</th>
                  <th style={thStyle}>OPD</th>
                  <th style={thStyle}>Visit No.</th>
                  {tab === "pending" && <th style={thStyle}>Checkup</th>}
                  <th style={thStyle}>Treatment</th>
                  <th style={thStyle}>Treatment Price</th>
                  <th style={thStyle}>Consultant</th>
                  <th style={thStyle}>Consultant Fee</th>
                  <th style={thStyle}>Total</th>
                  <th style={thStyle}>Registered At</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Submit</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((p, idx) => {
                  const row = editRows[p._id] || {
                    treatment: p.treatment,
                    treatmentPrice: p.treatmentPrice ?? (treatmentPrices[p.treatment] || 0),
                    consultant: p.consultant || "No",
                    consultantFee: p.consultantFee ?? (consultants.find((c) => c.name === (p.consultant || "No"))?.fee || 0),
                    status: "",
                    nextDate: p.nextDate || "",
                    nextTime: p.nextTime || "",
                    seating: p.seating || 1,
                    checkupType: p.checkupType || "checkup", // new field
                  };
                  const total = Number(row.treatmentPrice) || 0;

                  return (
                    <tr key={p._id}>
                      <td style={tdStyle}>{idx + 1}</td>
                      <td style={tdStyle}>{p.name}</td>
                      <td style={tdStyle}>{p.mobileNo}</td>
                      <td style={tdStyle}>{p.address}</td>
                      <td style={tdStyle}>{p.opdType}</td>
                      <td style={tdStyle}>{formatVisitNumber(row.seating || 1)}</td>
                      {tab === "pending" && (
                        <td style={tdStyle}>
                          <select
                            value={row.checkupType || "checkup"}
                            onChange={e => {
                              const val = e.target.value;
                              handleEditChange(p._id, "checkupType", val);
                              handleEditChange(p._id, "treatment", val === "checkup" ? "Checkup" : "Checkup + Xray");
                              handleEditChange(p._id, "treatmentPrice", val === "checkup" ? 100 : 200);
                            }}
                            style={selectStyle}
                          >
                            <option value="checkup">Checkup</option>
                            <option value="checkup_xray">Checkup + Xray</option>
                          </select>
                        </td>
                      )}
                      <td style={tdStyle}>
                        <select
                          value={row.treatment || ""}
                          onChange={e => {
                            const treatment = e.target.value;
                            handleEditChange(p._id, "treatment", treatment);
                            handleEditChange(p._id, "treatmentPrice", treatmentPrices[treatment] || 0);
                          }}
                          style={selectStyle}
                        >
                          <option value="">Select Treatment</option>
                          {treatmentOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td style={tdStyle}>
                        <input
                          type="number"
                          min={0}
                          value={row.treatmentPrice ?? ""}
                          onChange={e => handleEditChange(p._id, "treatmentPrice", Number(e.target.value))}
                          style={{ ...selectStyle, width: 70 }}
                        />
                      </td>
                      <td style={tdStyle}>
                        <select
                          value={row.consultant || "No"}
                          onChange={e => {
                            const consultant = e.target.value;
                            const fee = consultants.find(c => c.name === consultant)?.fee || 0;
                            handleEditChange(p._id, "consultant", consultant);
                            handleEditChange(p._id, "consultantFee", fee);
                          }}
                          style={selectStyle}
                        >
                          {consultants.map(c => (
                            <option key={c.name} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </td>
                      <td style={tdStyle}>
                        <input
                          type="number"
                          min={0}
                          value={row.consultantFee ?? ""}
                          onChange={e => handleEditChange(p._id, "consultantFee", Number(e.target.value))}
                          style={{ ...selectStyle, width: 70 }}
                        />
                      </td>
                      <td style={tdStyle}><b>₹{total}</b></td>
                      <td style={tdStyle}>
                        {p.createdAt ? new Date(p.createdAt).toLocaleString() : ""}
                      </td>
                      <td style={tdStyle}>
                        <select
                          value={row.status || ""}
                          onChange={e => handleEditChange(p._id, "status", e.target.value)}
                          style={selectStyle}
                        >
                          <option value="">Select</option>
                          <option value="completed">Treatment Completed</option>
                          <option value="next_seating">Next Seating Required</option>
                        </select>
                        {row.status === "next_seating" && (
                          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
                            <input
                              type="date"
                              value={row.nextDate || ""}
                              onChange={e => handleEditChange(p._id, "nextDate", e.target.value)}
                              style={selectStyle}
                            />
                            <input
                              type="time"
                              value={row.nextTime || ""}
                              onChange={e => handleEditChange(p._id, "nextTime", e.target.value)}
                              style={selectStyle}
                            />
                          </div>
                        )}
                      </td>
                      <td style={tdStyle}>
                        <button
                          onClick={async () => {
                            // Auto-increment seating if next_seating
                            let newSeating = row.seating;
                            if (row.status === "next_seating") {
                              newSeating = (p.seating || 1) + 1;
                            }
                            await handleSubmit(p._id, {
                              ...row,
                              seating: newSeating,
                            });
                          }}
                          style={submitBtnStyle}
                        >
                          Submit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <style>
        {`
          .table {
            width: 100%;
            margin-bottom: 1rem;
            color: #212529;
            background-color: transparent;
          }
          .table th, .table td {
            vertical-align: middle;
            border-top: 1px solid #dee2e6;
            padding: 0.25rem 0.3rem;
            text-align: center;
          }
          .table thead th {
            vertical-align: bottom;
            border-bottom: 2px solid #dee2e6;
            background: #e0e7ff;
            color: #2563eb;
            font-weight: 700;
            font-size: 0.92rem;
          }
          .table-striped tbody tr:nth-of-type(odd) {
            background-color: #f9fafb;
          }
          .table-hover tbody tr:hover {
            background-color: #e0e7ff;
            transition: background 0.2s;
          }
          select, input {
            font-size: 0.85rem;
            padding: 2px 4px;
            border-radius: 4px;
            border: 1px solid #d1d5db;
            min-width: 70px;
            background: #f9fafb;
          }
          button {
            border-radius: 4px;
            padding: 3px 10px;
            margin: 0 1px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.9rem;
            line-height: 1;
            background: #2563eb;
            color: #fff;
            border: none;
            transition: background 0.2s;
          }
          button:hover {
            background: #1746a0;
          }
          @media (max-width: 900px) {
            .table, thead, tbody, th, td, tr {
              font-size: 0.82rem !important;
            }
            .table th, .table td {
              padding: 3px 1px !important;
            }
            select, input {
              min-width: 50px !important;
            }
          }
          @media (max-width: 600px) {
            .table, thead, tbody, th, td, tr {
              font-size: 0.78rem !important;
            }
            .table th, .table td {
              padding: 2px 0 !important;
            }
            select, input {
              min-width: 40px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: "center",
  verticalAlign: "middle",
  fontSize: "0.92rem",
};

const tdStyle: React.CSSProperties = {
  textAlign: "center",
  verticalAlign: "middle",
  fontSize: "0.85rem",
};

const selectStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  padding: "2px 4px",
  borderRadius: 4,
  border: "1px solid #d1d5db",
  minWidth: 70,
  background: "#f9fafb",
};

const submitBtnStyle: React.CSSProperties = {
  borderRadius: 4,
  padding: "3px 10px",
  margin: "0 1px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "0.9rem",
  lineHeight: 1,
  background: "#2563eb",
  color: "#fff",
  border: "none",
  transition: "background 0.2s",
};

const tabBtnStyle: React.CSSProperties = {
  border: "none",
  borderRadius: 6,
  padding: "8px 18px",
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background 0.2s",
};