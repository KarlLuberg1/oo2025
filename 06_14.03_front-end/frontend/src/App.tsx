import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Category } from './models/Category'
import { Product } from './models/Products'

function App() {
  const [count, setCount] = useState(0)
  const sonad = ["Elas", "metsas", "mutionu"];
  const autod = [
    {"mark": "Audi", "mudel": "A4", "year": "2020"},
    {"mark": "Audi", "mudel": "A5", "year": "2020"},
    {"mark": "Audi", "mudel": "A7", "year": "2020"},
    {"mark": "Audi", "mudel": "q7", "year": "2020"}

  ];

  const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  // uef -> onload

  useEffect(() => {
    fetch("http://localhost:8080/categories")// api otspunkt kuhu päring läheb
            .then(res=>res.json())//kogu tagastus: headers, status code
            .then(json=> setKategooriad(json))//body: sisu mida tagastab meile backend
    
  }, []);
    
  
  return (
    <>
    <div>{7 + 7}</div>
    <div>7 + 7</div>
    <div>{count}</div>
    {sonad.map(sona => 
    <div key={sona}>
      {sona}
    </div> )}
    
    {autod.map(auto => <div key={auto.mark+auto.mudel}>
      {auto.mark} - {auto.mudel}  ({auto.year})
    </div> )}

    {kategooriad.map(kategooria => 
    <div key={kategooria.id}>
      {kategooria.name} {kategooria.active}
    </div> )}

    {products.map(product => 
    <div key={product.id}>
      <div>{product.id}</div>
      <div>{product.name}</div>
      <div>{product.image}</div>
      <div>{product.category?.name}</div>
    </div> )}

    </>   
  )
}

// key={}
// react soovib mällu jätta kui toimuvad re renderdused, siis ta jätab kõik mällu
//vä tsukli sisud, sest pole mingit aimu mille järgi seda meelde jätta
//selle jaoks et ta saaks array meelde jätta lisame key={}

export default App
