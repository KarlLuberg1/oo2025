import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function AddAdminPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const addAdmin = () => {
    const newAdmin = {
      name: nameRef.current?.value,
    };

    fetch("http://localhost:8080/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAdmin),
    })
      .then(() => navigate("/admins"))
      .catch(err => console.error("Admin POST error:", err));
  };

  return (
    <div className="container">
      <h2>Lisa uus haldaja</h2>
      <label>Nimi</label><br />
      <input ref={nameRef} type="text" /><br />
      <button onClick={addAdmin}>Lisa haldaja</button>
    </div>
  );
}

export default AddAdminPage;
