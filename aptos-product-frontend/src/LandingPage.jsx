import React, { useState, useEffect } from "react";
import RotatingTextWithBorder from "./RotatingTextWithBorder";
import "./styles.css";

export default function LandingPage({ onStart }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselImages = [
    // you can replace these with your real image paths or URLs
    "/nikebg.png",
    "/watchbg.png",
    "/handbagbg.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const getImageStyle = (index) => {
    const position = (index - currentIndex + carouselImages.length) % carouselImages.length;
    const radius = 160;
    const angle = position * (120 * Math.PI / 180) + Math.PI;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const centerX = 110;
    const centerY = 120;

    if (position === 0) {
      return {
        transform: `translate(${centerX + x}px, ${centerY + y}px) scale(1.14)`,
        opacity: 1,
        zIndex: 2,
        width: 320,
        height: 392,
      };
    } else {
      return {
        transform: `translate(${centerX + x}px, ${centerY + y}px) scale(0.5)`,
        opacity: 0.65,
        zIndex: 1,
        width: 128,
        height: 160,
      };
    }
  };

  return (
    <div className="landing-hero" style={{ background: "linear-gradient(180deg,#fff,#f6f9ff)" }}>
      <div className="container" style={{ paddingTop: 36, paddingBottom: 60 }}>
        <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 320 }}>
            <div style={{ marginBottom: 10 }}>
              <span style={{ display: "inline-block", padding: "6px 12px", borderRadius: 9999, background: "#eaf3ff", color: "#0b63ff", fontWeight: 700 }}>
                TAG-IN NFC Anti-Counterfeit
              </span>
            </div>

            <h1 style={{ fontSize: "2.8rem", lineHeight: 1.02, margin: "18px 0", color: "#0f1724" }}>
              Authenticate any <br />
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <RotatingTextWithBorder texts={["Sneakers", "Watches", "Handbags"]} rotationInterval={2500} />
                <span style={{ fontWeight: 600 }}>with just a Tap.</span>
              </span>
            </h1>

            <p style={{ color: "#6b7280", maxWidth: 560, marginBottom: 18 }}>
              Embed an NFC chip, link it to tamper-proof blockchain records, and give buyers instant trust from their phone — no app required.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={onStart} className="primary-cta">Get Started</button>
              <button className="secondary-cta" onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}>How it works</button>
            </div>
          </div>

          {/* visual carousel */}
          <div style={{ width: 360, height: 420, position: "relative", display: "none" }} className="carousel-desktop">
            <div style={{ position: "absolute", inset: 0 }}>
              {carouselImages.map((img, idx) => {
                const style = getImageStyle(idx);
                return (
                  <div key={idx}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      transform: style.transform,
                      opacity: style.opacity,
                      zIndex: style.zIndex,
                      width: style.width,
                      height: style.height,
                      borderRadius: 14,
                      overflow: "hidden",
                      transition: "all 700ms cubic-bezier(.2,.9,.25,1)"
                    }}
                  >
                    <img src={img} alt={`c${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* short features / support block */}
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Instant Verification</h3>
            <p style={{ color: "#6b7280" }}>Buyers tap the product to verify authenticity instantly — no app download required.</p>
          </div>

          <div className="card">
            <h3 style={{ marginTop: 0 }}>Tamper-proof</h3>
            <p style={{ color: "#6b7280" }}>All product records are written to the Aptos blockchain for immutable provenance.</p>
          </div>

          <div className="card">
            <h3 style={{ marginTop: 0 }}>Easy Integration</h3>
            <p style={{ color: "#6b7280" }}>Manufacturers can register products via a simple web interface and NFC tags.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
