import React, { useState, useEffect } from "react";

// Simplified Aptos client setup
const MODULE_ADDRESS = "0x1"; // Replace with your actual module address
const client = {
  waitForTransaction: async (hash) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { success: true };
  },
  getAccountResource: async (address, resourceType) => {
    return {
      data: {
        next_id: "1",
        products: [
          { id: "0", metadata: "0x7b227465737422203a202250726f6475637420313233227d" }
        ]
      }
    };
  }
};

function strToHex(str) {
  const enc = new TextEncoder().encode(str);
  return "0x" + Array.from(enc).map(x => x.toString(16).padStart(2, "0")).join("");
}

function hexToStr(hex) {
  if (!hex) return "";
  if (typeof hex !== "string") return JSON.stringify(hex);
  if (hex.startsWith("0x")) hex = hex.slice(2);
  if (hex.length === 0) return "";
  const bytes = hex.match(/.{1,2}/g).map((b) => parseInt(b, 16));
  return new TextDecoder().decode(new Uint8Array(bytes));
}

function bytesArrayToStr(arr) {
  try {
    const bytes = new Uint8Array(arr.map((n) => Number(n)));
    return new TextDecoder().decode(bytes);
  } catch (e) {
    return JSON.stringify(arr);
  }
}

// RotatingTextWithBorder Component
function RotatingTextWithBorder({ texts, rotationInterval }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  return (
    <span style={{
      display: "inline-block",
      padding: "4px 16px",
      border: "2px solid #2563eb",
      borderRadius: "9999px",
      fontWeight: 700,
      color: "#2563eb",
      transition: "all 0.5s ease",
      animation: "fadeIn 0.5s ease"
    }}>
      {texts[currentIndex]}
    </span>
  );
}

// Navbar Component
function Navbar({ address, onConnect, onNavigate }) {
  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 40,
      background: "rgba(255, 255, 255, 0.95)",
      borderBottom: "1px solid #e5e7eb",
      backdropFilter: "blur(12px)"
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{
          fontSize: 24,
          fontWeight: 800,
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.5px"
        }}>
          TAGIN
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            onClick={() => onNavigate("landing")}
            style={{
              padding: "8px 16px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontWeight: 500,
              color: "#4b5563",
              transition: "color 0.2s"
            }}
            onMouseOver={(e) => e.target.style.color = "#111827"}
            onMouseOut={(e) => e.target.style.color = "#4b5563"}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate("register")}
            style={{
              padding: "8px 16px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontWeight: 500,
              color: "#4b5563",
              transition: "color 0.2s"
            }}
            onMouseOver={(e) => e.target.style.color = "#111827"}
            onMouseOut={(e) => e.target.style.color = "#4b5563"}
          >
            Register
          </button>
          <button
            onClick={() => onNavigate("verify")}
            style={{
              padding: "8px 16px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontWeight: 500,
              color: "#4b5563",
              transition: "color 0.2s"
            }}
            onMouseOver={(e) => e.target.style.color = "#111827"}
            onMouseOut={(e) => e.target.style.color = "#4b5563"}
          >
            Verify
          </button>
          {address ? (
            <div style={{
              background: "#f3f4f6",
              padding: "8px 14px",
              borderRadius: 9999,
              fontFamily: "monospace",
              fontSize: 13,
              fontWeight: 600,
              color: "#374151"
            }}>
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          ) : (
            <button
              onClick={onConnect}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: 9999,
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(37, 99, 235, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.3)";
              }}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

