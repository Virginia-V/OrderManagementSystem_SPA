import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import EditModeContext from "../../context/editModeContext";
import LocalizedText from "../../services/LocalizationService";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import { LeavePage } from "../../dialogs/confirmation";

interface ItemProps {
  title: string;
  icon: () => JSX.Element;
  path: string;
}

interface SectionProps {
  title: string;
  items: JSX.Element[];
}

function Sections() {
  return (
    <>
      <Main /> <Lists /> <Useful />
    </>
  );
}

function Main() {
  return <Section title={LocalizedText.Main} items={[<Dashboard key={1} />]} />;
}

function Lists() {
  return (
    <Section
      title={LocalizedText.Lists}
      items={[
        <Customers key={1} />,
        <Products key={2} />,
        <Orders key={3} />,
        <Invoices key={4} />,
      ]}
    />
  );
}

function Useful() {
  return (
    <Section title={LocalizedText.Useful} items={[<AgingReport key={1} />]} />
  );
}

function Section({ title, items }: SectionProps) {
  return (
    <>
      <p className="title">{title}</p>
      {items.map((V, i) => V)}
    </>
  );
}

function Dashboard() {
  return (
    <Item
      title={LocalizedText.Dashboard}
      icon={() => <DashboardIcon className="icon" />}
      path="/home"
    />
  );
}

function Customers() {
  return (
    <Item
      title={LocalizedText.Customers}
      icon={() => <Person2OutlinedIcon className="icon" />}
      path="/customers"
    />
  );
}

function Products() {
  return (
    <Item
      title={LocalizedText.Products}
      icon={() => <Inventory2OutlinedIcon className="icon" />}
      path="/products"
    />
  );
}

function Orders() {
  return (
    <Item
      title={LocalizedText.Orders}
      icon={() => <ListAltOutlinedIcon className="icon" />}
      path="/orders"
    />
  );
}

function Invoices() {
  return (
    <Item
      title={LocalizedText.Invoices}
      icon={() => <LocalAtmOutlinedIcon className="icon" />}
      path="/invoices"
    />
  );
}

function AgingReport() {
  return (
    <Item
      title={LocalizedText.AgingReport}
      icon={() => <AssessmentOutlinedIcon className="icon" />}
      path="/agingReport"
    />
  );
}

function Item({ title, icon, path }: ItemProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const editMode = useContext(EditModeContext);

  const confirmation = async (e: any) => {
    if (!editMode.isEditMode) return anchorRef.current?.click();

    LeavePage(() => {
      editMode.updateState(false);    
      anchorRef.current?.click();
    });
  };

  return (
    <li>
      {icon()}
      <span onClick={confirmation}>{title}</span>
      <Link
        ref={anchorRef}
        hidden
        to={path}
        style={{ textDecoration: "none" }}
      />
    </li>
  );
}

export default Sections;
