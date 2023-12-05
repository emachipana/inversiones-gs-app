/** @jsxImportSource @emotion/react */
import { Alert, Modal, Spinner } from "reactstrap";
import { useTheme } from "../../context/theme";
import { Background, Form, IconStyle, Title } from "./styles";
import { IoClose } from "react-icons/io5";
import { COLORS } from "../../styles";
import Button from "../Button";
import { FaSquarePlus } from "react-icons/fa6";
import { useData } from "../../context/data";

function ModalForm({ children, toggle, isOpen, title, isValid, handleSubmit }) {
  const { theme } = useTheme();
  const { isLoading, error } = useData();

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
    >
      <Background theme={theme}>
        <Title theme={theme}>{ title }</Title>
        <IoClose 
          css={IconStyle}
          color={COLORS[theme].primary}
          onClick={toggle}
        />
        <Form
          onSubmit={handleSubmit}
        >
          { children }
          {
            error
            ? <Alert
                color="danger"
                style={{width: "100%"}}
              >
                { error.replaceAll('"', "") }
              </Alert>
            : ""
          }
          <Button
            style={{marginTop: "1rem"}}
            color="primary"
            size="full"
            Icon={!isLoading ? FaSquarePlus : ""}
            type="submit"
            disabled={!isValid || isLoading}
          >
            {
              isLoading
              ? <>
                  <Spinner size="sm" />
                  {" "}
                  Creando...
                </>
              : "Crear préstamo"
            }
          </Button>
        </Form>
      </Background>
    </Modal>
  )
}

export default ModalForm;
