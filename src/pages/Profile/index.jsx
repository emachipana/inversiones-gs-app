import { useState } from "react";
import { Formik } from "formik";
import { useAuth } from "../../context/auth";
import { useTheme } from "../../context/theme";
import { Title } from "../../styles";
import { Container, Form } from "./styles";
import validate from "./validate";
import InputLabel from "../../components/Input/Label";
import { Group } from "../Loans/styles";
import Button from "../../components/Button";
import { Alert, Spinner } from "reactstrap";
import { useData } from "../../context/data";
import apiFetch from "../../services/apiFetch";

function Profile() {
  const { theme } = useTheme();
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { error, setError } = useData();

  const initialValues = {
    email: user.email,
    name: user.name,
    capital: user.capital,
    recovered: user.recovered.toFixed(2),
    new_password: "",
    confirm_password: ""
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      const body = {
        name: values.name,
        capital: values.capital,
        password: values.new_password ? values.new_password : undefined
      }

      console.log(body);
      const newUser = await apiFetch(`users/${user.id}`, { body, method: "PATCH" });
      setUser(newUser);
      setError(null);
      setIsLoading(false);
    }catch(e) {
      setIsLoading(false);
      console.error(e);

      setError(e.message);
    }
  }

  return (
    <>
      <Title theme={theme}>Perfil</Title>
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
            <Form
              onSubmit={handleSubmit}
              theme={theme}
            >
              <InputLabel 
                id="email"
                disabled
                label="Correo"
                value={values.email}
              />
              <InputLabel 
                id="name"
                label="Nombres"
                error={errors.name}
                handleBlur={handleBlur}
                handleChange={handleChange}
                placeholder="Edith"
                touched={touched.name}
                value={values.name}
              />
              <Group>
                <InputLabel 
                  id="capital"
                  label="Capital"
                  error={errors.capital}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  placeholder="S/. 0"
                  touched={touched.capital}
                  value={values.capital}
                />
                <InputLabel 
                  disabled
                  id="recovered"
                  label="Recuperado"
                  error={errors.recovered}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.recovered}
                  value={values.recovered}
                />
              </Group>
              <InputLabel 
                type="password"
                id="new_password"
                label="Nueva contraseña"
                error={errors.new_password}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched.new_password}
                value={values.new_password}
                placeholder="********"
              />
              <InputLabel 
                type="password"
                id="confirm_password"
                label="Confirma la contraseña"
                error={errors.confirm_password}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched.confirm_password}
                value={values.confirm_password}
                placeholder="********"
              />
              {
                error 
                && 
                <Alert
                  color="danger"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  { error.replaceAll('"', "") }
                </Alert>
              }
              <Button
                size="full"
                type="submit"
                color="primary"
                disabled={!isValid || isLoading}
              >
                {
                  isLoading
                  ? <>
                      <Spinner size="sm" />
                      {" "}
                      Actualizado...
                    </>
                  : "Actualizar"
                }
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  )
}

export default Profile;
