import { useEffect, useState } from "react";
import { Athlete } from "../models/Athlete";
import { Link } from "react-router-dom";

function AthletesPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [country, setCountry] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 3;

  useEffect(() => {
    let url = `http://localhost:8080/athletes/filter?page=${page}&size=${pageSize}`;
    if (country.trim() !== "") {
      url += `&country=${country}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setAthletes(data.content);
        setTotalPages(data.totalPages);
      });
  }, [country, page]);

  const handleNext = () => {
    if (page < totalPages - 1) setPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (page > 0) setPage(prev => prev - 1);
  };

  return (
    <div className="container page-content">
      <h2>Sportlased</h2>

      <div>
        <label>Filtreeri riigi järgi: </label>
        <input
          type="text"
          value={country}
          onChange={(e) => {
            setPage(0);
            setCountry(e.target.value);
          }}
          placeholder="Näiteks Eesti"
        />
      </div>
          
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
              <Link to={"/athletes/" + athlete.id}>
              <button>Vt lähemalt</button>
              </Link>
              
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={handlePrevious} disabled={page === 0}>
          Eelmine
        </button>
        <span> Leht {page + 1} / {totalPages} </span>
        <button onClick={handleNext} disabled={page >= totalPages - 1}>
          Järgmine
        </button>
      </div>
    </div>
  );
}

export default AthletesPage;
