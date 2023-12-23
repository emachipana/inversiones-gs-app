import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/data";
import { Title } from "../../styles";
import { useTheme } from "../../context/theme";
import capitalize from "../../helper/capitalize";
import Loader from "../../components/Loader";
import { Container, Form } from "../Profile/styles";
import { Formik } from "formik";
import validate from "./validate";
import InputLabel from "../../components/Input/Label";
import { Group } from "../Loans/styles";
import Select from "../../components/Input/Select";
import Button from "../../components/Button";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { Alert } from "reactstrap";
import apiFetch from "../../services/apiFetch";
import generateInstallments from "../../helper/installments";

function RefinancingDetail() {
  const { id } = useParams();
  const { 
    loans, 
    isLoading, 
    setIsLoading, 
    error, 
    setError, 
    deleteLoan,
    setLoans,
    setBackup,
    setPayDays } = useData();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const loan = loans.regular?.find((loan) => loan.id === id);
  if(loans.regular.length > 0 && !loan) return navigate("/refinanciamiento");

  const initialValues = {
    dni: loan?.dni,
    name: loan?.name,
    last_name: loan?.last_name,
    phone: loan?.phone,
    account: loan?.bank_account[0],
    cci: loan?.bank_account[1],
    amount: loan?.receive_amount,
    recovered: parseFloat(loan?.recovered.toFixed(1)),
    pending_amount: parseFloat((loan?.receive_amount - loan?.recovered).toFixed(1)),
    months: loan?.months,
    payType: loan?.pay_type
  }

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      // delete loan
      await deleteLoan(loan.id);
      // create newLoan
      const amount = parseInt(values.pending_amount);
      const { totalPay, toPay, pays, lastPay } = generateInstallments({...values, amount});

      const body = {
        ...values,
        amount,
        receive_amount: totalPay,
        bank_account: [ values.account, values.cci ],
        finish_date: lastPay,
        recovered: 0,
        pay_type: values.payType
      }

      const newLoan = await apiFetch("loans", { body });
      const regularLoans = loans.regular;
      regularLoans.push(newLoan);
      setLoans((prev) => ({...prev, regular: regularLoans}));
      setBackup((prev) => ({...prev, loans: {...prev.loans, regular: regularLoans}}));
      // create pay days
      const newPays = await Promise.all(pays.map(async (date) => {
        return await apiFetch("paydays", {
          body: {
            loanId: newLoan.id,
            dateToPay: date,
            amount: toPay
          }
        });
      }));

      setPayDays((prev) => prev.concat(newPays));
      setError(null);
      setIsLoading(false);
      navigate(`/prestamos/${newLoan.id}`);
    }catch(e) {
      console.error(e);
      setIsLoading(false);

      setError(e.message);
    }
  }

  return (
    isLoading
    ? <Loader />
    : <>
        <Title theme={theme}>{capitalize(`${loan.name} ${loan.last_name}`)}</Title>
        <Container>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form 
                theme={theme}
                width={520}
                onSubmit={handleSubmit}
              >
                <Group>
                  <InputLabel 
                    disabled
                    value={values.dni}
                    id="dni"
                    label="DNI"
                  />
                  <InputLabel 
                    disabled
                    value={capitalize(values.name)}
                    id="name"
                    label="Nombres"
                  />
                </Group>
                <Group>
                  <InputLabel 
                    disabled
                    value={capitalize(values.last_name)}
                    id="last_name"
                    label="Apellidos"
                  />
                  <InputLabel 
                    disabled
                    value={values.phone}
                    id="phone"
                    label="Teléfono"
                  />
                </Group>
                <Group>
                  <InputLabel 
                    disabled
                    value={values.account}
                    id="account"
                    label="Cuenta"
                  />
                  <InputLabel 
                    disabled
                    value={values.cci}
                    id="cci"
                    label="CCI"
                  />
                </Group>
                <Group>
                  <InputLabel 
                    disabled
                    value={values.amount}
                    id="amount"
                    label="Monto S/."
                  />
                  <InputLabel 
                    disabled
                    value={values.recovered}
                    id="recovered"
                    label="Recuperado S/."
                  />
                </Group>
                <Group>
                  <InputLabel 
                    value={values.pending_amount}
                    id="pending_amount"
                    label="Pendiente S/."
                    error={errors.pending_amount}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    placeholder="S/. 0"
                    touched={touched.pending_amount}
                  />
                  <InputLabel
                    value={values.months}
                    id="months"
                    label="Meses"
                    error={errors.months}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    placeholder="1"
                    touched={touched.months}
                  />
                </Group>
                <Select 
                  error={errors.payType}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  id="payType"
                  label="Tipo de pago"
                  touched={touched.payType}
                  value={values.payType}
                  options={["semanal", "diario"]}
                />
                {
                  error 
                  &&
                  <Alert
                    color="danger"
                    style={{width: "100%"}}
                  >
                    { error.replaceAll('"', "") }
                  </Alert>
                }
                <Button
                  color="primary"
                  style={{margin: "2rem auto 1rem auto"}}
                  Icon={FaMoneyBillTrendUp}
                  size="full"
                  type="submit"
                  isValid={!isValid || isLoading}
                >
                  Refinanciar
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </>
  );
}

export default RefinancingDetail;
