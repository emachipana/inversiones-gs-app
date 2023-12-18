import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useData } from "../../context/data";
import { useTheme } from "../../context/theme";
import { COLORS, Title } from "../../styles";
import { Badge, Card, FlexColumn, FlexRow, Section, Text } from "./styles";
import Button from "../../components/Button";
import capitalize from "../../helper/capitalize";
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from "reactstrap";
import apiFetch from "../../services/apiFetch";
import { FaTrashCan } from "react-icons/fa6";

function PanderoDetail() {
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    loan: {}
  });
  const [modalDelete, setModalDelete] = useState(false);
  const { isLoading, loans, payDays, updatePandero, setIsLoading, deletePandero } = useData();
  const { theme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  let pandero = loans.pandero.filter((loan) => loan.pandero_id === id).sort((a, b) => a.pandero_position - b.pandero_position);
  if(loans.pandero.length > 0 && pandero.length <= 0) return navigate("/pandero");
  const pandero_id = pandero.find((loan) => loan.id === payDays.find((pay) => pay.loan[0] === loan.id)?.loan[0])?.id;
  let pays = payDays.filter((pay) => pay.loan[0] === pandero_id);
  pays = pays.map((pay) => ({...pay, dateToPay: new Date(pay.dateToPay)})).sort((a, b) => a.dateToPay - b.dateToPay);
  pandero = pandero.map((pan, index) => ({...pan, pandero_date: pays[index]?.dateToPay}));
  const pending = pandero.filter((loan) => !loan.isDelivered);
  const next_pandero = pending.length > 0 ? pending[0] : pandero[0];

  const toggle = () => setModal({...modal, isOpen: !modal.isOpen});
  const toggleDelete = () => setModalDelete(!modalDelete);

  const handleUpdate = async () => {
    setIsModalLoading(true);

    try {
      const loanUpdated = await apiFetch(`loans/${modal.loan.id}`, { body: { isDelivered: true }, method: "PATCH" });
      const oldLoan = loans.pandero.find((loan) => loan.id === loanUpdated.id);
      updatePandero(oldLoan, loanUpdated);
      setIsModalLoading(false);
      setModal({loan: {}, isOpen: false});
    }catch(e) {
      console.error(e);

      setIsModalLoading(false);
    }
  }

  const handleDelete = async () => {
    setIsLoading(true);
    
    try {
      // delete all loans
      await Promise.all(pandero.map(async (loan) => (await deletePandero(loan.id))));
      navigate("/pandero");

      // delete all pays
      pays.forEach(async (pay) => {
        await apiFetch(`paydays/${pay.id}`, { method: "DELETE" });
      });

      setIsLoading(false);
    }catch(e) {
      console.error(e);

      history.back();
      setIsLoading(false);
    }
  }

  return (
    isLoading
    ? <Loader />
    : <>
        <Title theme={theme}>{capitalize(next_pandero.pandero_title)}</Title>
        <Card theme={theme}>
          <Text 
            theme={theme}
            size={"2rem"}
          >
            {
              pending.length > 0
              ? "Próximo pandero"
              : "Pandero finalizado"
            }
          </Text>
          <FlexRow>
            <FlexColumn gap={0.05}>
              <Text theme={theme}>{`${next_pandero.name} ${next_pandero.last_name}`}</Text>
              <Text 
                size={"15px"}
                weight={400}
                theme={theme}
              >
                Fecha: {capitalize(next_pandero.pandero_date.toLocaleString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}
              </Text>
            </FlexColumn>
            {
              pending.length > 0
              ? <Button
                  color="primary"
                  size="full"
                  style={{maxWidth: "160px", marginBottom: "1.5rem"}}
                  onClick={() => setModal((prev) => ({loan: next_pandero, isOpen: !prev.isOpen}))}
                >
                  ¿Ya se jugó?
                </Button>
              : ""
            }
            
          </FlexRow>
          <FlexRow>
            <FlexColumn>
              <Text
                size={"16px"}
                weight={700}
                theme={theme}
              >
                DNI
              </Text>
              <Text
                size={"16px"}
                weight={400}
                theme={theme}
              >
                {next_pandero.dni}
              </Text>
            </FlexColumn>
            <FlexColumn>
              <Text
                size={"16px"}
                weight={700}
                theme={theme}
              >
                Télefono
              </Text>
              <Text
                size={"16px"}
                weight={400}
                theme={theme}
              >
                +51 {next_pandero.phone}
              </Text>
            </FlexColumn>
            
            <FlexColumn>
              <Text
                size={"16px"}
                weight={700}
                theme={theme}
              >
                Participantes
              </Text>
              <Text
                size={"16px"}
                weight={400}
                theme={theme}
              >
                {pandero.length}
              </Text>
            </FlexColumn>
            <FlexColumn>
              <Text
                size={"16px"}
                weight={700}
                theme={theme}
              >
                Monto por participante
              </Text>
              <Text
                size={"16px"}
                weight={400}
                theme={theme}
              >
                S/. {pays[0].amount}
              </Text>
            </FlexColumn>
            <FlexColumn>
              <Text
                size={"16px"}
                weight={700}
                theme={theme}
              >
                Total
              </Text>
              <Text
                size={"16px"}
                weight={400}
                theme={theme}
              >
                S/. {pays[0].amount * pandero.length}
              </Text>
            </FlexColumn>
            <FlexColumn>
              <Text
                size={"16px"}
                weight={700}
                theme={theme}
              >
                Fecha de inicio
              </Text>
              <Text
                size={"16px"}
                weight={400}
                theme={theme}
              >
                {capitalize(new Date(next_pandero.initial_date).toLocaleString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}
              </Text>
            </FlexColumn>
          </FlexRow>
          <Button
            color="danger"
            style={{margin: "1rem auto 0 auto"}}
            Icon={FaTrashCan}
            onClick={toggleDelete}
          >
            Eliminar pandero
          </Button>
        </Card>
        <Section>
          <Text
            style={{textAlign: "center", margin: "2rem 0"}}
            theme={theme}
            size={"2rem"}
            weight={700}
          >
            Lista de participantes
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
                    size={"17.5px"}
                    weight={600}
                    color={COLORS[theme].primary}
                  >
                    DNI
                  </Text>
                </th>
                <th>
                  <Text
                    theme={theme}
                    size={"17.5px"}
                    weight={600}
                    color={COLORS[theme].primary}
                  >
                    Nombres
                  </Text>
                </th>
                <th>
                  <Text
                    theme={theme}
                    size={"17.5px"}
                    weight={600}
                    color={COLORS[theme].primary}
                  >
                    Télefono
                  </Text>
                </th>
                <th>
                  <Text
                    theme={theme}
                    size={"17.5px"}
                    weight={600}
                    color={COLORS[theme].primary}
                  >
                    Fecha
                  </Text>
                </th>
                <th>
                  <Text
                    theme={theme}
                    size={"17.5px"}
                    weight={600}
                    color={COLORS[theme].primary}
                  >
                    Orden
                  </Text>
                </th>
                <th>
                  <Text
                    theme={theme}
                    size={"17.5px"}
                    weight={600}
                    color={COLORS[theme].primary}
                  >
                    Estado
                  </Text>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                pandero.map((pan, index) => (
                  <tr key={index}>
                    <td>
                      <Text
                        theme={theme}
                        size={"16.5px"}
                        weight={400}
                        style={{minWidth: "65px"}}
                      >
                        {pan.dni}
                      </Text>
                    </td>
                    <td>
                      <Text
                        theme={theme}
                        size={"16.5px"}
                        weight={400}
                        style={{minWidth: "150px"}}
                      >
                        {`${pan.name} ${pan.last_name}`}
                      </Text>
                    </td>
                    <td>
                      <Text
                        theme={theme}
                        size={"16.5px"}
                        weight={400}
                        style={{minWidth: "115px"}}
                      >
                        +51 {pan.phone}
                      </Text>
                    </td>
                    <td>
                      <Text
                        theme={theme}
                        size={"16.5px"}
                        weight={400}
                        style={{minWidth: "60px"}}
                      >
                        {pan.pandero_date && capitalize(`${pan.pandero_date.getDate()}/${pan.pandero_date.getMonth() + 1}/${pan.pandero_date.getFullYear()}`)}
                      </Text>
                    </td>
                    <td>
                      <Text
                        theme={theme}
                        size={"16.5px"}
                        weight={400}
                      >
                        {pan.pandero_position}
                      </Text>
                    </td>
                    <td>
                      <Badge
                        isDelivered={pan.isDelivered}
                      >
                        {
                          pan.isDelivered
                          ? "Recibido"
                          : "Por recibir"
                        }
                      </Badge>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Section>
        <Modal
          isOpen={modal.isOpen}
          toggle={toggle}
          centered
          size="sm"
        >
          <ModalHeader
            toggle={toggle}
          >
            <Text
              theme={theme}
              size={19}
              color={COLORS.light.gray.bold}
            >
              Registrar pandero
            </Text>
          </ModalHeader>
          <ModalBody>
            <Text 
              theme={theme}
              size={17}
              color={COLORS.light.gray.bold}
            >
              ¿Estas segura de confirmar que se jugo correctamente el pandero del 
              <Text 
                theme={theme}
                color={COLORS.light.primary}
                size={17}
              >
                {modal.loan.pandero_date && capitalize(modal.loan.pandero_date.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}
              </Text>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={toggle}
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
                isModalLoading
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
        <Modal
          isOpen={modalDelete}
          toggle={toggleDelete}
          centered
          size="sm"
        >
          <ModalHeader
            toggle={toggleDelete}
          >
            <Text
              theme={theme}
              size={19}
              color={COLORS.light.gray.bold}
            >
              Eliminar pandero
            </Text>
          </ModalHeader>
          <ModalBody>
            <Text 
              theme={theme}
              size={17}
              color={COLORS.light.gray.bold}
            >
              ¿Estas segura de eliminar el pandero?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={toggleDelete}
              size="sm"
            >
              Cancelar
            </Button>
            {" "}
            <Button
              color="danger"
              onClick={handleDelete}
              size="sm"
              Icon={FaTrashCan}
            >
              Eliminar
            </Button>
          </ModalFooter>
        </Modal>
      </>
  )
}

export default PanderoDetail;
