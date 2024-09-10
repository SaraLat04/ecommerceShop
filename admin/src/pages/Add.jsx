import upload_area from "../assets/upload_area.svg";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [images, setImages] = useState([]); // Utiliser un tableau pour les images
  const [data, setData] = useState({
    name: "",
    description: "", // Correction du nom
    price: "",
    category: "Women",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
  
    // Ajout de toutes les images avec le même nom de champ "images"
    images.forEach((image) => {
      formData.append("images", image); // Utilisez "images" pour chaque fichier
    });
  
    try {
      const response = await axios.post(`${url}/api/product/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Women",
        });
        setImages([]); // Réinitialiser les images après le succès
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to upload product");
    }
  };
  

  const addImage = (e) => {
  const newImage = e.target.files[0];
  if (newImage) {
    setImages((prevImages) => [...prevImages, newImage]);
  }
  e.target.value = ""; // Réinitialiser l'input pour permettre de sélectionner à nouveau la même image
};

  return (
    <section className="p-4 sm:p-10 w-full bg-primary/20">
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-y-5 max-w-[555px]">
        <h4 className="bold-22 pb-2 uppercase">Products Upload</h4>
        <div className="flex flex-col gap-y-2 max-w-24 h-24">
          <p>Upload images</p>
          <label htmlFor="image">
            <img
              src={upload_area}
              alt="Upload Area"
              className="h-20 cursor-pointer"
            />
          </label>
          <input
            onChange={addImage}
            type="file"
            id="image"
            hidden
          />
        </div>

        {/* Afficher toutes les images ajoutées */}
        <div className="flex flex-wrap gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              className="h-20 w-20 object-cover"
            />
          ))}
        </div>

        <div className="flex flex-col gap-y-2">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            name="name"
            type="text"
            placeholder="Type here.."
            className="ring-1 ring-slate-900/10 py-1 px-3 outline-none"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows={"6"}
            placeholder="Write content here.."
            required
            className="ring-1 ring-slate-900/10 py-1 px-3 outline-none resize-none"
          ></textarea>
        </div>
        <div className="flex items-center gap-x-6 text-gray-900/70 medium-15">
          <div className="flex flex-col gap-y-2">
            <p>Product category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              className="outline-none ring-1 ring-slate-900/10 pl-2"
            >
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-2">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              name="price"
              type="number"
              placeholder="$20"
              className="ring-1 ring-slate-900/10 pl-2 w-24 outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn-dark sm:w-5/12 flexCenter gap-x-2 !py-2 rounded"
        >
          <FaPlus />
          Add Product
        </button>
      </form>
    </section>
  );
};

export default Add;



// import upload_area from "../assets/upload_area.svg";
// import { FaPlus } from "react-icons/fa6";
// import { useState } from "react";
// import axios from "axios"
// import { toast } from "react-toastify";


// const Add = ({url}) => {
//   const [image, setImage] = useState(false);
//   const [data, setData] = useState({
//     name: "",
//     desscription: "",
//     price: "",
//     category: "Women",
//   });
//   const onChangeHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   //useEffect(()=>{
//   //  console.log(data)
//   //},[data])

//   const onSubmitHandler = async (event)=>{
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("name", data.name)
//     formData.append("description", data.description)
//     formData.append("price", Number(data.price))
//     formData.append("category", data.category)
//     formData.append("image", image)
//     const response = await axios.post(${url}/api/product/add,
//     formData);
//     if(response.data.success){
//       setData({
//         name:"",
//         description:"",
//         price:"",
//         category:"Women",
//       })
//       setImage(false);
//       toast.success(response.data.message)
//     } else {
//       toast.error(response.data.message)
//     }
//   }


//   return (
//     <section className="p-4 sm:p-10 w-full bg-primary/20">
//       <form onSubmit={onSubmitHandler} className="flex flex-col gap-y-5 max-w-[555px]">
//         <h4 className="bold-22 pb-2 uppercase">Products Upload</h4>
//         <div className="flex flex-col gap-y-2 max-w-24 h-24">
//           <p>Upload image</p>
//           <label htmlFor="image">
//             <img
//               src={image ? URL.createObjectURL(image) : upload_area}
//               alt=""
//               className="h-20"
//             />
//           </label>
//           <input
//             onChange={(e) => setImage(e.target.files[0])}
//             type="file"
//             id="image"
//             hidden
//             required
//           />
//         </div>
//         <div className="flex flex-col gap-y-2">
//           <p>Product name</p>
//           <input
//             onChange={onChangeHandler}
//             value={data.name}
//             name="name"
//             type="text"
//             placeholder="Type here.."
//             className="ring-1 ring-slate-900/10 py-1 px-3 outline-none"
//           />
//         </div>
//         <div className="flex flex-col gap-y-2">
//           <p>Product description</p>
//           <textarea
//             onChange={onChangeHandler}
//             value={data.description}
//             name="description"
//             rows={"6"}
//             placeholder="Write content here.."
//             required
//             className="ring-1 ring-slate-900/10 py-1 px-3 outline-none resize-none"
//           ></textarea>
//         </div>
//         <div className="flex items-center gap-x-6 text-gray-900/70 medium-15">
//           <div className="flex flex-col gap-y-2">
//             <p>Product category</p>
//             <select
//               onChange={onChangeHandler}
//               value={data.category}
//               name="category"
//               className="outline-none ring-1 ring-slate-900/10 pl-2"
//             >
//               <option value="Women">Women</option>
//               <option value="Men">Men</option>
//               <option value="Kids">Kids</option>
//               <option value="Unisex">Unisex</option>
//             </select>
//           </div>
//           <div className="flex flex-col gap-y-2">
//             <p>Product price</p>
//             <input
//               onChange={onChangeHandler}
//               value={data.price}
//               name="price"
//               type="number"
//               placeholder="$20"
//               className="ring-1 ring-slate-900/10 pl-2 w-24 outline-none"
//             />
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="btn-dark sm:w-5/12 
//         flexCenter gap-x-2 !py-2 rounded"
//         >
//           <FaPlus />
//           Add Product
//         </button>
//       </form>
//     </section>
//   );
// };

// export default Add;