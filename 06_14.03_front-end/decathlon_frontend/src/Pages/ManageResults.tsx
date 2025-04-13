import { useEffect, useRef, useState } from "react";
import { Result } from "../models/Result";
import { Athlete } from "../models/Athlete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManageResults() {
  const [results, setResults] = useState<Result[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  const eventRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef<HTMLInputElement>(null);
  const pointsRef = useRef<HTMLInputElement>(null);
  const athleteRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/results")
      .then(res => res.json())
      .then(json => setResults(json));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then(res => res.json())
      .then(json => setAthletes(json));
  }, []);

  const addResult = () => {
    const newResult = {
      event: eventRef.current?.value,
      score: Number(scoreRef.current?.value),
      points: Number(pointsRef.current?.value)
    };

    const athleteId = athleteRef.current?.value;

    fetch(`http://localhost:8080/results?athleteId=${athleteId}`, {
      method: "POST",
      body: JSON.stringify(newResult),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (!json.message && !json.status) {
          setResults(prev => [...prev, json]);
          toast.success("Tulemus lisatud!");
        } else {
          toast.error(json.message || "Tulemust ei õnnestunud lisada");
        }
      });
  };

  const deleteResult = (id: number) => {
    fetch(`http://localhost:8080/results/${id}`, {
      method: "DELETE",
    }).then(() => setResults(results.filter(r => r.id !== id)));
  };

  return (
    <div className="container page-content">
      <h2>Manage Results</h2>

      <label>Event</label><br />
      <input ref={eventRef} type="text" /><br />

      <label>Score</label><br />
      <input ref={scoreRef} type="number" /><br />

      <label>Points</label><br />
      <input ref={pointsRef} type="number" /><br />

      <label>Athlete</label><br />
      <select ref={athleteRef}>
        {athletes.map(athlete => (
          <option key={athlete.id} value={athlete.id}>
            {athlete.name} ({athlete.country})
          </option>
        ))}
      </select><br /><br />

      <button onClick={addResult}>Add Result</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event</th>
            <th>Score</th>
            <th>Points</th>
            <th>Athlete</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.event}</td>
              <td>{result.score}</td>
              <td>{result.points}</td>
              <td>{result.athlete?.name ?? "—"}</td>
              <td>
                <button onClick={() => deleteResult(result.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
}

export default ManageResults;
