import "./sidebar.scss";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LocalizedText from "../../services/LocalizationService";
import { LogoutButton } from "../../features/auth";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Sections from "./item";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <AccountBalanceIcon className="icon" />
        <span className="logo">OMS</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Sections />
          <p className="title">{LocalizedText.User}</p>
          <li>
            <LogoutOutlinedIcon className="icon" />
            <LogoutButton />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
