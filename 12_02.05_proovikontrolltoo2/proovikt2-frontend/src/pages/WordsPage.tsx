import { useEffect, useState } from "react";
import type { Word } from "../models/Word";
import { Link } from "react-router-dom";

function WordsPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch(`http://localhost:8080/words?page=${page}&size=5&sort=${sort}`)
      .then(res => res.json())
      .then(json => {
        setWords(json.content);
        setTotalPages(json.totalPages);
      });
  }, [page, sort]);

  return (
    <div className="container">
      <h2>Sõnad</h2>

      <div style={{ marginBottom: "1em" }}>
        <button onClick={() => setSort("asc")} disabled={sort === "asc"}>
          Sorteeri A–Z
        </button>{" "}
        <button onClick={() => setSort("desc")} disabled={sort === "desc"}>
          Sorteeri Z–A
        </button>
      </div>

      <ul>
        {words.map(word => (
          <li key={word.typeID}>
            <Link to={`/words/${word.typeID}`}>{word.type}</Link>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "1em" }}>
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Eelmine
        </button>{" "}
        <span>Leht {page + 1} / {totalPages}</span>{" "}
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
        >
          Järgmine
        </button>
      </div>
    </div>
  );
}

export default WordsPage;
