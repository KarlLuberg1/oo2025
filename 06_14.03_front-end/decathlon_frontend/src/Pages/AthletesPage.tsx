import { useEffect, useState } from "react";
import { Athlete } from "../models/Athlete";

function AthletesPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then(res => res.json())
      .then(data => setAthletes(data));
  }, []);

  return (
    <div className="container">
      <h2>Sportlased</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Riik</th>
            <th>Vanus</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map(athlete => (
            <tr key={athlete.id}>
              <td>{athlete.name}</td>
              <td>{athlete.country}</td>
              <td>{athlete.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AthletesPage;
