import "./home.scss";
import { TopProductsBarChart } from "../../widgets/barChart";
import Featured from "../../widgets/featured/ui";
import { OverdueInvoicesTable } from "../../widgets/table";
import {
  CustomersCard,
  InvoicesCard,
  OrdersCard,
  ProductsCard,
  SalesCard,
} from "../../widgets/card";
import { SalesByCategoryChart } from "../../widgets/areaChart";

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <ProductsCard />
          <OrdersCard />
          <CustomersCard />
          <SalesCard />
          <InvoicesCard />
        </div>
        <div className="charts">
          <Featured />
          <SalesByCategoryChart />
        </div>
        <div className="listContainer">
          <TopProductsBarChart />
          <OverdueInvoicesTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
