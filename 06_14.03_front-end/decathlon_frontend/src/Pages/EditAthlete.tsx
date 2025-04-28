import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Athlete } from "../models/Athlete";
import { useNavigate, useParams } from "react-router-dom";

function EditAthlete() {
  const { athleteId } = useParams<{ athleteId: string }>();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const [athlete, setAthlete] = useState<Athlete>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/athletes/" + athleteId)
      .then(res => res.json())
      .then(json => setAthlete(json));
  }, [athleteId]);

  const editAthlete = () => {
    const modifiedAthlete = {
      id: Number(athleteId),
      name: nameRef.current?.value,
      age: Number(ageRef.current?.value),
      country: countryRef.current?.value,
    };

    fetch("http://localhost:8080/athletes", {
      method: "PUT",
      body: JSON.stringify(modifiedAthlete),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.message && json.timestamp && json.status) {
          toast.error(json.message);
        } else {
          navigate("/athletes");
        }
      });
  };

  if (athlete === undefined) {
    return <div>Sportlast ei leitud</div>;
  }

  return (
    <div className="container page-content">
      <h2>Muuda sportlase andmeid</h2>

      <label>Nimi</label><br />
      <input ref={nameRef} defaultValue={athlete.name} type="text" /><br />

      <label>Vanus</label><br />
      <input ref={ageRef} defaultValue={athlete.age} type="number" /><br />

      <label>Riik</label><br />
      <input ref={countryRef} defaultValue={athlete.country} type="text" /><br />

      <button onClick={editAthlete}>Salvesta</button>

      <ToastContainer />
    </div>
  );
}

export default EditAthlete;
