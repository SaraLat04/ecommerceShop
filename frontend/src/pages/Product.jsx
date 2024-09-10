import { useContext } from "react";
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import ProductDescription from '../components/ProductDescription'
import ProductMD from '../components/ProductMD'
import ProductHD from '../components/ProductHD'
import Footer from "../components/Footer";

const Product = () => {

  const { all_products } = useContext(ShopContext)
  const {productId} = useParams()
  console.log("productId: ", productId)

  const product = all_products.find((e)=>e._id===productId);
  if(!product){
    return <div className="h1 pt-28">Product not Found</div>
    // or redirect the user to a 404 page
  }


  return (
    <>
    <section className="max-padd-container py-20">
      <div>
        <ProductHD product={product}/>
        <ProductMD product={product}/>
        <ProductDescription />
      </div>
    </section>
    <Footer />
    </>
  );
}

export default Product;
