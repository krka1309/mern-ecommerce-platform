import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  useGetTotalOrdersQuery,
  useGetTotalSaleByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useGetUsersQuery } from "../../redux/api/userApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import OrderList from "./OrderList";
const AdminDashboard = () => {
  const { data: salesData, isLoading, isError } = useGetTotalSalesQuery();
  const { data: customers, loading1, error } = useGetUsersQuery();
  const { data: totalOrders, loading2, error2 } = useGetTotalOrdersQuery();
  const { data: salesByDate } = useGetTotalSaleByDateQuery();

  console.log("totalOrders", totalOrders);
  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xasis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesByDate) {
      const formattedSalesByDate = salesByDate.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));
      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesByDate.map((item) => item.x),
          },
        },
        series: [
          { name: "Sales", data: formattedSalesByDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesByDate]);
  return (
    <>
      <AdminMenu />
      <section className="xl:ml-[4rem] md:ml-[0rem]">
        <div className="w-[80%] flex justify-around flex-wrap">
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>
            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : salesData.totalSale.toFixed(2)}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>
            <p className="mt-5">Customers</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : customers?.length}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>
            <p className="mt-5">All Orders</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : totalOrders?.numOrders}
            </h1>
          </div>
        </div>
        <div className="ml-[10rem] mt-[4rem]">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="70%"
          />
        </div>
        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
