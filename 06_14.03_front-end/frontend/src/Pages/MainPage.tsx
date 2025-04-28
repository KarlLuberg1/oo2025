import { useCallback, useEffect, useRef, useState } from 'react'
import { Category } from '../models/Category'
import { Product } from '../models/Products'
import { Link } from 'react-router-dom';



function MainPage() {

  const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [productsByPage, setProductsByPage] = useState(1);
  const [page, setPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState(-1);
  const productsByPageRef = useRef<HTMLSelectElement>(null);

  const [sort, setSort] = useState("id,asc");
  // uef -> onload

  useEffect(() => {
    fetch("http://localhost:8080/categories")// api otspunkt kuhu päring läheb
            .then(res=>res.json())//kogu tagastus: headers, status code
            .then(json=> setKategooriad(json))//body: sisu mida tagastab meile backend
    
  }, []);

  const showByCategory = useCallback((categoryId: number, currentPage: number) =>{
    setActiveCategory(categoryId);
    setPage(currentPage);
    fetch("http://localhost:8080/category-products?categoryId=" + categoryId + 
      "&size=" + productsByPage + 
      "&page=" + currentPage +
      "&sort=" + sort  
    )       // api otspunkt kuhu päring läheb
      .then(res=>res.json())//kogu tagastus: headers, status code
      .then(json=> {
        setProducts(json.content);
        setTotalProducts(json.totalElements);
        setTotalPages(json.totalPages);
      })

  }, [productsByPage, sort]);

  useEffect(() => {
    showByCategory(activeCategory, 0);
     
  }, [showByCategory, activeCategory]);

  function updatePage(newPage: number) {
    
    showByCategory(activeCategory, newPage);
  }


  return (
    <div>
      <button onClick={() => setSort("id,asc")}>Sorteeri vanemad enne</button>
      <button onClick={() => setSort("id,desc")}>Sorteeri uuemad enne</button>
      <button onClick={() => setSort("name,asc")}>Sorteeri A-Z</button>
      <button onClick={() => setSort("name,desc")}>Sorteeri Z-A</button>
      <button onClick={() => setSort("price,asc")}>Sorteeri odavamad enne</button>
      <button onClick={() => setSort("price,desc")}>Sorteeri kallimad enne</button>

      <select ref={productsByPageRef} onChange={() => setProductsByPage(Number(productsByPageRef.current?.value)) }>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
      <button onClick={() => showByCategory(-1, 0)}>Kõik kategooriad</button>
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
      <Link to={"/product/" + product.id}>
        <button>Vt lähemalt</button>
      </Link>
    </div> )}
    <button disabled={page === 0} onClick={() => updatePage(page - 1)}>Eelmine</button>
    <span>{page + 1}</span>
    <button disabled={page >= totalPages - 1} 
      onClick={() => updatePage(page + 1)}>Järgmine</button>
    </div>
  )
}

export default MainPage