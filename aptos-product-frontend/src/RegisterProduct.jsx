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

      // read next_id and compute token id
      const nextRaw = await client.view({
        function: `${MODULE_ADDRESS}::ProductAuth::get_next_id`,
        type_arguments: [],
        arguments: [ address ]
      });

      // normalize response
      const nextId = (Array.isArray(nextRaw) ? Number(nextRaw[0]) : Number(nextRaw)) || 0;
      const tokenId = Math.max(0, nextId - 1);

      setStatus(`Registered! token_id = ${tokenId}`);
    } catch (err) {
      console.error(err);
      setStatus("Error: " + (err?.message || JSON.stringify(err)));
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
