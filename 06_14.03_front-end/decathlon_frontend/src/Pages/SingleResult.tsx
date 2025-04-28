import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Result } from "../models/Result";

function SingleResult() {
  const { resultId } = useParams<{ resultId: string }>();
  const [result, setResult] = useState<Result>();

  useEffect(() => {
    fetch("http://localhost:8080/results/" + resultId)
      .then(res => res.json())
      .then(json => setResult(json));
  }, [resultId]);

  if (result === undefined) {
    return <div>Tulemust ei leitud</div>;
  }

  return (
    <div className="container page-content">
      <h2>Tulemus</h2>

      <table className="table table-striped table-bordered">
        <tbody>
          <tr>
            <th>Ala</th>
            <td>{result.event}</td>
          </tr>
          <tr>
            <th>Tulemus</th>
            <td>{result.score}</td>
          </tr>
          <tr>
            <th>Punktid</th>
            <td>{result.points}</td>
          </tr>
          <tr>
            <th>Sportlane</th>
            <td>{result.athlete?.name ?? "Seotud sportlane puudub"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SingleResult;
