import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import Loader from "./components/Loader";
import { useAuth } from "./context/auth"

function App() {
  const { user, isLoading } = useAuth();

  return (
    isLoading
    ? <Loader />
    : (user ? <AuthenticatedApp /> : <UnauthenticatedApp />)
    
  )
}

export default App
