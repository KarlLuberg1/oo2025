import { useEffect, useRef, useState } from "react";
import { Athlete } from "../models/Athlete";
import { ToastContainer, toast } from 'react-toastify';

function ManageAthletes() {

 
  const [athletes, setAthletes] = useState<Athlete[]>([]);

useEffect(() => {
  fetch("http://localhost:8080/athletes")
    .then(res => res.json())
    .then(json => setAthletes(json));
}, []);


  const deleteAthlete = (id: number) => {
    fetch(`http://localhost:8080/athletes/${id}`, {
      method: "DELETE",
    }).then(() =>
      setAthletes(athletes.filter(a => a.id !== id))
    );
  };
  

  // document.getElementById("name").value
  // nameRef.current?.value

  const nameRef = useRef<HTMLInputElement>(null);
const ageRef = useRef<HTMLInputElement>(null);
const countryRef = useRef<HTMLInputElement>(null);


  const addAthlete = () => {
    const newAthlete = {
      name: nameRef.current?.value,
      age: Number(ageRef.current?.value),
      country: countryRef.current?.value,
    };
  
    fetch("http://localhost:8080/athletes", {
      method: "POST",
      body: JSON.stringify(newAthlete),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (!json.message && !json.status) {
          setAthletes(prev => [...prev, json]);
          toast.success("sportlane lisatud!");
        } else {
          toast.error(json.message || "sportlast ei õnnestunud lisada");
        }
      })
  }
 
  return (
    
    <div className="container page-content">
      <h2>Manage Athletes</h2>
  
      <label>Name</label><br />
      <input ref={nameRef} type="text" /><br />
  
      <label>Age</label><br />
      <input ref={ageRef} type="number" /><br />
  
      <label>Country</label><br />
      <input ref={countryRef} type="text" /><br />
  
      <button onClick={addAthlete}>Add Athlete</button>
  
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Country</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {athletes.map((athlete) => (
            <tr key={athlete.id}>
              <td>{athlete.id}</td>
              <td>{athlete.name}</td>
              <td>{athlete.age}</td>
              <td>{athlete.country}</td>
              <td>
                <button onClick={() => deleteAthlete(athlete.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <ToastContainer />
    </div>
  );
  
}
 
export default ManageAthletes;