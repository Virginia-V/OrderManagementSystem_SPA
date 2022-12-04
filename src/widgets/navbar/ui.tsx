import "./navbar.scss";
import { Localization } from "../../features/localization";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <Localization />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
