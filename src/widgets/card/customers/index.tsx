import Card from "../Card";
import Model from "./model";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LocalizedText from "../../../services/LocalizationService";

export function CustomersCard() {
  return (
    <Card
      title={LocalizedText.NewCustomers}
      path="/customers"
      isMoney={false}
      link={LocalizedText.SeeAllCustomers}
      model={Model}
      Icon={() => (
        <Person2OutlinedIcon
          className="icon"
          style={{
            color: "crimson",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
          }}
        />
      )}
    />
  );
}
