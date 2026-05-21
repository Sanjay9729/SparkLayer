import { useNavigate } from "react-router-dom";

export default function Home() {
  const shop = localStorage.getItem("shop") || "Your Store";
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("shop");
    navigate("/auth?error=no_session", { replace: true });
  }

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          <h2 style={styles.logoText}>SparkLayer</h2>
          <p style={styles.shopName}>{shop}</p>
        </div>
        <nav style={styles.nav}>
          <a href="/" style={{ ...styles.navItem, ...styles.navItemActive }}>
            Home
          </a>
          <a href="#" style={styles.navItem}>Activity</a>
          <a href="#" style={styles.navItem}>Pricing</a>
          <a href="#" style={styles.navItem}>Customers</a>
          <a href="#" style={styles.navItem}>Forms</a>
          <a href="#" style={styles.navItem}>Integrations</a>
          <a href="#" style={styles.navItem}>Settings</a>
        </nav>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <h1 style={styles.heading}>Welcome to SparkLayer</h1>
        <p style={styles.subtitle}>
          Your B2B & Wholesale dashboard for <strong>{shop}</strong>
        </p>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3 style={styles.statLabel}>Orders</h3>
            <p style={styles.statValue}>0</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statLabel}>Total Sales</h3>
            <p style={styles.statValue}>US$0</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statLabel}>Average Order Value</h3>
            <p style={styles.statValue}>US$0</p>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  sidebar: {
    width: "240px",
    backgroundColor: "#1a1a2e",
    color: "#fff",
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    padding: "0 20px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  logoText: {
    margin: 0,
    fontSize: "20px",
  },
  shopName: {
    margin: "4px 0 0",
    fontSize: "12px",
    color: "rgba(255,255,255,0.6)",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 0",
    flex: 1,
  },
  navItem: {
    padding: "10px 20px",
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    fontSize: "14px",
    transition: "background 0.2s",
  },
  navItemActive: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
  },
  logoutBtn: {
    margin: "10px 20px",
    padding: "8px",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  main: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#f8f9fa",
  },
  heading: {
    fontSize: "28px",
    margin: "0 0 8px",
    color: "#333",
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
    margin: "0 0 30px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  statCard: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  statLabel: {
    fontSize: "14px",
    color: "#888",
    margin: "0 0 8px",
    fontWeight: 500,
  },
  statValue: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#333",
    margin: 0,
  },
};
