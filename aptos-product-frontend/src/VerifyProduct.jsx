import React, { useState } from "react";
import { client, MODULE_ADDRESS } from "./aptosClient";

function hexToStr(hex) {
  if (!hex) return "";
  if (typeof hex !== "string") return JSON.stringify(hex);
  if (hex.startsWith("0x")) hex = hex.slice(2);
  if (hex.length === 0) return "";
  const bytes = hex.match(/.{1,2}/g).map(b => parseInt(b, 16));
  return new TextDecoder().decode(new Uint8Array(bytes));
}

export default function VerifyProduct() {
  const [owner, setOwner] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [result, setResult] = useState("");

  async function verify(e) {
    e.preventDefault();
    setResult("Querying on-chain...");
    try {
      const resp = await client.view({
        function: `${MODULE_ADDRESS}::ProductAuth::get_product`,
        type_arguments: [],
        arguments: [ owner, Number(tokenId) ]
      });

      const metaRaw = Array.isArray(resp) ? resp[0] ?? resp : resp;
      if (typeof metaRaw === "string" && metaRaw.startsWith("0x")) {
        const txt = hexToStr(metaRaw);
        setResult(txt || "(empty metadata — not found)");
      } else if (Array.isArray(metaRaw)) {
        const txt = new TextDecoder().decode(new Uint8Array(metaRaw));
        setResult(txt || "(empty metadata — not found)");
      } else {
        setResult(JSON.stringify(metaRaw));
      }
    } catch (err) {
      setResult("Error / not found: " + (err?.message || JSON.stringify(err)));
    }
  }

  return (
    <div className="card">
      <h2>Verify product</h2>
      <form onSubmit={verify} className="form">
        <input value={owner} onChange={e => setOwner(e.target.value)} placeholder="Manufacturer address (0x...)" />
        <input value={tokenId} onChange={e => setTokenId(e.target.value)} placeholder="Token ID (number)" />
        <button className="btn" type="submit">Verify</button>
      </form>

      <pre className="status">{result}</pre>
    </div>
  );
}
