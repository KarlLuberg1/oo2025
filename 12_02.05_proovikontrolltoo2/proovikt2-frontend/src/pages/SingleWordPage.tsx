import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Word } from "../models/Word";

function SingleWordPage() {
  const { wordId } = useParams<{ wordId: string }>();
  const [word, setWord] = useState<Word>();

  useEffect(() => {
    fetch("http://localhost:8080/words/" + wordId)
      .then(res => res.json())
      .then(json => setWord(json));
  }, [wordId]);

  if (!word) return <div>Kirjet ei leitud</div>;

  return (
    <div className="container">
      <h2>{word.type}</h2>
      <p><strong>Kirjeldus:</strong> {word.description}</p>
      <Link to={`/edit-word/${word.typeID}`}>Muuda</Link>
    </div>
  );
}

export default SingleWordPage;
