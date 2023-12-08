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

  const updateLoan = (oldLoan, newLoan) => {
    let regularLoans = loans.regular;
    const index = regularLoans.indexOf(oldLoan);
    regularLoans[index] = newLoan;
    setLoans((loans) => ({...loans, regular: regularLoans}));
  }

  const deleteLoan = async (id) => {
    const pays = payDays.filter((pay) => pay.loan[0] === id);
    await apiFetch(`loans/${id}`, { method: "DELETE" });
    pays.forEach(async (pay) => {
      await apiFetch(`paydays/${pay.id}`, { method: "DELETE" });
    });

    const newPays = payDays.filter((pay) => pay.loan[0] !== id);
    setPayDays(newPays);
    
    const regularLoans = loans.regular;
    const loan = regularLoans.find((loan) => loan.id === id);
    const index = regularLoans.indexOf(loan);
    regularLoans.splice(index, 1);
    setLoans((prev) => ({...prev, regular: regularLoans}));
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
        searchLoan,
        updateLoan,
        deleteLoan
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
