import { useEffect, useState } from "react";
import "./App.css";
import { Athlete } from "./models/Athlete";
import { Result } from "./models/Result";

function App() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then(res => res.json())
      .then(json => setAthletes(json));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/results")
      .then(res => res.json())
      .then(json => setResults(json));
  }, []);

  return (
    <>
    <div>----Sportlased----</div>
    <br />
    {athletes.map(athlete => 
      <div key={athlete.id}>
        <div>{athlete.name}, {athlete.country}, {athlete.age} aastane</div>
      </div> )}
      <br />
      <div>----Tulemused----</div>
      <br />
      {results.map(result => 
      <div key={result.id}>
        <div>{result?.athlete?.name ?? "Puudub"}, {result?.event}, {result?.score}, {result?.points} punkti</div>
      </div> )}
    </>
    
  );
}

export default App;
