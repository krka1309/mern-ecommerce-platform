import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";
import { useGetCategoryQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";

const UpdateProduct = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [stock, setStock] = useState(productData?.stock || "");
  const [image, setImage] = useState(productData?.image || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [imageUrl, setImageUrl] = useState(productData?.imageUrl || "");
  const navigate = useNavigate();
  console.log("productData", productData, params);
  const { data: categories } = useGetCategoryQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setImage(productData.image);
      setPrice(productData.price);
      setCategory(productData.category);
      setStock(productData.countInStock);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
    }
  }, [productData]);
  console.log(productData?.name);

  const handleFileUploader = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error("Server error while updating image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("qunatity", quantity);
    formData.append("category", category);
    formData.append("name", name);

    const { data } = await updateProduct({
      productId: params._id,
      formData,
    });
    console.log("data", data);
    try {
      toast.success("Product updated Successfully");
      navigate("/admin/allproductslist");
    } catch (error) {
      toast.error("Server error while updating product");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteProduct(params._id);
    try {
      toast.success("Product removed");
      navigate("/admin/allproductslist");
    } catch (error) {
      toast.error("Error! while removing");
    }
  };
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <AdminMenu />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
          <div className="h-12">Update Product</div>
          {image && (
            <div className="text-center">
              <img
                src={image}
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
            <div>
              <button
                className="py-4 px-10 bg-green-500 text-white font-bold text-lg pt-3 border rounded-lg hover:bg-green-700 mr-6"
                onClick={handleSubmit}
              >
                Update
              </button>
              <button
                className="py-4 px-10 bg-red-500 text-white font-bold text-lg pt-3 border rounded-lg hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <img src="" alt="product" /> */}
    </div>
  );
};

export default UpdateProduct;
