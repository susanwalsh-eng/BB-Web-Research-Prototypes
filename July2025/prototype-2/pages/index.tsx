import React from "react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>BB Web Research - Prototype 2</title>
        <meta name="description" content="Business Banking Homepage v2" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          fontFamily: "Inter, sans-serif",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #f1f5f9 0%, #ffffff 100%)",
          minHeight: "100vh",
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
              color: "#218FB7",
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
            Prototype 2 - Homepage v2
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#64748b",
            }}
          >
            Enhanced business banking dashboard concept
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
              borderTop: "4px solid #218FB7",
            }}
          >
            <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>
              Dashboard Overview
            </h3>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}>
              Enhanced overview with better visual hierarchy and improved UX.
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0",
              borderTop: "4px solid #218FB7",
            }}
          >
            <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>
              Smart Insights
            </h3>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}>
              AI-powered insights and recommendations for your business.
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0",
              borderTop: "4px solid #218FB7",
            }}
          >
            <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>
              Advanced Tools
            </h3>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}>
              Streamlined workflows and advanced business banking features.
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: "3rem",
            padding: "2rem",
            background: "linear-gradient(135deg, #218FB7, #1e7a9a)",
            borderRadius: "12px",
            textAlign: "center",
            color: "white",
          }}
        >
          <h3 style={{ marginBottom: "1rem" }}>Status</h3>
          <p style={{ color: "#e0f2fe", fontWeight: "600" }}>
            ✅ Prototype 2 is running successfully
          </p>
          <p style={{ color: "#b3e5fc", marginTop: "0.5rem" }}>
            This is v2 of the business banking homepage with enhanced features.
          </p>
        </div>
      </main>
    </>
  );
}
