import React from "react";
import { useState } from "react";
import {
  useUploadProductImageMutation,
  useCreateProductMutation,
} from "../../redux/api/productApiSlice";
import { useNavigate } from "react-router";
import { useGetCategoryQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
// import myImaege from "/uploads/image-1749458363967.webp";
const ProductsList = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useGetCategoryQuery();

  const handleFileUploader = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      //   const normalizedPath = res.image.replace(/\\/g, "/");
      //   setImage(normalizedPath);
      //   setImageUrl(normalizedPath);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("image", image);
      productData.append("brand", brand);
      productData.append("quantity", quantity);
      productData.append("price", price);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);
      if (data.error) {
        toast.error(`Server error. Please try again`);
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error?.data?.message || error?.message);
      toast.error("Server error please try again");
    }
  };
  console.log("imageUrl", imageUrl);
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product image"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}
          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileUploader}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>
          <div className="p-3 ml-10">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="one ml-10">
                <label htmlFor="price">Price</label> <br />
                <input
                  type="Number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Quantity</label> <br />
                <input
                  type="Number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="one ml-10">
                <label htmlFor="price">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>
            <label className="my-3">Description</label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="flex justify-between">
              <div>
                <label htmlFor="name">Count in Stock</label> <br />
                <input
                  type="Number"
                  className="p-2 mb-3 w-[30rem] bg-[#101011] text-white border rounded-lg"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Category</label> <br />
                <select
                  name="category"
                  placeholder="Choose Category"
                  className="p-2 mb-3 w-[30rem] bg-[#101011] text-white border rounded-lg"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  {categories?.map((item) => {
                    return (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <button
              className="py-4 px-10 bg-pink-500 text-white font-bold text-lg pt-3 border rounded-lg hover:bg-pink-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* <img src="" alt="product" /> */}
    </div>
  );
};

export default ProductsList;
