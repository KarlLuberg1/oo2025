import { useRef } from "react";

function AddWordPage() {
  const typeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const addWord = () => {
    const newWord = {
      type: typeRef.current?.value,
      description: descriptionRef.current?.value,
    };

    fetch("http://localhost:8080/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWord),
    });
  };

  return (
    <div className="container">
      <h2>Lisa uus kirjeldus</h2>
      <label>Tüüp</label><br />
      <input ref={typeRef} type="text" /><br />
      <label>Kirjeldus</label><br />
      <input ref={descriptionRef} type="text" /><br />
      <button onClick={addWord}>Lisa</button>
    </div>
  );
}

export default AddWordPage;