// LandingPage Component
function LandingPage({ onStart }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselImages = [
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=500&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: "linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%)" }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 24px 120px"
      }}>
        <div style={{
          display: "flex",
          gap: 60,
          alignItems: "center",
          flexWrap: "wrap"
        }}>
          <div style={{ flex: 1, minWidth: 320 }}>
            <div style={{ marginBottom: 20 }}>
              <span style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: 9999,
                background: "#dbeafe",
                color: "#1e40af",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.5px"
              }}>
                🛡️ TAG-IN NFC ANTI-COUNTERFEIT
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
              margin: "24px 0",
              color: "#111827",
              fontWeight: 800,
              letterSpacing: "-1px"
            }}>
              Authenticate any{" "}
              <RotatingTextWithBorder
                texts={["Sneakers", "Watches", "Handbags"]}
                rotationInterval={2500}
              />
              <br />
              with just a Tap.
            </h1>

            <p style={{
              color: "#6b7280",
              fontSize: 18,
              lineHeight: 1.7,
              maxWidth: 580,
              marginBottom: 32
            }}>
              Embed an NFC chip, link it to tamper-proof blockchain records, and give buyers instant trust from their phone — no app required.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                onClick={onStart}
                style={{
                  padding: "14px 32px",
                  border: "none",
                  borderRadius: 9999,
                  background: "linear-gradient(135deg, #111827 0%, #374151 100%)",
                  color: "white",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 10px 25px rgba(17, 24, 39, 0.3)",
                  transition: "all 0.3s"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow = "0 15px 35px rgba(17, 24, 39, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 10px 25px rgba(17, 24, 39, 0.3)";
                }}
              >
                Get Started
              </button>
              <button
                style={{
                  padding: "14px 32px",
                  border: "2px solid #e5e7eb",
                  borderRadius: 9999,
                  background: "white",
                  color: "#111827",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#f9fafb";
                  e.target.style.borderColor = "#d1d5db";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "white";
                  e.target.style.borderColor = "#e5e7eb";
                }}
              >
                How it works
              </button>
            </div>
          </div>

          <div style={{
            width: 380,
            height: 450,
            position: "relative",
            display: "none",
            '@media (min-width: 1024px)': { display: "block" }
          }}>
            <div style={{ position: "absolute", inset: 0 }}>
              {carouselImages.map((img, idx) => {
                const position = (idx - currentIndex + carouselImages.length) % carouselImages.length;
                const radius = 160;
                const angle = position * (120 * Math.PI / 180) + Math.PI;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      transform: position === 0
                        ? `translate(${110 + x}px, ${120 + y}px) scale(1.14)`
                        : `translate(${110 + x}px, ${120 + y}px) scale(0.5)`,
                      opacity: position === 0 ? 1 : 0.65,
                      zIndex: position === 0 ? 2 : 1,
                      width: position === 0 ? 320 : 128,
                      height: position === 0 ? 392 : 160,
                      borderRadius: 20,
                      overflow: "hidden",
                      transition: "all 700ms cubic-bezier(.2,.9,.25,1)",
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    <img
                      src={img}
                      alt={`Product ${idx + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block"
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 80,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24
        }}>
          {[
            {
              icon: "⚡",
              title: "Instant Verification",
              desc: "Buyers tap the product to verify authenticity instantly — no app download required."
            },
            {
              icon: "🔒",
              title: "Tamper-proof",
              desc: "All product records are written to the Aptos blockchain for immutable provenance."
            },
            {
              icon: "🚀",
              title: "Easy Integration",
              desc: "Manufacturers can register products via a simple web interface and NFC tags."
            }
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                background: "white",
                padding: 32,
                borderRadius: 20,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
                transition: "transform 0.3s, box-shadow 0.3s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.12)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.06)";
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>{feature.icon}</div>
              <h3 style={{
                margin: "0 0 12px 0",
                fontSize: 20,
                fontWeight: 700,
                color: "#111827"
              }}>
                {feature.title}
              </h3>
              <p style={{
                margin: 0,
                color: "#6b7280",
                lineHeight: 1.6
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// RegisterProduct Component
function RegisterProduct({ address }) {
  const [name, setName] = useState("");
  const [metadata, setMetadata] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function register(e) {
    e.preventDefault();
    if (!window.aptos) {
      setStatus("❌ Install a wallet (Petra / Fewcha / Martian).");
      return;
    }
    if (!address) {
      setStatus("❌ Please connect wallet first.");
      return;
    }

    try {
      setLoading(true);
      setStatus("⏳ Preparing transaction...");

      const payload = {
        type: "entry_function_payload",
        function: `${MODULE_ADDRESS}::ProductAuth::register_product`,
        type_arguments: [],
        arguments: [strToHex(name), strToHex(metadata)]
      };

      const tx = await window.aptos.signAndSubmitTransaction(payload);
      setStatus(`📤 Transaction submitted: ${tx.hash}\n⏳ Waiting for confirmation...`);

      await client.waitForTransaction(tx.hash);

      const resourceType = `${MODULE_ADDRESS}::ProductAuth::Registry`;
      const resource = await client.getAccountResource(address, resourceType);
      let nextId = 0;
      if (resource?.data?.next_id !== undefined) {
        nextId = Number(resource.data.next_id);
      }

      const tokenId = Math.max(0, nextId - 1);
      setStatus(`✅ Successfully registered! Token ID: ${tokenId}`);
      setName("");
      setMetadata("");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message ?? err?.message ?? JSON.stringify(err);
      setStatus("❌ Error: " + msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      background: "white",
      padding: 40,
      borderRadius: 20,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)"
    }}>
      <h2 style={{
        margin: "0 0 24px 0",
        fontSize: 28,
        fontWeight: 700,
        color: "#111827"
      }}>
        Register Product
      </h2>
      <form onSubmit={register} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label style={{
            display: "block",
            marginBottom: 8,
            fontSize: 14,
            fontWeight: 600,
            color: "#374151"
          }}>
            Product Name
          </label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g., Nike Air Jordan SN123"
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: "2px solid #e5e7eb",
              fontSize: 15,
              transition: "border-color 0.2s",
              outline: "none"
            }}
            onFocus={(e) => e.target.style.borderColor = "#2563eb"}
            onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
          />
        </div>

        <div>
          <label style={{
            display: "block",
            marginBottom: 8,
            fontSize: 14,
            fontWeight: 600,
            color: "#374151"
          }}>
            Metadata (JSON)
          </label>
          <input
            value={metadata}
            onChange={e => setMetadata(e.target.value)}
            placeholder='{"serial":"SN123","batch":"2024-Q1"}'
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: "2px solid #e5e7eb",
              fontSize: 15,
              transition: "border-color 0.2s",
              outline: "none"
            }}
            onFocus={(e) => e.target.style.borderColor = "#2563eb"}
            onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "14px 24px",
            border: "none",
            borderRadius: 12,
            background: loading ? "#9ca3af" : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            color: "white",
            fontSize: 16,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
            transition: "all 0.3s"
          }}
          onMouseOver={(e) => {
            if (!loading) {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(37, 99, 235, 0.4)";
            }
          }}
          onMouseOut={(e) => {
            if (!loading) {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.3)";
            }
          }}
        >
          {loading ? "Registering..." : "Register on Aptos"}
        </button>
      </form>

      {status && (
        <div style={{
          marginTop: 24,
          padding: 16,
          borderRadius: 12,
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          fontSize: 14,
          color: "#374151",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace"
        }}>
          {status}
        </div>
      )}
    </div>
  );
}

// VerifyProduct Component
function VerifyProduct() {
  const [owner, setOwner] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function verify(e) {
    e.preventDefault();
    setLoading(true);
    setResult("🔍 Querying blockchain...");

    try {
      if (!owner) {
        setResult("❌ Enter manufacturer address (0x...)");
        setLoading(false);
        return;
      }
      if (tokenId === "") {
        setResult("❌ Enter token ID");
        setLoading(false);
        return;
      }

      const ownerAddr = owner.startsWith("0x") ? owner : "0x" + owner;
      const tid = Number(tokenId);

      const resourceType = `${MODULE_ADDRESS}::ProductAuth::Registry`;
      const resource = await client.getAccountResource(ownerAddr, resourceType);

      if (!resource?.data) {
        setResult("❌ No Registry resource found for this account.");
        setLoading(false);
        return;
      }

      const products = resource.data.products || [];

      if (products.length === 0) {
        setResult("❌ No products found.");
        setLoading(false);
        return;
      }

      let found = null;
      for (const p of products) {
        if (Number(p.id) === tid) {
          found = p;
          break;
        }
      }

      if (!found) {
        setResult("❌ Product not found for this token ID.");
        setLoading(false);
        return;
      }

      const meta = found.metadata;
      let decoded = "";

      if (typeof meta === "string") {
        decoded = meta.startsWith("0x") ? hexToStr(meta) : meta;
      } else if (Array.isArray(meta)) {
        decoded = bytesArrayToStr(meta);
      } else {
        decoded = JSON.stringify(meta);
      }

      setResult(`✅ Product Verified!\n\nToken ID: ${tid}\n\nMetadata:\n${decoded}`);
    } catch (err) {
      console.error(err);
      const apiMsg = err?.response?.data?.message || err?.message || JSON.stringify(err);
      setResult("❌ Error: " + apiMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      background: "white",
      padding: 40,
      borderRadius: 20,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)"
    }}>
      <h2 style={{
        margin: "0 0 24px 0",
        fontSize: 28,
        fontWeight: 700,
        color: "#111827"
      }}>
        Verify Product
      </h2>
      <form onSubmit={verify} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label style={{
            display: "block",
            marginBottom: 8,
            fontSize: 14,
            fontWeight: 600,
            color: "#374151"
          }}>
            Manufacturer Address
          </label>
          <input
            value={owner}
            onChange={e => setOwner(e.target.value)}
            placeholder="0x..."
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: "2px solid #e5e7eb",
              fontSize: 15,
              transition: "border-color 0.2s",
              outline: "none",
              fontFamily: "monospace"
            }}
            onFocus={(e) => e.target.style.borderColor = "#2563eb"}
            onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
          />
        </div>

        <div>
          <label style={{
            display: "block",
            marginBottom: 8,
            fontSize: 14,
            fontWeight: 600,
            color: "#374151"
          }}>
            Token ID
          </label>
          <input
            value={tokenId}
            onChange={e => setTokenId(e.target.value)}
            placeholder="0"
            type="number"
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: "2px solid #e5e7eb",
              fontSize: 15,
              transition: "border-color 0.2s",
              outline: "none"
            }}
            onFocus={(e) => e.target.style.borderColor = "#2563eb"}
            onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "14px 24px",
            border: "none",
            borderRadius: 12,
            background: loading ? "#9ca3af" : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "white",
            fontSize: 16,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
            transition: "all 0.3s"
          }}
          onMouseOver={(e) => {
            if (!loading) {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(16, 185, 129, 0.4)";
            }
          }}
          onMouseOut={(e) => {
            if (!loading) {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.3)";
            }
          }}
        >
          {loading ? "Verifying..." : "Verify Product"}
        </button>
      </form>

      {result && (
        <div style={{
          marginTop: 24,
          padding: 20,
          borderRadius: 12,
          background: result.includes("✅") ? "#ecfdf5" : "#fef2f2",
          border: `2px solid ${result.includes("✅") ? "#10b981" : "#ef4444"}`,
          fontSize: 14,
          color: "#374151",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace"
        }}>
          {result}
        </div>
      )}
    </div>
  );
}

// About/How It Works Component
function About() {
  const features = [
    {
      icon: "📱",
      title: "Tiny NFC in every genuine unit",
      desc: "Embed a tiny RFID/NFC chip at manufacturing so each item gets a unique hardware identity."
    },
    {
      icon: "🔐",
      title: "Secured on blockchain",
      desc: "Bind that chip's UID to an immutable on-chain record—creating an unchangeable digital ID."
    },
    {
      icon: "👆",
      title: "Tap to verify",
      desc: "Consumers simply tap with an NFC-enabled phone—no app needed—to get instant, on-chain proof."
    },
    {
      icon: "🔧",
      title: "Component-level checks",
      desc: "Support part-by-part verification: verify internal components inside complex devices."
    },
    {
      icon: "🎨",
      title: "NFT ownership",
      desc: "Each product can carry an NFT certificate enabling verified resale and transfers."
    },
    {
      icon: "⚠️",
      title: "Revoke fakes in real time",
      desc: "Manufacturers can revoke a counterfeit tag immediately and warn future buyers."
    }
  ];

  return (
    <div style={{
      background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
      padding: "100px 24px"
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto"
      }}>
        <div style={{
          textAlign: "center",
          marginBottom: 80
        }}>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            color: "#111827",
            marginBottom: 16,
            letterSpacing: "-1px"
          }}>
            How It Works
          </h2>
          <p style={{
            fontSize: 18,
            color: "#6b7280",
            maxWidth: 600,
            margin: "0 auto"
          }}>
            A seamless authentication system powered by NFC technology and blockchain security
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 32
        }}>
          {features.map((feature, i) => (
            <div
              key={i}
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
                border: "1px solid #e5e7eb",
                borderRadius: 24,
                padding: 32,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-12px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.12)";
                e.currentTarget.style.borderColor = "#3b82f6";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <div style={{
                fontSize: 48,
                marginBottom: 20,
                display: "inline-block",
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                padding: 16,
                borderRadius: 16,
                lineHeight: 1
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#111827",
                marginBottom: 12,
                lineHeight: 1.3
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: 15,
                color: "#6b7280",
                lineHeight: 1.7,
                margin: 0
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div style={{
          marginTop: 100,
          padding: "60px 40px",
          background: "linear-gradient(135deg, #111827 0%, #374151 100%)",
          borderRadius: 32,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 48,
          textAlign: "center"
        }}>
          {[
            { number: "99.9%", label: "Authentication Accuracy" },
            { number: "<1s", label: "Verification Time" },
            { number: "∞", label: "Blockchain Security" }
          ].map((stat, i) => (
            <div key={i}>
              <div style={{
                fontSize: 48,
                fontWeight: 800,
                color: "white",
                marginBottom: 8,
                background: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: 16,
                color: "#9ca3af",
                fontWeight: 500
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [address, setAddress] = useState(null);
  const [page, setPage] = useState("landing");

  async function connectWallet() {
    if (!window.aptos) {
      alert("Please install an Aptos wallet extension (Petra, Fewcha, Martian).");
      return;
    }

    try {
      const res = await window.aptos.connect();
      const addr = res?.address ?? res;
      setAddress(addr);
    } catch (err) {
      console.error("connect failed", err);
      alert("Wallet connection failed. Check the extension.");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
      `}</style>

      <Navbar
        address={address}
        onConnect={connectWallet}
        onNavigate={(p) => setPage(p)}
      />

      {page === "landing" && (
        <div>
          <LandingPage onStart={() => setPage("register")} />
          <About />
        </div>
      )}

      {page === "register" && (
        <main style={{
          maxWidth: 800,
          margin: "60px auto",
          padding: "0 24px"
        }}>
          <RegisterProduct address={address} />
        </main>
      )}

      {page === "verify" && (
        <main style={{
          maxWidth: 800,
          margin: "60px auto",
          padding: "0 24px"
        }}>
          <VerifyProduct />
        </main>
      )}
    </div>
  );
}
