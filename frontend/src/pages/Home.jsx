import Hero from "../components/Hero";
import Categories from "../components/Categories";
import { useState } from "react";
import ProductDisplay from "../components/ProductDisplay";
import GetApp from "../components/GetApp";
import Footer from "../components/Footer";

const Home = () => {
  const [category, setCategory] = useState('All')
  return (
    <>
      <Hero />
      <Categories category={category} setCategory={setCategory}/>
      <ProductDisplay category={category}/>
      <GetApp />
      <Footer />
    </>
  );
}

export default Home;