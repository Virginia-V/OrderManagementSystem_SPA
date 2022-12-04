import { useAuth0 } from "@auth0/auth0-react";
import LocalizedText from "../../../services/LocalizationService";
import "../auth.scss";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="logout-button"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      {LocalizedText.Logout}
    </button>
  );
};
