import React, { useEffect, useState } from "react";
import {
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";
const CategoryList = () => {
  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [selectedcategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { data: categories, isLoading, refetch } = useGetCategoryQuery();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error("Please try again");
      }
      setName("");
      toast.success(`${result.name} created successfully`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDelete = async () => {
    try {
      const toDelete = await deleteCategory(selectedcategory._id).unwrap();
      if (toDelete) {
        toast.success("Category deleted");
        setModalVisible(false);
        refetch();
      } else {
        toast.error("Please try again!");
      }
    } catch (error) {
      console.error("Getting error while deleting", error);
    }
  };
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const result = await updateCategory({
        categoryId: selectedcategory._id,
        updateCategory: {
          name: updateName,
        },
      }).unwrap();
      if (result.error) {
        toast.error(result.rror);
      } else {
        toast.success("Category updated succsffully");
        setUpdateName("");
        setSelectedCategory(null);
        setModalVisible(false);
        refetch();
      }
      console.log(categories, "after update");
    } catch (error) {
      console.error("Getting error while updating", error);
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />
        <div className="flex justify-around p-4 flex-wrap">
          {categories?.map((item) => {
            return (
              <div key={item._id}>
                <button
                  className="bg-white text-pink-500 hover:bg-pink-500 hover:text-white px-4 py-2 rounded-lg m-3 focus:outline-none focus:ring-2focus:ring-pink-500 focus:ring-opacty-50"
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedCategory(item);
                    setUpdateName(item.name);
                  }}
                >
                  {item.name}
                </button>
              </div>
            );
          })}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            handleSubmit={handleUpdateCategory}
            value={updateName}
            setValue={setUpdateName}
            buttonText="Update"
            handleDelete={handleDelete}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
