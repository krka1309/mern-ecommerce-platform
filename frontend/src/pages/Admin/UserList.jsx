import React, { useEffect, useState } from "react";
import Messages from "../../components/Messages";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../redux/api/userApiSlice";
import Loader from "../../components/Loader";
// import e from "express";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const UserList = () => {
  const { data: users, refetch, error, isLoading } = useGetUsersQuery();
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableEmail, setEditableEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  console.log(users);
  useEffect(() => {
    refetch();
  }, [refetch]);

  const updateHandler = async (id) => {
    try {
      const updatedData = {
        userId: id,
        userName: editableUserName,
        email: editableEmail,
      };
      await updateUser(updatedData);
      setEditableUserId(null);
      refetch();
    } catch (error) {
      toast.error(error.data.message || error.message);
    }
  };
  const toggleEdit = (id, userName, email) => {
    setEditableUserId(id), setEditableEmail(email);
    setEditableUserName(userName);
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (error) {
        toast.error(error.data.message || error.message);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Messages variant="danger">
          {error?.data?.message || error?.message}
        </Messages>
      ) : (
        <div className="flex flex-col md:flex-row">
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td className="px-4 py-2">{user._id}</td>
                    <td className="px-4 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex item-center">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) =>
                              setEditableUserName(e.target.value)
                            }
                            className="w-full p-2 border rounded-lg"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {user.userName}{" "}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.userName, user.email)
                            }
                          >
                            <FaEdit className="ml-[1rem]" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex item-center">
                          <input
                            type="text"
                            value={editableEmail}
                            onChange={(e) => setEditableEmail(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {user.email}{" "}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.userName, user.email)
                            }
                          >
                            <FaEdit className="ml-[1rem]" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaCheck style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {!user.isAdmin && (
                        <div className="flex">
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-800 rounded text-white font-bold"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
