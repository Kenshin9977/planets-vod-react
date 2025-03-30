import { useEffect, useRef, useState } from "react";

const astres = [
  { name: "Neptune", coords: { left: 7, top: 68, width: 24, height: 12 } },
  { name: "Mars", coords: { left: 44, top: 55, width: 15, height: 11 } },
  { name: "Saturne", coords: { left: 75, top: 40, width: 22, height: 12 } },
  { name: "Lune", coords: { left: 57.5, top: 32.5, width: 9.5, height: 8 } },
  { name: "Mercure", coords: { left: 37.5, top: 35, width: 18, height: 8.5 } },
  { name: "Uranus", coords: { left: 62, top: 9, width: 15.5, height: 9 } },
  { name: "Vénus", coords: { left: 41, top: 0, width: 14, height: 8 } },
  { name: "Jupiter", coords: { left: 13, top: 10, width: 20, height: 12 } },
];

export default function SolarSystem() {
  const [selected, setSelected] = useState<string[]>([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (imageRef.current) {
        setImageSize({
          width: imageRef.current.clientWidth,
          height: imageRef.current.clientHeight,
        });
      }
    });

    if (imageRef.current) observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, []);

  const toggleSelection = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const resetSelection = () => {
    setSelected([]); // Réinitialiser la sélection
  };

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center", gap: "20px" }}>
      {/* Zone Image + Astres */}
      <div style={{ position: "relative", width: "70%", textAlign: "center" }}>
        <img
          ref={imageRef}
          src="Vo-D-Solar-system.png"
          alt="Système solaire"
          style={{ width: "100%", height: "auto" }}
        />

        {imageSize.width > 0 &&
          astres.map((astre) => (
            <button
              key={astre.name}
              className={`zone ${selected.includes(astre.name) ? "selected" : ""}`}
              style={{
                position: "absolute",
                left: `${(astre.coords.left / 100) * imageSize.width}px`,
                top: `${(astre.coords.top / 100) * imageSize.height}px`,
                width: `${(astre.coords.width / 100) * imageSize.width}px`,
                height: `${(astre.coords.height / 100) * imageSize.height}px`,
                background: "none",
                border: selected.includes(astre.name) ? "4px solid rgba(120, 235, 255, 1)" : "2px solid rgba(120, 235, 255, 0.8)",
                borderRadius: "8px",
                cursor: "pointer",
                outline: "none",
              }}
              onClick={() => toggleSelection(astre.name)}
              aria-label={`Sélectionner ${astre.name}`}
            />
          ))}
      </div>

      {/* Liste des astres sélectionnés + Bouton reset */}
      <div style={{ width: "20%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", textAlign: "center" }}>
        <h3 style={{ marginBottom: "10px" }}>Sélection</h3>
        {selected.length > 0 ? (
          <ol style={{ padding: "0", listStylePosition: "inside" }}>
            {selected.map((name) => (
              <li key={name} style={{ marginBottom: "5px", fontWeight: "bold" }}>
                {name}
              </li>
            ))}
          </ol>
        ) : (
          <p style={{ fontStyle: "italic", color: "#888" }}>Aucun astre sélectionné</p>
        )}

        {/* Bouton reset */}
        <button
          onClick={resetSelection}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#ff6f61",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}