import { useEffect, useRef, useState } from "react";
import type { Admin } from "../models/Admin";

function AddWordPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const typeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const adminRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/admins")
      .then(res => res.json())
      .then(data => setAdmins(data))
      .catch(err => console.error("Admin load error:", err));
  }, []);

  const addWord = () => {
    const newWord = {
      type: typeRef.current?.value,
      description: descriptionRef.current?.value,
      admin: {
        id: Number(adminRef.current?.value)
      }
    };

    fetch("http://localhost:8080/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWord)
    })
      .then(() => alert("Sõna lisatud"))
      .catch(err => console.error("Word POST error:", err));
  };

  return (
    <div className="container">
      <h2>Lisa uus sõna</h2>
      <label>Sõna tüüp</label><br />
      <input ref={typeRef} type="text" /><br />
      <label>Kirjeldus</label><br />
      <input ref={descriptionRef} type="text" /><br />
      <label>Haldaja</label><br />
      <select ref={adminRef}>
        {admins.map(admin => (
          <option key={admin.id} value={admin.id}>{admin.name}</option>
        ))}
      </select><br />
      <button onClick={addWord}>Lisa</button>
    </div>
  );
}

export default AddWordPage;
