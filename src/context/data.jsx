import { createContext, useContext, useEffect, useState } from "react";
import apiFetch from "../services/apiFetch";

const DataContext = createContext();

function DataProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loans, setLoans] = useState([]);
  const [payDays, setPayDays] = useState([]);
  const [clients, setClients] = useState({});
  const [loanModal, setLoanModal] = useState({
    amount: "",
    months: "",
    payType: "",
    isOpen: false
  });
  const [backup, setBackup] = useState({
    loans: [],
    payDays: [],
    clients: {}
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const loans = await apiFetch("loans");
        setLoans(loans);
        const payDays = await apiFetch("paydays");
        setPayDays(payDays);
        const clients = await apiFetch("users");
        setClients(clients);
        setBackup({loans, payDays, clients});
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
        payDays,
        clients,
        loanModal,
        error,
        setError,
        setIsLoading,
        setLoanModal,
        setLoans,
        setPayDays,
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
