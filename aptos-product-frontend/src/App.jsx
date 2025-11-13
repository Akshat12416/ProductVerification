import React, { useState } from "react";
import RegisterProduct from "./RegisterProduct";
import VerifyProduct from "./VerifyProduct";

export default function App() {
  const [address, setAddress] = useState(null);
  const [page, setPage] = useState("register");

  async function connectWallet() {
    if (!window.aptos) {
      alert("Please install an Aptos wallet extension (Petra, Fewcha, Martian).");
      return;
    }

    try {
      const res = await window.aptos.connect();
      // Some wallets return { address } while others return a string - handle both:
      const addr = res?.address ?? res;
      setAddress(addr);
    } catch (err) {
      console.error("connect failed", err);
      alert("Wallet connection failed. Check the extension.");
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Tagin — Product Authentication (Aptos)</h1>
        <div className="wallet">
          {address ? (
            <div className="connected">Connected: <code>{address}</code></div>
          ) : (
            <button onClick={connectWallet} className="btn">Connect Wallet</button>
          )}
        </div>
      </header>

      <nav className="nav">
        <button onClick={() => setPage("register")} className="tab">Register</button>
        <button onClick={() => setPage("verify")} className="tab">Verify</button>
      </nav>

      <main className="main">
        {page === "register" ? <RegisterProduct address={address} /> : <VerifyProduct />}
      </main>
    </div>
  );
}
