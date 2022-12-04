import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routers } from "../constants";
import AgingReportPage from "./agingReport/AgingReportPage";
import CustomersPage from "./customers/CustomersPage";
import EditCustomerPage from "./customers/EditCustomerPage";
import Home from "./home/Home";
import InvoicesPage from "./invoices/InvoicesPage";
import { ToastContainer } from "react-toastify";
import OrdersPage from "./orders/OrdersPage";
import EditProductPage from "./products/EditProductPage";
import ProductsPage from "./products/ProductsPage";
import SideBar from "../widgets/sidebar/ui";
import NavBar from "../widgets/navbar/ui";
import httpMethods from "../services/http";
import MoonLoader from "react-spinners/MoonLoader";
import "./routing.scss";

export const Routing = () => {
  httpMethods.setToken();
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div className="loader-container">
        <MoonLoader color="#6439ff" />
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="app">
          <div className="app-container">
            <SideBar />
            <div className="container">
              <NavBar />
              <ProtectedRoutes />
            </div>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <>{loginWithRedirect()}</>
      )}
    </>
  );
};

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth0();
  return !isAuthenticated ? (
    <></>
  ) : (
    <Routes>
      <Route path="*" element={<Navigate to={routers.home} />} />
      <Route path={routers.home} element={<Home />} />
      <Route path={routers.customers} element={<CustomersPage />} />
      <Route path={routers.editCustomer} element={<EditCustomerPage />} />
      <Route path={routers.products} element={<ProductsPage />} />
      <Route path={routers.editProduct} element={<EditProductPage />} />
      <Route path={routers.orders} element={<OrdersPage />} />
      <Route path={routers.invoices} element={<InvoicesPage />} />
      <Route path={routers.agingReport} element={<AgingReportPage />} />
    </Routes>
  );
}
