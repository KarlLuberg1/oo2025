import { useEffect, useState } from 'react'
import { Category } from '../models/Category'
import { Product } from '../models/Products'



function MainPage() {

    const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  // uef -> onload

  useEffect(() => {
    fetch("http://localhost:8080/categories")// api otspunkt kuhu päring läheb
            .then(res=>res.json())//kogu tagastus: headers, status code
            .then(json=> setKategooriad(json))//body: sisu mida tagastab meile backend
    
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/products")
            .then(res=>res.json())
            .then(json=> setProducts(json))
    
  }, []);

  return (
    <div>
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
    </div>
  )
}

export default MainPage