import React from "react";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import Loader from "../../components/Loader";
import Messages from "../../components/Messages";
import { Link } from "react-router-dom";
const OrderList = () => {
  const { data: orders, isLoading, isError } = useGetOrdersQuery();
  console.log("orders", orders);
  return (
    <div className="container mx-auto">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Messages variant="danger">No Orders</Messages>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="mb-[5rem] ">
              <td className="font-bold text-left pl-1">ITEMS</td>
              <td className="font-bold text-left pl-1">ID</td>
              <td className="font-bold text-left pl-1">USER</td>
              <td className="font-bold text-left pl-1">DATA</td>
              <td className="font-bold text-left pl-1">TOTAL</td>
              <td className="font-bold text-left pl-1">PAID</td>
              <td className="font-bold text-left pl-1">DELIVERED</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.orderItems[0].image}
                    className="w-auto h-[6rem]"
                    alt={item.orderItems[0].name}
                  />
                </td>
                <td>{item._id}</td>
                <td>{item.user ? item.user.userName : "N/A"}</td>
                <td>{item.createdAt}</td>
                <td>{item.totalPrice}</td>
                <td className="px-2 py-2">
                  {item.isPaid ? (
                    <p className="bg-green-400 w-[6rem] p-2 text-center rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className=" bg-red-500 w-[6rem] p-2 text-center rounded-full">
                      Pending
                    </p>
                  )}
                </td>
                <td className="px-2 py-2">
                  {item.isDelivered ? (
                    <p className=" bg-green-400 w-[6rem] p-2 text-center rounded-full">
                      Delivered
                    </p>
                  ) : (
                    <p className="bg-red-500 w-[6rem] p-2 text-center rounded-full">
                      Pending
                    </p>
                  )}
                </td>
                <td>
                  <Link to={`/order/${item._id}`}>
                    <button className="px-4 py-2 bg-pink-500 rounded-full">
                      More
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

export default OrderList;
