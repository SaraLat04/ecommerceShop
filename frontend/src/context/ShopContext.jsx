import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null)

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({})
  const url = "http://localhost:4000"
  const [token,setToken] = useState("")
  const [all_products, setAll_products] = useState([])

  const addToCart = async (itemId)=> {
    if(!cartItems[itemId]){
      setCartItems((prev)=>({...prev,[itemId]:1}))
    }else {
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  const removeFromCart = async (itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  }
  // get total cart amount
  const getTotalCartAmount = ()=>{
    let totalAmount = 0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        let itemInfo = all_products.find((product)=>product._id===item);
        totalAmount+=itemInfo.price* cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchProductList = async ()=>{
    const response = await axios.get(url+"/api/product/list")
    setAll_products(response.data.data)
  }

  const loadCartData = async (token)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData)
  }

  useEffect(() => {
    async function loadData() {
      await fetchProductList();
      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
        await loadCartData(token);
      }
    }
  
    loadData();
  }, []);
  
  // Utilisez une dépendance de token pour surveiller les changements de connexion
  useEffect(() => {
    async function loadData() {
      if (token) {
        await loadCartData(token);
      } else {
        setCartItems({});
      }
    }
  
    loadData();
  }, [token]);
  

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setCartItems({});
  };
  
  const contextvalue = {
    all_products, 
    cartItems, 
    setCartItems, 
    addToCart, 
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    logout // Ajoutez cette ligne
  };
  
  return (
    <ShopContext.Provider value={contextvalue}>
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;