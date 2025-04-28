import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Result } from "../models/Result";
import { Athlete } from "../models/Athlete";

function EditResult() {
  const { resultId } = useParams<{ resultId: string }>();
  const eventRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef<HTMLInputElement>(null);
  const pointsRef = useRef<HTMLInputElement>(null);
  const athleteRef = useRef<HTMLSelectElement>(null);
  const [result, setResult] = useState<Result>();
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const navigate = useNavigate();

  //chatgpt lahendus et tulemusega seotud sportlase default value õigesti töötaks
  useEffect(() => {
    if (resultId) {
      fetch("http://localhost:8080/results/" + resultId)
        .then(res => res.json())
        .then(json => {
          setResult(json);
          if (eventRef.current) {
            eventRef.current.value = json.event;
          }
          if (scoreRef.current) {
            scoreRef.current.value = json.score.toString();
          }
          if (pointsRef.current) {
            pointsRef.current.value = json.points.toString();
          }
          if (athleteRef.current) {
            athleteRef.current.value = json.athlete?.id?.toString() ?? "";
          }
        })
        .catch(() => toast.error("Tulemuse laadimisel tekkis viga"));
    }
  }, [resultId]);
  
  

  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then(res => res.json())
      .then(json => setAthletes(json))
      .catch(() => toast.error("Sportlaste laadimisel tekkis viga"));
  }, []);

  const editResult = () => {
    if (!eventRef.current || !scoreRef.current || !pointsRef.current || !athleteRef.current) {
      toast.error("Palun täida kõik väljad!");
      return;
    }

    const modifiedResult = {
      id: Number(resultId),
      event: eventRef.current.value,
      score: Number(scoreRef.current.value),
      points: Number(pointsRef.current.value),
      athlete: { id: Number(athleteRef.current.value) }
    };

    fetch("http://localhost:8080/results", {
      method: "PUT",
      body: JSON.stringify(modifiedResult),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.message && json.timestamp && json.status) {
          toast.error(json.message);
        } else {
          navigate("/results");
        }
      })
      .catch(() => toast.error("Tulemuse salvestamine ebaõnnestus"));
  };

  if (result === undefined) {
    return <div>Tulemust ei leitud</div>;
  }

  return (
    <div className="container page-content">
      <h2>Muuda Tulemusi</h2>

      <label>Ala</label><br />
      <input ref={eventRef} defaultValue={result.event} type="text" /><br />

      <label>Tulemus</label><br />
      <input ref={scoreRef} defaultValue={result.score} type="number" /><br />

      <label>Punktid</label><br />
      <input ref={pointsRef} defaultValue={result.points} type="number" /><br />

      <label>Spotlane</label><br />

      <select ref={athleteRef} defaultValue={result.athlete?.id?.toString()}>

        {athletes.map(athlete => (
          <option key={athlete.id} value={athlete.id}>
            {athlete.name} ({athlete.country})
          </option>
        ))}
      </select><br /><br />

      <button onClick={editResult}>Salvesta</button>

      <ToastContainer />
    </div>
  );
}

export default EditResult;
