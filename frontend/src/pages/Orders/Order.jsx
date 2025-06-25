import React, { useEffect } from "react";
import { useParams } from "react-router";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPayPalClientIDQuery,
} from "../../redux/api/orderApiSlice";
import { useSelector } from "react-redux";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Loader from "../../components/Loader";
import Messages from "../../components/Messages";

const Order = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIDQuery();

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
                  <tbody>
                    <tr>
                      <td></td>
                    </tr>
                  </tbody>
                </thead>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
