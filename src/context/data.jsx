import { createContext, useContext, useEffect, useState } from "react";
import apiFetch from "../services/apiFetch";

const DataContext = createContext();

function DataProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loans, setLoans] = useState({pandero: [], regular: []});
  const [payDays, setPayDays] = useState([]);
  const [loanModal, setLoanModal] = useState({
    amount: "",
    months: "",
    payType: "",
    isOpen: false
  });
  const [backup, setBackup] = useState({
    loans: {},
    payDays: [],
    clients: {}
  });
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const loans = await apiFetch("loans");
        setLoans({pandero: loans.pandero.reverse(), regular: loans.regular.reverse()});
        const payDays = await apiFetch("paydays");
        setPayDays((payDays));
        setBackup({loans, payDays});
        setIsLoading(false);
      }catch(e) {
        console.error(e);

        setIsLoading(false);
      }
    }

    fetch();
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    localStorage.removeItem(yesterday.getDate());
    const confirm = localStorage.getItem(today.getDate());
    if(!confirm) {
      localStorage.setItem(today.getDate(), false);
    }
  }, []);

  useEffect(() => {
    const sendEmail = async () => {
      const today = new Date();

      try {
        const confirm = localStorage.getItem(today.getDate());
        if(confirm === "true" || notifications.length === 0) return;

        const { id } = await apiFetch("emails/send", { body: { notifications } });
 
        if(id) localStorage.setItem(today.getDate(), true);
      }catch(e) {
        console.error(e);

        localStorage.setItem(today.getDate(), false);
      }
    }

    sendEmail();
  }, [ notifications ])

  const searchLoan = (param) => {
    const newLoans = backup.loans.regular.filter(loan => {
      const name = `${loan.name} ${loan.last_name}`.toLowerCase();

      return name.includes(param.toLowerCase());
    });

    setLoans({...backup, regular: newLoans});
  }

  const updateLoan = (oldLoan, newLoan) => {
    const regularLoans = loans.regular;
    const index = regularLoans.indexOf(oldLoan);
    regularLoans[index] = newLoan;
    setLoans((loans) => ({...loans, regular: regularLoans}));
  }

  const updatePandero = (oldLoan, newLoan) => {
    const pandero = loans.pandero;
    const index = pandero.indexOf(oldLoan);
    pandero[index] = newLoan;
    setLoans((loans) => ({...loans, pandero}));
    setBackup((prev) => ({...prev, loans: {...prev.loans, pandero}}));
  }

  const deletePandero = async (id) => {
    await apiFetch(`loans/${id}`, { method: "DELETE" });
    const pandero = loans.pandero;
    const oldLoan = pandero.find((loan) => loan.id === id);
    const index = pandero.indexOf(oldLoan);
    pandero.splice(index, 1);
    setLoans((prev) => ({...prev, pandero: pandero}));
    setBackup((prev) => ({...prev, loans: {...prev.loans, pandero: pandero}}));
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
    setBackup((prev) => ({...prev, loans: {...prev.loans, regular: regularLoans}}));
  }

  const searchPandero = (param) => {
    const newPandero = backup.loans.pandero.filter(loan => loan.pandero_title.toLowerCase().includes(param.toLowerCase()));

    setLoans({...backup, pandero: newPandero});
  }

  const updatePayDay = async (oldPay, newPay) => {
    const index = payDays.indexOf(oldPay);
    payDays[index] = newPay;
    setPayDays(payDays);
    const loans = await apiFetch("loans");
    setLoans(loans);
    setBackup((prev) => ({...prev, loans}));
  }

  return (
    <DataContext.Provider
      value={{
        isLoading,
        loans,
        payDays,
        loanModal,
        error,
        backup,
        notifications,
        setNotifications,
        setError,
        setIsLoading,
        setLoanModal,
        setLoans,
        setPayDays,
        setBackup,
        searchLoan,
        updateLoan,
        deleteLoan,
        updatePayDay,
        searchPandero,
        updatePandero,
        deletePandero
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
