import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import { useAuth } from "./context/auth"

function App() {
  const { user, isLoading } = useAuth();

  return (
    isLoading
    ? "Cargando..."
    : (user ? <AuthenticatedApp /> : <UnauthenticatedApp />)
    
  )
}

export default App
