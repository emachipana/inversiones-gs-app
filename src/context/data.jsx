import { createContext, useContext, useEffect, useState } from "react";
import apiFetch from "../services/apiFetch";

const DataContext = createContext();

function DataProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loans, setLoans] = useState([]);
  const [pays, setPays] = useState([]);
  const [clients, setClients] = useState({});
  const [backup, setBackup] = useState({
    loans: [],
    pays: [],
    clients: {}
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const loans = await apiFetch("loans");
        setLoans(loans);
        const pays = await apiFetch("paydays");
        setPays(pays);
        const clients = await apiFetch("users");
        setClients(clients);
        setBackup({loans, pays, clients});
        setIsLoading(false);
      }catch(e) {
        console.error(e);

        setIsLoading(false);
      }
    }

    fetch();
  }, []);

  const searchLoan = (param) => {
    const newLoans = backup.loans.regular.filter(loan => {
      const name = `${loan.name} ${loan.last_name}`.toLowerCase();

      return name.includes(param.toLowerCase());
    });

    setLoans({...backup, regular: newLoans});
  }

  return (
    <DataContext.Provider
      value={{
        isLoading,
        loans,
        pays,
        clients,
        setLoans,
        setPays,
        setClients,
        setBackup,
        searchLoan
      }}
    >
      { children }
    </DataContext.Provider>
  );
}

function useData() {
  return useContext(DataContext);
}

export { DataProvider, useData };
