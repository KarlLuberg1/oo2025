import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Word } from "../models/Word";

function EditWordPage() {
  const { wordId } = useParams<{ wordId: string }>();
  const [word, setWord] = useState<Word>();
  const typeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/words/" + wordId)
      .then(res => res.json())
      .then(json => {
        setWord(json);
        if (typeRef.current) typeRef.current.value = json.type;
        if (descriptionRef.current) descriptionRef.current.value = json.description;
      });
  }, [wordId]);

  const updateWord = () => {
    const modified = {
      typeID: Number(wordId),
      type: typeRef.current?.value,
      description: descriptionRef.current?.value
    };

    fetch("http://localhost:8080/words", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(modified)
    }).then(() => navigate("/"));
  };

  if (!word) return <div>Kirjet ei leitud</div>;

  return (
    <div className="container">
      <h2>Muuda kirjet</h2>
      <label>Tüüp</label><br />
      <input ref={typeRef} type="text" /><br />
      <label>Kirjeldus</label><br />
      <input ref={descriptionRef} type="text" /><br />
      <button onClick={updateWord}>Salvesta</button>
    </div>
  );
}

export default EditWordPage;
