import { useEffect, useState } from "preact/hooks";

interface Props {
  username: string | null;
}

export default function ProfileClient({ username }: Props) {
  const [bgColor, setBgColor] = useState("white");
  const colors = ["#f8f9fa", "#e0f7fa", "#e8f5e9", "#fff3e0", "#ede7f6"];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setBgColor(colors[i % colors.length]);
      i++;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: bgColor, minHeight: "100vh", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Perfil de Usuario</h1>
      {username ? (
        <p style={{ fontSize: "1.5rem" }}>
          Hola, <strong>{username}</strong>
        </p>
      ) : (
        <form method="POST" style={{ display: "flex", flexDirection: "column", maxWidth: "300px", gap: "0.5rem" }}>
          <label htmlFor="username">Ingresa tu nombre:</label>
          <input type="text" id="username" name="username" required />
          <button type="submit">Guardar</button>
        </form>
      )}
    </div>
  );
}
