import { useEffect, useState } from "react";
import type { Admin } from "../models/Admin";

function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/admins")
      .then(res => res.json())
      .then(json => setAdmins(json))
      .catch(err => console.error("Admin fetch error:", err));
  }, []);

  return (
    <div className="container">
      <h2>Haldajad</h2>
      {admins.map(admin => (
        <div key={admin.id} style={{ marginBottom: "1.5em" }}>
          <h4>{admin.name}</h4>
          {admin.words.length > 0 ? (
            <ul>
              {admin.words.map(word => (
                <li key={word.typeID}>
                  <strong>{word.type}</strong>: {word.description}
                </li>
              ))}
            </ul>
          ) : (
            <p><i>Ei ole seotud sõnu</i></p>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminsPage;
