import React from "react";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import Loader from "../../components/Loader";
import Messages from "../../components/Messages";
import { Link } from "react-router";

const UserOrders = () => {
  const { data: orders, isLoading, isError } = useGetMyOrdersQuery();
  console.log("orders", orders);
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Messages variant="danger">No Orders</Messages>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <td className="py-2">IMAGE</td>
              <td className="py-2">ID</td>
              <td className="py-2">DATE</td>
              <td className="py-2">TOTAL</td>
              <td className="py-2">PAID</td>
              <td className="py-2">DELIVERED</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr>
                <td>
                  <img
                    src={item.orderItems[0].image}
                    alt={item.orderItems[0].name}
                    className="w-[3rem] object-cover"
                  />
                </td>
                <td className="py-2">{item._id}</td>
                <td className="py-2">{item.createdAt}</td>
                <td className="py-2">{item.totalPrice}</td>
                <td>
                  {item.isPaid ? (
                    <p className="bg-green-400 px-4 py-2 mb-2 w-[6rem] text-center rounded-full text-white">
                      Completed
                    </p>
                  ) : (
                    <p className="bg-red-400 px-4 py-2 w-[6rem] rounded-full text-white">
                      Pending
                    </p>
                  )}
                </td>
                <td>
                  {item.isDelivered ? (
                    <p
                      className="
                  bg-green-400 px-4 py-2 rounded-full w-[6rem] text-center text-white"
                    >
                      Delivered
                    </p>
                  ) : (
                    <p className="bg-red-400 px-4 py-2 w-[6rem] rounded-full text-white">
                      Pending
                    </p>
                  )}
                </td>
                <td className="py-2">
                  <Link to={`/order/${item._id}`}>
                    <button className="bg-pink-400 text-white rounded-full px-4 py-2">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrders;
