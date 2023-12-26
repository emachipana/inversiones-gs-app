import { useAuth } from "../../context/auth";
import Auth from "./Auth";
import Unauth from "./Unauth";

function NotFound() {
  const { user } = useAuth();

  return (
    user ? <Auth /> : <Unauth /> 
  )
}

export default NotFound;
