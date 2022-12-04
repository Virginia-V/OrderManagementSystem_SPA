import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
import orderService from "../../services/OrderService";
import apiRequest from "../../shared/apiRequest";
import Order from "../../entities/order";
import LocalizedText from "../../services/LocalizationService";

const Featured = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [todayOrders, setTodayOrders] = useState<Order[]>([]);

  const getTodayOrders = async () => {
    apiRequest.execute(
      () => orderService.getTodayOrders(),
      (result) => setTodayOrders(result)
    );
  };

  const getOrders = async () => {
    apiRequest.execute(
      () => orderService.get(),
      (result) => setOrders(result)
    );
  };

  useEffect(() => {
    getTodayOrders();
    getOrders();
  }, []);

  let todayOrderedAmount = todayOrders
    .map((o) => o.totalOrderedAmount)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    .toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  let shareInTotalOrders =
    (todayOrders
      .map((o) => o.totalOrderedAmount)
      .reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      ) /
      orders
        .map((o) => o.totalOrderedAmount)
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0
        )) *
    100;

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">{LocalizedText.TotalRevenue}</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={shareInTotalOrders}
            text={
              shareInTotalOrders.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              }) + "%"
            }
            strokeWidth={5}
          />
        </div>
        <p className="title">{LocalizedText.TotalSalesMadeToday}</p>
        <p className="amount">${todayOrderedAmount}</p>
        <p className="desc">{LocalizedText.PreviousTransactionsProcessing}</p>
      </div>
    </div>
  );
};

export default Featured;
