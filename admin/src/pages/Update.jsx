import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import upload_area from "../assets/upload_area.svg"; // Assure-toi que ce chemin est correct
import { FaPlus } from "react-icons/fa6";

const Update = ({ url }) => {
  const { productId } = useParams();
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Women",
  });
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`${url}/api/product/${productId}`);
      if (response.data.success) {
        setData(response.data.product);
        setImages(response.data.product.images);
      } else {
        toast.error("Error fetching product");
      }
    };
    fetchProduct();
  }, [productId]);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addNewImage = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prevImages) => [...prevImages, ...files]);
    e.target.value = ""; // Réinitialiser l'input pour permettre de sélectionner à nouveau la même image
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
  
    // Ajoute toutes les nouvelles images
    newImages.forEach((image) => {
      formData.append("images", image);
    });
  
    try {
      const response = await axios.put(`${url}/api/product/update/${productId}`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/list"); // Redirige vers la liste après mise à jour
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product");
    }
  };

  return (
    <section className="p-4 sm:p-10 w-full bg-primary/20">
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-y-5 max-w-[555px]">
        <h4 className="bold-22 pb-2 uppercase">Update Product</h4>

        {/* Afficher les images existantes */}
        <div className="flex flex-wrap gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={`${url}/images/${image}`}
              alt={`Existing Preview ${index}`}
              className="h-20 w-20 object-cover"
            />
          ))}
        </div>

        {/* Ajouter des nouvelles images */}
        <div className="flex flex-col gap-y-2 max-w-24 h-24">
          <p>Upload new images</p>
          <label htmlFor="new-images">
            <img
              src={upload_area}
              alt="Upload Area"
              className="h-20 cursor-pointer"
            />
          </label>
          <input
            onChange={addNewImage}
            type="file"
            id="new-images"
            multiple
            hidden
          />
        </div>

        {/* Afficher toutes les nouvelles images ajoutées */}
        <div className="flex flex-wrap gap-4">
          {newImages.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`New Preview ${index}`}
              className="h-20 w-20 object-cover"
            />
          ))}
        </div>

        {/* Champs de formulaire */}
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
          Update Product
        </button>
      </form>
    </section>
  );
};

export default Update;
