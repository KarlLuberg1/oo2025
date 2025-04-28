import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../models/Products";

function SingleProduct() {
    const {productId} = useParams<{ productId: string }>();

    const [product, setProduct] = useState<Product>(); // Define the type of product as needed

    useEffect(() => {
        fetch("http://localhost:8080/products/" + productId)
            .then(res => res.json())
            .then(json => setProduct(json))
    }, [productId]);
    
  return (
    <div>
        <div>Nimi; {product?.name}</div>
        <div>Hind; {product?.price}</div>
        <div>Kategooria; {product?.category?.name}</div>
        <img src={product?.image} alt=""/>
    </div>
  );
}

export default SingleProduct;