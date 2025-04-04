import { useEffect, useState } from 'react'
import { Category } from '../models/Category'
import { Product } from '../models/Products'



function MainPage() {

    const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsByPage = 2;
  const [page, setPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState(-1);
  // uef -> onload

  useEffect(() => {
    fetch("http://localhost:8080/categories")// api otspunkt kuhu päring läheb
            .then(res=>res.json())//kogu tagastus: headers, status code
            .then(json=> setKategooriad(json))//body: sisu mida tagastab meile backend
    
  }, []);

  useEffect(() => {
    showByCategory(-1);
    
  }, []);

  function showByCategory(categoryId: number, currentPage: number = 0) {
    setActiveCategory(categoryId);
    setPage(currentPage);
    fetch("http://localhost:8080/category-products?categoryId=" + categoryId + 
      "&size=" + productsByPage + 
      "&size=" + currentPage)// api otspunkt kuhu päring läheb
      .then(res=>res.json())//kogu tagastus: headers, status code
      .then(json=> {
        setProducts(json.content);
        setTotalProducts(json.totalElements);
      })

  }

  function updatePage(newPage: number) {
    
    showByCategory(activeCategory, newPage);
  }

  return (
    <div>
      <button onClick={() => showByCategory(-1)}>Kõik kategooriad</button>
    {kategooriad.map(kategooria => 
    <button key={kategooria.id} onClick={() => showByCategory(kategooria.id, 0)}>
      {kategooria.name}
    </button> )}

    <div>KOKKU Tooteid {totalProducts} tk</div>

    {products.map(product => 
    <div key={product.id}>
      <div>{product.id}</div>
      <div>{product.name}</div>
      <div>{product.image}</div>
      <div>{product.category?.name}</div>
    </div> )}
    <button disabled={page === 0} onClick={() => updatePage(page - 1)}>Eelmine</button>
    <span>{page + 1}</span>
    <button disabled={page === Math.ceil(totalProducts/productsByPage-1)} onClick={() => updatePage(page + 1)}>Järgmine</button>
    </div>
  )
}

export default MainPage