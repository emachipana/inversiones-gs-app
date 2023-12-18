import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from "reactstrap";
import { useTheme } from "../../context/theme";
import { Divider, PaysContainer, PaysSection, Text } from "./styles";
import capitalize from "../../helper/capitalize";
import { COLORS } from "../../styles";
import Button from "../../components/Button";
import { useData } from "../../context/data";
import apiFetch from "../../services/apiFetch";
import { useParams } from "react-router-dom";

function Pays() {
  const [modalUpdate, setModalUpdate] = useState({
    pay: {},
    isOpen: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const { id } = useParams();
  const { payDays, updatePayDay, loans } = useData();
  const loan = loans.regular?.find((loan) => loan.id === id);
  const pays = payDays.filter((pay) => pay.loan[0] === loan.id);
  const format = pays.map((pay) => ({...pay, dateToPay: new Date(pay.dateToPay)}));
  const paysPaid = format.filter((pay) => pay.isPaid).sort((a, b) => b.dateToPay - a.dateToPay);
  const paysNotPaid = format.filter((pay) => !pay.isPaid).sort((a, b) => a.dateToPay - b.dateToPay);
  const date = new Date(modalUpdate.pay?.dateToPay);

  const toggleUpdate = () => setModalUpdate((prev) => ({...prev, isOpen: !prev.isOpen}));

  const handleClick = (pay) => {
    toggleUpdate();
    setModalUpdate((prev) => ({...prev, pay}));
  }

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const oldPay = pays.find((pay) => pay.id === modalUpdate.pay.id);
      const payUpdated = await apiFetch(`paydays/${modalUpdate.pay.id}`, { body: { isPaid: true }, method: "PATCH" });
      await updatePayDay(oldPay, payUpdated);
      setIsLoading(false);
      setModalUpdate((prev) => ({ ...prev, isOpen: false }));
    }catch(e) {
      console.error(e);

      setIsLoading(false);
    }
  }

  return (
    <PaysContainer>
      <Text
        size={30}
        theme={theme}
      >
        Pagos {loan?.pay_type + (loan?.pay_type === "diario" ? "s" : "es")}
      </Text>
      <Divider>
        <PaysSection theme={theme} isLeft>
          <Text
            theme={theme}
            size={25}
            style={{alignSelf: "center"}}
          >
            Pendientes
          </Text>
          <Table
            bordered
            hover
            responsive
            striped
            dark={theme === "dark"}
            style={{width: "100%"}}
          >
            <thead>
              <tr>
                <th>
                  <Text
                    theme={theme}
                    color={COLORS[theme].primary}
                    size={19}
                    weight={700}
                  >
                    Fecha
                  </Text>
                </th>
                <th>
                  <Text
                    theme={theme}
                    color={COLORS[theme].primary}
                    size={19}
                    weight={700}
                  >
                    Monto
                  </Text>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                paysNotPaid.map((pay, index) => {
                  const date = capitalize(pay.dateToPay.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));

                  return (
                    <tr key={index}>
                      <td>
                        <Text
                          theme={theme}
                          size={15}
                          weight={500}
                          style={{minWidth: "150px"}}
                        >
                          {date}
                        </Text>
                      </td>
                      <td>
                        <Text
                          theme={theme}
                          size={15}
                          weight={500}
                        >
                          S/. {pay.amount}
                        </Text>
                      </td>
                      <td>
                        <Button
                          color="primary"
                          size="sm"
                          onClick={() => handleClick(pay)}
                          style={{margin: "auto"}}
                        >
                          ¿Pagó?
                        </Button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </PaysSection>
        <PaysSection theme={theme}>
          <Text
            theme={theme}
            size={25}
            style={{alignSelf: "center"}}
          >
            Pagados
          </Text>
          <Table
            bordered
            hover
            responsive
            striped
            dark={theme === "dark"}
            style={{width: "100%"}}
            
          >
            <thead>
              <tr>
                <th>
                  <Text
                    theme={theme}
                    color={COLORS[theme].primary}
                    size={19}
                    weight={700}
                  >
                    Fecha
                  </Text>
                </th>
                <th>
                  <Text
                    theme={theme}
                    color={COLORS[theme].primary}
                    size={19}
                    weight={700}
                  >
                    Monto
                  </Text>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                paysPaid.map((pay, index) => {
                  const date = capitalize(pay.dateToPay.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));

                  return (
                    <tr key={index}>
                      <td>
                        <Text
                          theme={theme}
                          size={15}
                          weight={500}
                          style={{minWidth: "150px"}}
                        >
                          {date}
                        </Text>
                      </td>
                      <td>
                        <Text
                          theme={theme}
                          size={15}
                          weight={500}
                        >
                          S/. {pay.amount}
                        </Text>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </PaysSection>
      </Divider>
      <Modal
        isOpen={modalUpdate.isOpen}
        toggle={toggleUpdate}
        centered
        size="sm"
      >
        <ModalHeader
          toggle={toggleUpdate}
        >
          <Text
            theme={theme}
            size={19}
            color={COLORS.light.gray.bold}
          >
            Registrar pago
          </Text>
        </ModalHeader>
        <ModalBody>
          <Text 
            theme={theme}
            size={17}
            color={COLORS.light.gray.bold}
          >
            ¿Estas segura de confirmar el pago del 
            <Text 
              theme={theme}
              color={COLORS.light.primary}
              size={17}
            >
              {capitalize(date.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}
            </Text>
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={toggleUpdate}
            size="sm"
          >
            Cancelar
          </Button>
          {" "}
          <Button
            color="primary"
            onClick={handleUpdate}
            size="sm"
          >
            {
              isLoading
              ? <>
                  <Spinner size="sm" />
                  {" "}
                  Actualizando...
                </>
              : "Confirmar"
            }
          </Button>
        </ModalFooter>
      </Modal>
    </PaysContainer>
  );
}

export default Pays;
