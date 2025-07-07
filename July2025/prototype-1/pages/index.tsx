import React from "react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>BB Web Research - Prototype 1</title>
        <meta name="description" content="Business Banking Homepage v1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          fontFamily: "Inter, sans-serif",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: "#FF4F40",
              marginBottom: "1rem",
            }}
          >
            Monzo Business Banking
          </h1>
          <h2
            style={{
              fontSize: "1.5rem",
              color: "#334155",
              marginBottom: "0.5rem",
            }}
          >
            Prototype 1 - Homepage v1
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#64748b",
            }}
          >
            Business banking dashboard concept
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>
              Account Overview
            </h3>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}>
              Quick overview of your business accounts and recent activity.
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>
              Recent Transactions
            </h3>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}>
              View and manage your latest business transactions.
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>
              Quick Actions
            </h3>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}>
              Make payments, transfers, and manage your business banking.
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: "3rem",
            padding: "2rem",
            background: "#f8fafc",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>Status</h3>
          <p style={{ color: "#059669", fontWeight: "600" }}>
            ✅ Prototype 1 is running successfully
          </p>
          <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
            This is a development version of the business banking homepage
            concept.
          </p>
        </div>
      </main>
    </>
  );
}
