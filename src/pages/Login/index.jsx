import { useState } from "react";
import { Container, Form, Image, Section, Title } from "./styles";
import { useAuth } from "../../context/auth";
import { Formik } from "formik";
import InputForm from "../../components/InputForm";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BiSolidKey } from "react-icons/bi";
import { Alert, Spinner } from "reactstrap";
import Button from "../../components/Button";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { setError, error, login } = useAuth();

  const initValues = {
    email: "",
    password: ""
  }

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await login({ 
        email: values.email.trim(),
        password: values.password
      });

      setIsLoading(false);
    }catch(e) {
      console.error(e);

      setIsLoading(false);
      setError(e.message);
    }
  }

  const validate = (values) => {
    const errors = {};

    if(!values.email) {
      errors.email = "Este campo es obligatorio";
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())) {
      errors.email = "El formato es incorrecto";
    }

    if(!values.password) {
      errors.password = "Este campo es obligatorio";
    }else if(values.password.length < 6) {
      errors.password = "El mínimo son 6 caracteres";
    }

    return errors;
  }

  return (
    <Container>
      <Section>
        <Title>Inversiones G.S.</Title>
        <Title size={0.9}>Use su cuenta registrada</Title>
        <Formik
          initialValues={initValues}
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
            <Form
              onSubmit={handleSubmit}
            >
              <InputForm 
                Icon={MdOutlineAlternateEmail}
                id="email"
                placeholder="Correo"
                value={values.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.email}
                isTouched={touched.email}
              />
               <InputForm 
                Icon={BiSolidKey}
                id="password"
                type="password"
                placeholder="Contraseña"
                value={values.password}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.password}
                isTouched={touched.password}
              />
              {
                error
                ? <Alert
                    color="danger"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    { error.replaceAll('"', "") }
                  </Alert>
                : null
              }
              <Button
                type="submit"
                color="primary"
                disabled={isLoading || !isValid}
              >
                {
                  isLoading
                  ? <>
                      <Spinner size="sm" />
                      {" "}
                      Iniciando Sesión...
                    </>
                  : "Iniciar Sesión"
                }
              </Button>
            </Form>
          )}
        </Formik>
      </Section>
      <Section isImage>
        <Image 
          alt="money-in-wallet"
          src="/photo/money.jpg"
        />
      </Section>
    </Container>
  )
}

export default Login;
