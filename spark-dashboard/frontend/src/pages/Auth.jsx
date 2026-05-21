import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Authenticating...");

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error === "no_session") {
      setStatus("No active session. Please open the dashboard from Shopify.");
      return;
    }

    if (!token) {
      setStatus("No authentication token provided.");
      return;
    }

    verifyToken(token);
  }, [searchParams]);

  async function verifyToken(token) {
    try {
      const response = await fetch(`${API_URL}/api/auth/verify-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("sessionToken", data.sessionToken);
        localStorage.setItem("shop", data.shop);
        navigate("/", { replace: true });
      } else {
        setStatus("Authentication failed. Please try again from Shopify.");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setStatus("Unable to connect to server. Please try again.");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>SparkLayer</h2>
        <p style={styles.status}>{status}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "16px",
    color: "#333",
  },
  status: {
    fontSize: "16px",
    color: "#666",
  },
};
