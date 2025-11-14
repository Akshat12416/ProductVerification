import React from "react";

export default function Navbar({ address, onConnect, onNavigate }) {
  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 40,
      background: "transparent",
      padding: "18px 0",
      backdropFilter: "blur(6px)"
    }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>TAGIN</div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={() => onNavigate("landing")} className="tab">Home</button>
          <button onClick={() => onNavigate("register")} className="tab">Register</button>
          <button onClick={() => onNavigate("verify")} className="tab">Verify</button>
          {address ? (
            <code style={{ background: "#f3f4f6", padding: "6px 8px", borderRadius: 6 }}>{address.slice(0, 8)}...{address.slice(-6)}</code>
          ) : (
            <button onClick={onConnect} className="btn">Connect</button>
          )}
        </div>
      </div>
    </nav>
  );
}
