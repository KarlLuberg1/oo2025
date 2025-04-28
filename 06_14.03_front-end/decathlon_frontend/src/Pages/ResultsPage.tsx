import { useEffect, useState } from "react";
import { Result } from "../models/Result";
import { Link } from "react-router-dom";

function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/results")
      .then(res => res.json())
      .then(data => setResults(data));
  }, []);

  return (
    <div className="container page-content">
      <h2>Tulemused</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Võistleja</th>
            <th>Ala</th>
            <th>Tulemus</th>
            <th>Punktid</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.id}>
              <td>{result.athlete?.name ?? "-"}</td>
              <td>{result.event}</td>
              <td>{result.score}</td>
              <td>{result.points}</td>
              <Link to={"/results/" + result.id}>
              <button>Vt lähemalt</button>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsPage;
