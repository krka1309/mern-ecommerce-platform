import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPayPalClientIDQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Loader from "../../components/Loader";
import Messages from "../../components/Messages";
import { toast } from "react-toastify";

const Order = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: payOrderPending }] =
    usePayOrderMutation(orderId);
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIDQuery();
  console.log("order", order);
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadingPayPalScript = async () => {
        payPalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypal.clientId,
            currency: "USD",
          },
        }),
          payPalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, payPalDispatch]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onError = (error) => {
    toast.error(error.message);
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("order is paid");
      } catch (err) {
        toast.error(err?.data?.message || err?.message);
      }
    });
  };
  const markDeliverOrder = async () => {
    await deliverOrder(orderId);
    refetch();
  };
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messages variant="danger">{error.data?.message}</Messages>
  ) : (
    <div className="container flex flex-col ml-[10rem] md:flex-row">
      <div className="md:w-2/3 pr-4">
        <div className="border gray-300 mt-5 pb-4 mb-5">
          {order.orderItems.length === 0 ? (
            <Messages>Order is empty</Messages>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b-2">
                  <tr>
                    <td className="p-2">Image</td>
                    <td className="p-2">Product</td>
                    <td className="p-2">Quantity</td>
                    <td className="p-2">Unit Price</td>
                    <td className="p-2">Total</td>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, index) => {
                    return (
                      <tr key={index} className="p-2">
                        <td className="w-16 h-16 object-fit">
                          <img src={item.image} alt={item.name} />
                        </td>
                        <td className="p-2">
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </td>
                        <td className="p-2">{item.qty}</td>
                        <td className="p-2">{item.price}</td>
                        <td className="p-2">
                          ${(item.qty * item.price).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="md:w-1/3">
        <div className="mt-5 border-gray-300pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-4 mt-4">Order: {order._id}</p>
          <p className="mb-4">
            <strong className="text-pink-500">Name:</strong>{" "}
            {order.user.userName}
          </p>
          <p className="mb-4">
            <strong className="text-pink-500">Email:</strong> {order.user.email}
          </p>
          <p className="mb-4">
            <strong className="text-pink-500">Address:</strong>
            {order.shippingAddress.address}, {order.shippingAddress.city},
            {order.shippingAddress.postalCode} {order.shippingAddress.country}
          </p>
          <p className="mb-4">
            <strong>Method:</strong> {order.paymentMethod}
          </p>
          {order.isPaid ? (
            <Messages variant="success">Paid On: {order.paidAt}</Messages>
          ) : (
            <Messages variant="error">Not Paid</Messages>
          )}
        </div>
        <div>
          <div className="flex justify-between">
            <span className="text-xl">Items:</span>
            <span>${order.itemsPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xl">Shipping Price:</span>
            <span>${order.shippingPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xl">Tax Price:</span>
            <span>${order.taxPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xl">Total Price:</span>
            <span>${order.totalPrice}</span>
          </div>
        </div>
        {!order.isPaid && (
          <div>
            {payOrderPending ? (
              <Loader />
            ) : (
              <div>
                <div>
                  <PayPalButtons
                    onApprove={onApprove}
                    createOrder={createOrder}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              </div>
            )}
          </div>
        )}
        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div>
            <button
              type="button"
              className="bg-pink-500 cursor-pointer text-white text-xl px-4 py-2 rounded-lg w-full"
              onClick={markDeliverOrder}
            >
              Mark As Delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
