import { Fragment, useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import Button from "../../components/Button";
import Search from "../../components/Search";
import { useTheme } from "../../context/theme";
import { COLORS, Title } from "../../styles";
import { Card, Container, FlexRow, Group, Name, Section, Text as PanderoTitle, FlexColumn } from "../Loans/styles";
import { v4 as generateId } from "uuid";
import { useData } from "../../context/data";
import { Formik } from "formik";
import validate from "./validate";
import ModalForm from "../../components/ModalForm";
import InputLabel from "../../components/Input/Label";
import Select from "../../components/Input/Select";
import filterObjects from "../../helper/filterObjects";
import { Text } from "../LoanDetail/styles";
import { IoMdPersonAdd } from "react-icons/io";
import apiFetch from "../../services/apiFetch";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import capitalize from "../../helper/capitalize";

const baseValues = {
  title: "",
  initialDate: "",
  panderoType: "",
  dni0: "",
  name0: "",
  last_name0: "",
  phone0: "",
  position0: ""
};

function Pandero() {
  const [modal, setModal] = useState(false);
  const [initialValues, setInitialValues] = useState(baseValues);
  const { 
    isLoading,
    setIsLoading, 
    setError, 
    setLoans, 
    setPayDays,
    loans,
    payDays,
    setBackup,
    backup } = useData();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const persons = filterObjects(initialValues);
  const pandero = Object.values(loans.pandero?.reduce((a, loan) => {
    const id = loan.pandero_id;
    if(!a[id]) a[id] = [];
    a[id].push(loan);
    return a;
  }, {}));

  const toggle = (resetForm) => {
    if(isLoading) return;

    setError(null);
    setModal(!modal);
    if(modal) {
      resetForm()
      setInitialValues(baseValues);
    };
  }

  const handleSubmit = async (values) => {
    setIsLoading(true);
    
    try {
      const data = filterObjects(values);
      const pandero_id = generateId();
      const date = new Date(values.initialDate + "T12:00:00");
      
      // loans
      const newLoans = await Promise.all(data.map(async (val, index) => {
        const body = {
          dni: val[`dni${index}`],
          name: val[`name${index}`],
          last_name: val[`last_name${index}`],
          phone: val[`phone${index}`],
          pandero_position: val[`position${index}`],
          amount: 0,
          isPandero: true,
          pandero_id,
          pandero_title: values.title,
          initial_date: date
        }

        return await apiFetch("loans", { body });
      }));

      // generate dates
      const num_type = parseInt(values.panderoType.split(" ")[1]) === 100 ? 5 : 30;
      const pays = [];
      for(let i = 0; i < newLoans.length; i++) {
        let counter = num_type;
        pays[i] = new Date(date.setDate(date.getDate() + counter));
        counter += num_type;
      }

      // generate pay days
      const payDays = await Promise.all(pays.map(async (pay) => {
        const body = {
          loanId: newLoans[0].id,
          dateToPay: pay,
          amount: parseInt(values.panderoType.split(" ")[1])
        }

        return await apiFetch("paydays", { body });
      }));

      setLoans((prev) => ({...prev, pandero: newLoans.concat(prev.pandero)}));
      setBackup((prev) => ({...prev, loans: {...loans, pandero: newLoans.concat(prev.loans.pandero)}}));
      setPayDays((prev) => prev.concat(payDays));
      setModal(!modal);
      setIsLoading(false);
      setError(null);
      navigate(`/pandero/${newLoans[0].pandero_id}`);
    }catch(e) {
      console.error(e);

      setIsLoading(false);
      setError(e.message);
    }
  }

  const handleClick = (values) => {
    const last_key = Object.keys(values).reverse()[0];
    const num = parseInt(last_key.match(/(\d+)$/)[0]) + 1;
    const newObject = {
      [`dni${num}`]: "",
      [`name${num}`]: "",
      [`last_name${num}`]: "",
      [`phone${num}`]: "",
      [`position${num}`]: ""
    }

    setInitialValues((prev) => ({...prev, ...newObject}));
  }

  const handleRedirect = (id) => {
    setLoans(backup.loans);
    navigate(`/pandero/${id}`);
  }

  return (
    <>
      <Title theme={theme}>Pandero</Title>
      <Container>
        <FlexRow>
          <Search isForPandero />
          <div style={{width: "200px"}}>
            <Button
              color="primary"
              Icon={FaSquarePlus}
              size="full"
              onClick={toggle}
            >
              Crear pandero
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
            : pandero.map((value, index) => {
                let date = new Date(value[0].initial_date);
                date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                const loan = value.find((loan) => loan.id === payDays.find((pay) => pay.loan[0] === loan.id).loan[0]);
                const amount = payDays.filter((pay) => pay.loan[0] === loan.id)[0].amount;

                return (
                  <Card
                    width={325}
                    key={index}
                    theme={theme}
                    onClick={() => handleRedirect(value[0].pandero_id)}
                  >
                    <Name
                      theme={theme}
                    >
                      <PanderoTitle
                        size={17}
                        theme={theme}
                      >
                        {capitalize(value[0].pandero_title)}
                      </PanderoTitle>
                    </Name>
                    <FlexRow isCard>
                      <FlexColumn>
                        <Text
                          theme={theme}
                          size={14}
                          weight={500}
                          color={COLORS[theme].gray.bold}
                        >
                          Inicio
                        </Text>
                        <Text
                          theme={theme}
                          size={13}
                          weight={300}
                          color={COLORS[theme].gray.bold}
                        >
                          {date}
                        </Text>
                      </FlexColumn>
                      <FlexColumn>
                        <Text
                          theme={theme}
                          size={14}
                          weight={500}
                          color={COLORS[theme].gray.bold}
                        >
                          Personas
                        </Text>
                        <Text
                          theme={theme}
                          size={13}
                          weight={300}
                          color={COLORS[theme].gray.bold}
                        >
                          {value.length}
                        </Text>
                      </FlexColumn>
                      <FlexColumn>
                        <Text
                          theme={theme}
                          size={14}
                          weight={500}
                          color={COLORS[theme].gray.bold}
                        >
                          Por persona
                        </Text>
                        <Text
                          theme={theme}
                          size={13}
                          weight={300}
                          color={COLORS[theme].gray.bold}
                        >
                          S/. {amount}
                        </Text>
                      </FlexColumn>
                      <FlexColumn>
                        <Text
                          theme={theme}
                          size={14}
                          weight={500}
                          color={COLORS[theme].gray.bold}
                        >
                          Total
                        </Text>
                        <Text
                          theme={theme}
                          size={13}
                          weight={300}
                          color={COLORS[theme].gray.bold}
                        >
                          S/. {amount * value.length}
                        </Text>
                      </FlexColumn>
                    </FlexRow>
                  </Card>
                )
              })
          }
        </Section>
      </Container>
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
          handleSubmit,
          resetForm
        }) => (
          <ModalForm
            isOpen={modal}
            title="Crear pandero"
            toggle={() => toggle(resetForm)}
            isValid={isValid}
            handleSubmit={handleSubmit}
          >
          <InputLabel 
            id="title"
            label="Nombre del pandero"
            placeholder="Pandero #01"
            value={values.title}
            touched={touched.title}
            error={errors.title}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <Group>
            <InputLabel 
              id="initialDate"
              type="date"
              label="Fecha de inicio"
              value={values.initialDate}
              touched={touched.initialDate}
              error={errors.initialDate}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
            <Select 
              id="panderoType"
              label="Tipo de pandero"
              value={values.panderoType}
              touched={touched.panderoType}
              error={errors.panderoType}
              handleBlur={handleBlur}
              handleChange={handleChange}
              options={["S/. 100", "S/. 1000"]}
            />
          </Group>
            {
              persons.map((person, index) => {
                const keys = Object.keys(person);
                
                return (
                  <Fragment key={index}>
                    <Text
                      theme={theme}
                    >
                      Persona {index + 1}
                    </Text>
                    <InputLabel 
                      id={keys[0]}
                      label="DNI"
                      placeholder="12345678"
                      value={values[`dni${index}`]}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      error={errors[`dni${index}`]}
                      touched={touched[`dni${index}`]}
                    />
                    <Group>
                      <InputLabel 
                        id={keys[1]}
                        label="Nombres"
                        placeholder="John"
                        value={values[`name${index}`]}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        error={errors[`name${index}`]}
                        touched={touched[`name${index}`]}
                      />
                      <InputLabel 
                        id={keys[2]}
                        label="Apellidos"
                        placeholder="Doe"
                        value={values[`last_name${index}`]}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        error={errors[`last_name${index}`]}
                        touched={touched[`last_name${index}`]}
                      />
                    </Group>
                    <Group>
                      <InputLabel 
                        id={keys[3]}
                        label="Teléfono"
                        placeholder="123456789"
                        value={values[`phone${index}`]}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        error={errors[`phone${index}`]}
                        touched={touched[`phone${index}`]}
                      />
                      <InputLabel 
                        id={keys[4]}
                        label="Posición"
                        placeholder="1"
                        value={values[`position${index}`]}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        error={errors[`position${index}`]}
                        touched={touched[`position${index}`]}
                      />
                    </Group>
                  </Fragment>
                )
              })
            }
            <Button
              style={{marginTop: "10px"}}
              color="danger"
              Icon={IoMdPersonAdd}
              type="button"
              onClick={() => handleClick(initialValues)}
            >
              Añadir persona
            </Button>
          </ModalForm>
        )}
      </Formik>
    </>
  );
}

export default Pandero;
