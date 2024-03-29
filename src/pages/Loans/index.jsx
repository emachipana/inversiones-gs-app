import { useState } from "react";
import { ClipLoader } from "react-spinners";
import Button from "../../components/Button";
import Search from "../../components/Search";
import { useData } from "../../context/data";
import { useTheme } from "../../context/theme";
import { COLORS, Title } from "../../styles";
import { Card, Container, FlexColumn, FlexRow, Group, Name, Section, Text } from "./styles";
import { FaSquarePlus } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import capitalize from "../../helper/capitalize";
import { useNavigate } from "react-router-dom";
import validate from "./validate";
import { Formik } from "formik";
import ModalForm from "../../components/ModalForm";
import InputLabel from "../../components/Input/Label";
import Select from "../../components/Input/Select";
import generateInstallments from "../../helper/installments";
import apiFetch from "../../services/apiFetch";
import { getInfo } from "../../services/reniec";
import { Badge } from "../LoanDetail/styles";

const infoBase = {
  dni: "",
  name: "",
  last_name: "",
  error: {
    dni: null
  },
  blur: {
    dni: false
  }
}

function Loans() {
  const [info, setInfo] = useState(infoBase);
  const { theme } = useTheme();
  const {
    loans,
    isLoading,
    loanModal,
    setLoanModal,
    setError,
    setIsLoading,
    setLoans,
    setPayDays,
    setBackup,
    backup } = useData();
  const navigate = useNavigate();
  const { payType, amount, months, isOpen } = loanModal;

  const toggle = (resetForm) => {
    if(isLoading) return;

    setError(null);
    setLoanModal({...loanModal, isOpen: !isOpen});
    if(loanModal.isOpen) {
      resetForm();
      setInfo(infoBase);
    }
  }

  const initialValues = {
    payType,
    amount,
    months,
    name: "",
    last_name: "",
    phone: "",
    account: "",
    cci: ""
  }

  const handleSubmit  = async (values) => {
    setIsLoading(true);
    
    try {
      const amount = parseInt(values.amount);
      const { totalPay, toPay, pays, lastPay } = generateInstallments({...values, amount});

      const body = {
        ...values,
        dni: info.dni || values.dni,
        name: info.name.toLowerCase() || values.name.toLowerCase(),
        last_name: info.last_name.toLowerCase() || values.last_name.toLowerCase(),
        amount,
        pay_type: values.payType,
        receive_amount: totalPay,
        bank_account: [ values.account, values.cci ],
        finish_date: lastPay
      }

      // create loan
      const newLoan = await apiFetch("loans", { body });
      const regularLoans = loans.regular;
      regularLoans.push(newLoan);
      setLoans((loans) => ({...loans, regular: regularLoans}));
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

      setIsLoading(false);
      setLoanModal((prev) => ({...prev, isOpen: false}));
      setError(null)
      navigate(`/prestamos/${newLoan.id}`);
    }catch(e) {
      console.error(e);

      setError(e.message);
      setIsLoading(false);
    }
  }

  const handleChangeInfo = async (e) => {
    if(e.target.value.length > 8) return;

    setInfo((info) => ({
      ...info,
      dni: e.target.value,
      error: {
        dni: e.target.value.trim().length > 0 ? null : info.error.dni
      }
    }));

    if((e.target.value * 1).toString() === "NaN") setInfo((info) => ({
      ...info,
      error: {
        dni: "Solo se aceptan números"
      }
    }));

    if(e.target.value.length === 8) {
      const data = await getInfo(e.target.value);
      console

      if(data.success) {
        setInfo((info) => ({
          ...info,
          name: data.nombres,
          last_name: `${data.apellidoPaterno} ${data.apellidoMaterno}`
        }));
      }else {
        setInfo((info) => ({
          ...info,
          name: "",
          last_name: ""
        }));
      }

    }
  }

  const handleBlurInfo = (e) => {
    setInfo((info) => ({
      ...info,
      blur: {
        dni: true
      }
    }));

    if(!e.target.value) setInfo((info) => ({
      ...info,
      error: {
        dni: "Este campo es obligatorio"
      }
    }));
  }

  const handleClick = (id) => {
    setLoans(backup.loans);
    navigate(`/prestamos/${id}`);
  }

  return (
    <>
      <Title theme={theme}>Préstamos</Title>
      <Container>
        <FlexRow>
          <Search />
          <div style={{width: "200px"}}>
            <Button
              color="primary"
              Icon={FaSquarePlus}
              size="full"
              onClick={toggle}
            >
              Crear préstamo
            </Button>
          </div>
        </FlexRow>
        <Section isLoading={isLoading}>
          {
            isLoading
            ? <ClipLoader 
                color={COLORS[theme].primary}
                size={60}
              />
            : loans.regular?.map((loan, index) => (
                <Card
                    theme={theme}
                    key={index}
                    onClick={() => handleClick(loan.id)}
                  >
                    <Name
                      theme={theme}
                    >
                      <Text
                        size={17}
                        theme={theme}
                      >
                        {`${capitalize(loan.name)} ${capitalize(loan.last_name)}`}
                      </Text>
                      <FlexRow
                        isCard
                        justify="start"
                        gap={0.4}
                      >
                        <FaWhatsapp 
                          size={20}
                          color={COLORS[theme].white}
                        />
                        <Text 
                          size={15}
                          theme={theme}
                          weight={400}
                        >
                          +51 {loan.phone}
                        </Text>
                      </FlexRow>
                    </Name>
                    <FlexRow
                      isCard
                    >
                      <FlexColumn>
                        {
                          loan.isPaid
                          ? <Badge
                              status="pagado"
                            >
                              Pagado
                            </Badge>
                          : <>
                              <Text
                                theme={theme}
                                size={14}
                                weight={500}
                                color={COLORS[theme].gray.bold}
                              >
                                Deuda S/.
                              </Text>
                              <Text
                                theme={theme}
                                size={13}
                                weight={300}
                                color={COLORS[theme].gray.bold}
                              >
                              {parseFloat(loan.recovered.toFixed(2))} / {parseFloat(loan.receive_amount.toFixed(2))}
                              </Text>
                            </>
                        }
                      </FlexColumn>
                      <FlexColumn>
                        <Text
                          theme={theme}
                          size={14}
                          weight={500}
                          color={COLORS[theme].gray.bold}
                        >
                          DNI
                        </Text>
                        <Text
                          theme={theme}
                          size={13}
                          weight={300}
                          color={COLORS[theme].gray.bold}
                        >
                          {loan.dni}
                        </Text>
                      </FlexColumn>
                      <FlexColumn>
                        <Text
                          theme={theme}
                          size={14}
                          weight={500}
                          color={COLORS[theme].gray.bold}
                        >
                          Pago
                        </Text>
                        <Text
                          theme={theme}
                          size={13}
                          weight={300}
                          color={COLORS[theme].gray.bold}
                        >
                          {capitalize(loan.pay_type)}
                        </Text>
                      </FlexColumn>
                      <FlexColumn>
                        <Text
                          theme={theme}
                          size={14}
                          weight={500}
                          color={COLORS[theme].gray.bold}
                        >
                          Meses
                        </Text>
                        <Text
                          theme={theme}
                          size={13}
                          weight={300}
                          color={COLORS[theme].gray.bold}
                        >
                          {loan.months}
                        </Text>
                      </FlexColumn>
                    </FlexRow>
                </Card>
              ))
          }
        </Section>
      </Container>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={(values) => validate(values, info)}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm
        }) => (
          <ModalForm
            isOpen={loanModal.isOpen}
            title="Crear préstamo"
            toggle={() => toggle(resetForm)}
            isValid={isValid}
            handleSubmit={handleSubmit}
          >
            <InputLabel 
              id="dni"
              label="DNI"
              placeholder="12345678"
              value={info.dni}
              handleChange={handleChangeInfo}
              handleBlur={handleBlurInfo}
              error={info.error.dni}
              touched={info.blur.dni}
            />
            <InputLabel 
              id="name"
              label="Nombres"
              placeholder="John"
              value={info.name || values.name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              disabled={!!info.name}
            />
            <InputLabel 
              id="last_name"
              label="Apellidos"
              placeholder="Doe"
              value={info.last_name || values.last_name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.last_name}
              touched={touched.last_name}
              disabled={!!info.last_name}
            />
            <InputLabel 
              id="phone"
              label="Teléfono"
              placeholder="123456789"
              value={values.phone}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.phone}
              touched={touched.phone}
            />
            <Group>
              <InputLabel 
                id="account"
                label="Cuenta bancaria"
                placeholder="123456789"
                value={values.account}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.account}
                touched={touched.account}
              />
              <InputLabel 
                id="cci"
                label="CCI"
                placeholder="123456789"
                value={values.cci}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.cci}
                touched={touched.cci}
              />
            </Group>
            <Group>
              <InputLabel 
                id="amount"
                label="Monto a prestar"
                placeholder="S/. 0"
                value={values.amount}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.amount}
                touched={touched.amount}
              />
              <InputLabel 
                id="months"
                label="Meses"
                placeholder="2"
                value={values.months}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.months}
                touched={touched.months}
              />
            </Group>
            <Select 
              id="payType"
              label="Tipo de pago"
              value={values.payType}
              touched={touched.payType}
              error={errors.payType}
              handleBlur={handleBlur}
              handleChange={handleChange}
              options={["diario", "semanal"]}
            />
          </ModalForm>
        )}
      </Formik>
    </>
  )
}

export default Loans;
