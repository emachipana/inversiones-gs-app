import { Formik } from "formik";
import { useTheme } from "../../context/theme";
import { Title } from "../../styles";
import { Container, FlexColumn, FlexRow, Form, Section, Text } from "./styles";
import { validate } from "./validate";
import InputLabel from "../../components/Input/Label";
import { Spinner } from "reactstrap";
import Button from "../../components/Button";
import generateInstallments from "../../helper/installments";
import { useState } from "react";
import capitalize from "../../helper/capitalize";
import { FaSquarePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaCalculator } from "react-icons/fa";
import { useData } from "../../context/data";
import Select from "../../components/Input/Select";

function Calc() {
  const [data, setData] = useState({
    totalPay: 0,
    toPay: 0,
    payType: "",
    firstPay: "",
    lastPay: "",
    payments: 0,
    amount: 0,
    months: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { setLoanModal } = useData();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const { totalPay, toPay, payType, firstPay, lastPay, payments, months, amount } = generateInstallments({
      ...values,
      amount: parseInt(values.amount)
    });

    setTimeout(() => {
      setData({ totalPay, toPay, payType, firstPay, lastPay, payments, months, amount });
      setIsLoading(false)
    }, 700);
  }

  const handleClick = () => {
    const { payType, amount, months } = data;
    setLoanModal({ payType, amount, months, isOpen: true });

    navigate("/prestamos");
  }

  const initialValues = { amount: "", months: "", payType: "" }

  return (
    <>
      <Title theme={theme}>Calculadora</Title>
      <Container>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validate}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <Section theme={theme}>
              <Form onSubmit={handleSubmit}>
                <InputLabel 
                  id="amount"
                  label="¿Cuanto prestaras?"
                  placeholder="S/. 0"
                  value={values.amount}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={errors.amount}
                  touched={touched.amount}
                />
                <InputLabel 
                  id="months"
                  label="¿Por cuantos meses?"
                  placeholder="Meses"
                  value={values.months}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={errors.months}
                  touched={touched.months}
                />
                <Select
                  id="payType"
                  label="Selecciona el tipo de pago"
                  value={values.payType}
                  touched={touched.payType}
                  error={errors.payType}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  options={["diario", "semanal"]}
                />
                <Button
                  size="full"
                  color="primary"
                  disabled={!isValid || isLoading}
                  type="submit"
                  Icon={FaCalculator}
                >
                  {
                    isLoading
                    ? <>
                        <Spinner size="sm"/>
                        {" "}
                        Calculando...
                      </>
                    : "Calcular"
                  }
                </Button>
              </Form>
            </Section>
          )}
        </Formik>
        {
          data.payType &&
          <Section
            theme={theme}
            width="55%"
            resWidth="70%"
          >
            <FlexColumn 
              theme={theme}
              gap={1.5}
              align="center"
            >
              <FlexRow>
                <FlexColumn theme={theme}>
                  <Text>Total a pagar</Text>
                  <Text size={0.9} weight={500}>S/. {data.totalPay}</Text>
                </FlexColumn>
                <FlexColumn theme={theme}>
                  <Text><u>{data.payments}</u> cuotas de</Text>
                  <Text size={0.9} weight={500}>S/. {data.toPay}</Text>
                </FlexColumn>
                <FlexColumn theme={theme}>
                  <Text>Forma de pago</Text>
                  <Text size={0.9} weight={500}>{capitalize(data.payType)}</Text>
                </FlexColumn>
                <FlexColumn theme={theme}>
                  <Text>Primer pago</Text>
                  <Text size={0.9} weight={500}>{data.firstPay ? capitalize(data.firstPay.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })) : ""}</Text>
                </FlexColumn>
                <FlexColumn theme={theme}>
                  <Text>Último pago</Text>
                  <Text size={0.9} weight={500}>{data.lastPay ? capitalize(data.lastPay.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })) : ""}</Text>
                </FlexColumn>
              </FlexRow>
              <Button
                color="primary"
                onClick={handleClick}
                Icon={FaSquarePlus}
              >
                Crear préstamo
              </Button>
            </FlexColumn>
          </Section>
        }
      </Container>
    </>
  );
}

export default Calc;
