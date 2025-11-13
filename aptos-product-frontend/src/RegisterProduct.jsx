// src/RegisterProduct.jsx
import React, { useState } from "react";
import { client, MODULE_ADDRESS } from "./aptosClient";

function strToHex(str) {
  const enc = new TextEncoder().encode(str);
  return "0x" + Array.from(enc).map(x => x.toString(16).padStart(2, "0")).join("");
}

export default function RegisterProduct({ address }) {
  const [name, setName] = useState("");
  const [metadata, setMetadata] = useState("");
  const [status, setStatus] = useState("");

  async function register(e) {
    e.preventDefault();
    if (!window.aptos) {
      setStatus("Install a wallet (Petra / Fewcha / Martian).");
      return;
    }
    if (!address) {
      setStatus("Please connect wallet first.");
      return;
    }

    try {
      setStatus("Preparing transaction...");

      const payload = {
        type: "entry_function_payload",
        function: `${MODULE_ADDRESS}::ProductAuth::register_product`,
        type_arguments: [],
        arguments: [ strToHex(name), strToHex(metadata) ],
      };

      // sign and submit via injected wallet
      const tx = await window.aptos.signAndSubmitTransaction(payload);
      setStatus(`Transaction submitted: ${tx.hash} — waiting for confirmation...`);

      await client.waitForTransaction(tx.hash);

      // --- NEW: read the Registry resource to get next_id ---
      const resourceType = `${MODULE_ADDRESS}::ProductAuth::Registry`;
      const resource = await client.getAccountResource(address, resourceType);
      // resource.data.next_id should contain the next id; parse it safely
      let nextId = 0;
      if (resource && resource.data && resource.data.next_id !== undefined) {
        // sometimes it's a string, sometimes number
        nextId = Number(resource.data.next_id);
      } else if (resource && resource.data && resource.data["next_id"]) {
        nextId = Number(resource.data["next_id"]);
      }

      const tokenId = Math.max(0, nextId - 1);
      setStatus(`Registered! token_id = ${tokenId}`);
    } catch (err) {
      console.error(err);
      // If it's an API error returned from node, try to show message
      const msg = err?.response?.data?.message ?? err?.message ?? JSON.stringify(err);
      setStatus("Error: " + msg);
    }
  }

  return (
    <div className="card">
      <h2>Register product</h2>
      <form onSubmit={register} className="form">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Product name (e.g., InkPen SN123)" />
        <input value={metadata} onChange={e => setMetadata(e.target.value)} placeholder='Metadata (JSON / serial / hash) e.g. {"sn":"SN123"}' />
        <button className="btn" type="submit">Register on Aptos</button>
      </form>

      <div className="status">{status}</div>
    </div>
  );
}
