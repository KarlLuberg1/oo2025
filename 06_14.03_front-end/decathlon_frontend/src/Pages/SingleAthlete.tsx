import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Athlete } from "../models/Athlete";


function SingleAthlete() {
    const { athleteId } = useParams<{ athleteId: string }>();
    const [athlete, setAthlete] = useState<Athlete>();

    useEffect(() => {
        fetch("http://localhost:8080/athletes/" + athleteId)
            .then(res => res.json())
            .then(json => setAthlete(json))
    }, [athleteId]);

  return (
    <div className="container page-content">
    <h2>Sportlase andmed</h2>

    <table className="table table-striped table-bordered">
      <tbody>
        <tr>
          <th>Nimi</th>
          <td>{athlete?.name}</td>
        </tr>
        <tr>
          <th>Riik</th>
          <td>{athlete?.country}</td>
        </tr>
        <tr>
          <th>Vanus</th>
          <td>{athlete?.age}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}


export default SingleAthlete