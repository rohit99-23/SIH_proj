import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import styles from "../../styles/admin.module.css";

export default function DashboardPage() {
  const [users, setUsers] = useState([]);
  // placeholder data (replace with real API/Firestore calls)
  useEffect(() => {
    setUsers([
      { id: "u1", email: "aila@student.com", role: "student" },
      { id: "u2", email: "dr.bharst@uni.edu", role: "faculty" },
    ]);
  }, []);

  return (
    <AdminLayout>
      <section className={styles.overview}>
        <div className={styles.metrics}>
          <div className={`${styles.metricCard} ${styles.metricCard1}`}>
            <div className={styles.metricTitle}>Total Students</div>
            <div className={styles.metricValue}>1,370</div>
            <div className={styles.metricSub}>+28 this week</div>
          </div>
          <div className={`${styles.metricCard} ${styles.metricCard2}`}>
            <div className={styles.metricTitle}>Total Faculty</div>
            <div className={styles.metricValue}>75</div>
            <div className={styles.metricSub}>+3 this month</div>
          </div>
          <div className={`${styles.metricCard} ${styles.metricCard3}`}>
            <div className={styles.metricTitle}>Verified Submissions</div>
            <div className={styles.metricValue}>20%</div>
            <div className={styles.metricSub}>92% approval rate</div>
          </div>
          <div className={`${styles.metricCard} ${styles.metricCard4}`}>
            <div className={styles.metricTitle}>Pending Approvals</div>
            <div className={styles.metricValue}>130</div>
            <div className={styles.metricSub}>57% this week</div>
          </div>
        </div>

        <div className={styles.gridMain}>
          <div className={styles.leftColumn}>
            <div className={styles.card}>
              <h3>Submission Trends (Monthly)</h3>
              <div className={styles.chartPlaceholder}>[Bar chart placeholder]</div>
            </div>

            <div className={styles.card}>
              <h3>User Management</h3>
              <div className={styles.userMgmt}>
                <button className={styles.tab}>Students</button>
                <button className={styles.tab}>Faculty</button>
                <div className={styles.smallChart}>[mini-line]</div>
              </div>
            </div>

            <div className={styles.card}>
              <h3>Pending Submissions</h3>
              <table className={styles.table}>
                <thead><tr><th>Name</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  <tr>
                    <td>Aila Student</td>
                    <td>aila@student.com</td>
                    <td>Pending</td>
                    <td>
                      <button className={styles.small}>Approve</button>
                      <button className={styles.smallAlt}>Reject</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <aside className={styles.rightColumn}>
            <div className={styles.card}>
              <h4>Active Users by Role</h4>
              <div className={styles.chartPlaceholder}>[Donut placeholder]</div>
            </div>

            <div className={styles.card}>
              <h4>Invitations</h4>
              <div className={styles.inviteList}>
                <div className={styles.inviteItem}>
                  <div>
                    <strong>Dr Bharst</strong>
                    <div className={styles.inviteEmail}>dr.bharst@uni.edu</div>
                  </div>
                  <div className={styles.inviteActions}>
                    <button className={styles.small}>Resend</button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h4>Admin Profile</h4>
              <div className={styles.profileBox}>You are Admin</div>
            </div>
          </aside>
        </div>
      </section>
    </AdminLayout>
  );
}

// NOTE: remove any of these blocks if present in this file:
// export async function getStaticProps(...) { ... }
// export async function getStaticPaths(...) { ... }

// If you need SSR, keep only getServerSideProps (example):
// export async function getServerSideProps(context) {
//   // perform server-side admin check (optional)
//   return { props: {} };
// }