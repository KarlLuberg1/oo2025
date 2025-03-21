
function Arrayd() {

    //const [count, setCount] = useState(0)
  const sonad = ["Elas", "metsas", "mutionu"];
  const autod = [
    {"mark": "Audi", "mudel": "A4", "year": "2020"},
    {"mark": "Audi", "mudel": "A5", "year": "2020"},
    {"mark": "Audi", "mudel": "A7", "year": "2020"},
    {"mark": "Audi", "mudel": "q7", "year": "2020"}

  ];
  return (
    <div>
        <div>{7 + 7}</div>
    <div>7 + 7</div>
  
    {sonad.map(sona => 
    <div key={sona}>
      {sona}
    </div> )}
    
    {autod.map(auto => <div key={auto.mark+auto.mudel}>
      {auto.mark} - {auto.mudel}  ({auto.year})
    </div> )}

    </div>
  )
}

export default Arrayd