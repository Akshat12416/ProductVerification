// src/VerifyProduct.jsx
import React, { useState } from "react";
import { client, MODULE_ADDRESS } from "./aptosClient";

// Converts 0x hex → string
function hexToStr(hex) {
  if (!hex) return "";
  if (typeof hex !== "string") return JSON.stringify(hex);
  if (hex.startsWith("0x")) hex = hex.slice(2);
  if (hex.length === 0) return "";
  const bytes = hex.match(/.{1,2}/g).map((b) => parseInt(b, 16));
  return new TextDecoder().decode(new Uint8Array(bytes));
}

// Converts [1, 2, 3...] → string
function bytesArrayToStr(arr) {
  try {
    const bytes = new Uint8Array(arr.map((n) => Number(n)));
    return new TextDecoder().decode(bytes);
  } catch (e) {
    return JSON.stringify(arr);
  }
}

export default function VerifyProduct() {
  const [owner, setOwner] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [result, setResult] = useState("");

  async function verify(e) {
    e.preventDefault();
    setResult("Querying on-chain...");

    try {
      if (!owner) {
        setResult("Enter manufacturer address (0x...)");
        return;
      }
      if (tokenId === "") {
        setResult("Enter token id");
        return;
      }

      const ownerAddr = owner.startsWith("0x") ? owner : "0x" + owner;
      const tid = Number(tokenId);

      // Registry Resource
      const resourceType = `${MODULE_ADDRESS}::ProductAuth::Registry`;

      const resource = await client.getAccountResource(ownerAddr, resourceType);

      if (!resource || !resource.data) {
        setResult("No Registry resource found for this account.");
        return;
      }

      const products = resource.data.products || [];

      if (products.length === 0) {
        setResult("No products found.");
        return;
      }

      // Find product by token id
      let found = null;

      for (const p of products) {
        const pid = Number(p.id);
        if (pid === tid) {
          found = p;
          break;
        }
      }

      if (!found) {
        setResult("Product not found for this token id.");
        return;
      }

      // Decode metadata
      const meta = found.metadata;
      let decoded = "";

      if (typeof meta === "string") {
        decoded = meta.startsWith("0x") ? hexToStr(meta) : meta;
      } else if (Array.isArray(meta)) {
        decoded = bytesArrayToStr(meta);
      } else {
        decoded = JSON.stringify(meta);
      }

      setResult(`Found product #${tid}\n\nMetadata:\n${decoded}`);
    } catch (err) {
      console.error(err);
      const apiMsg =
        err?.response?.data?.message ||
        err?.message ||
        JSON.stringify(err);
      setResult("Error: " + apiMsg);
    }
  }

  return (
    <div className="card">
      <h2>Verify product</h2>
      <form onSubmit={verify} className="form">
        <input
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="Manufacturer address (0x...)"
        />
        <input
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="Token ID"
        />
        <button className="btn" type="submit">
          Verify
        </button>
      </form>

      <pre className="status">{result}</pre>
    </div>
  );
}
