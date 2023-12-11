import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../context/theme";
import { COLORS, Title } from "../../styles";
import { useData } from "../../context/data";
import capitalize from "../../helper/capitalize";
import Loader from "../../components/Loader";
import { Badge, FlexColumn, FlexRow, Form, Info, Text, Image } from "./styles";
import Button from "../../components/Button";
import { FaEdit, FaFilePdf } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Alert, Input, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "reactstrap";
import { MdOutlineFileUpload } from "react-icons/md";
import uploadFile from "../../services/uploadFile";
import apiFetch from "../../services/apiFetch";
import { Formik } from "formik";
import validate from "./validate";
import ModalForm from "../../components/ModalForm";
import InputLabel from "../../components/Input/Label";
import Pays from "./Pays";

function LoanDetail() {
  const [modalDelete, setModalDelete] = useState(false);
  const [isFileOpen, setIsFileOpen] = useState({
    doc: false,
    img: false
  });
  const [isFileUploading, setIsFileUploading] = useState({
    doc: false,
    img: false
  });
  const { 
    loans,
    isLoading,
    error,
    setError,
    updateLoan,
    deleteLoan,
    setIsLoading,
    setLoanModal,
    loanModal } = useData();
  const { theme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const loan = loans.regular?.find((loan) => loan.id === id);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const finish_date = new Date(loan?.finish_date);
  finish_date.setHours(0, 0, 0, 0);
  const status = loan?.isPaid ? "pagado" : (finish_date < today ? "vencido" : "pendiente");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(e.target.contrato) {
        if(!e.target.contrato.files[0]) return;

        setIsFileUploading((prev) => ({...prev, doc: true}));
        const url = await uploadFile(e.target.contrato.files[0], loan.id);
        const updatedLoan = await apiFetch(`loans/${loan.id}`, { body: {aval_document: url}, method: "PATCH" }); 
        updateLoan(loan, updatedLoan);
        setError(null);
        setIsFileUploading((prev) => ({...prev, doc: false}));
        setIsFileOpen((prev) => ({...prev, doc: false}));
        return;
      }
  
      if(!e.target.voucher.files[0]) return;

      setIsFileUploading((prev) => ({...prev, img: true}));
      const url = await uploadFile(e.target.voucher.files[0], loan.id);
      const updatedLoan = await apiFetch(`loans/${loan.id}`, { body: {voucher: url}, method: "PATCH" });
      updateLoan(loan, updatedLoan);
      setIsFileUploading((prev) => ({...prev, img: false}));
      setIsFileOpen((prev) => ({...prev, img: false}));
      setError(null);
    }catch(e) {
      setError(e.message);
      setIsFileUploading({doc: false, img: false});

      console.error(e);
    }
  }

  const handleDelete = async () => {
    setIsLoading(true);
    navigate("/prestamos");

    try {
      await deleteLoan(loan.id);
      setIsLoading(false);
    }catch(e) {
      console.error(e);
      setIsLoading(false);
    }
  }

  const toggleDelete = () => setModalDelete(!modalDelete);

  const toggleUpdate = (resetForm) => {
    setLoanModal((prev) => ({...prev, isOpen: !prev.isOpen}));

    if(loanModal.isOpen) resetForm();
  }

  const initialValues = {
    phone: loan?.phone,
    account: loan?.bank_account[0],
    cci: loan?.bank_account[1]
  }

  const handleUpdate = async (values) => {
    setIsLoading(true);

    try {
      const body = {
        ...values,
        bank_account: [values.account, values.cci]
      }

      const updatedLoan = await apiFetch(`loans/${loan.id}`, { body, method: "PATCH" });
      updateLoan(loan, updatedLoan);
      setError(null);
      setLoanModal((prev) => ({...prev, isOpen: false}));
      setIsLoading(false);
    }catch(e) {
      console.error(e);

      setError(e.message);
      setIsLoading(false);
    }
  }

  return (
    isLoading
    ? <Loader />
    : <>
        <Title theme={theme}>{`${capitalize(loan.name)} ${capitalize(loan.last_name)}`}</Title>
        <FlexRow
          isMain
          padding="0 2rem"
        >
          <Info theme={theme}>
            <FlexRow>
              <FlexColumn>
                <Text theme={theme}>DNI</Text>
                <Text 
                  theme={theme}
                  size={16}
                  weight={400}
                >
                  { loan.dni }
                </Text>
              </FlexColumn>
              <FlexColumn>
                <Text theme={theme}>Teléfono</Text>
                <Text 
                  theme={theme}
                  size={16}
                  weight={400}
                >
                  +51 { loan.phone }
                </Text>
              </FlexColumn>
              <FlexColumn>
                <Text theme={theme}>Estado</Text>
                <Badge status={status}>{capitalize(status)}</Badge>
              </FlexColumn>
            </FlexRow>
            <FlexRow>
              <FlexColumn>
                <Text theme={theme}>Prestado</Text>
                <Text 
                  theme={theme}
                  size={16}
                  weight={400}
                >
                  S/. { loan.amount }
                </Text>
              </FlexColumn>
              <FlexColumn>
                <Text theme={theme}>Recuperado</Text>
                <Text 
                  theme={theme}
                  size={16}
                  weight={400}
                >
                  S/. { parseFloat(loan.recovered.toFixed(2)) }
                </Text>
              </FlexColumn>
              <FlexColumn>
                <Text theme={theme}>Por recibir</Text>
                <Text 
                  theme={theme}
                  size={16}
                  weight={400}
                >
                  S/. { parseFloat(loan.receive_amount.toFixed(2)) }
                </Text>
              </FlexColumn>
            </FlexRow>
            <FlexRow>
              <FlexColumn>
                <Text theme={theme}>Cuenta</Text>
                <Text 
                  theme={theme}
                  size={16}
                  weight={400}
                >
                  { loan.bank_account[0] }
                </Text>
              </FlexColumn>
              <FlexColumn>
                <Text theme={theme}>CCI</Text>
                <Text 
                  theme={theme}
                  size={16}
                  weight={400}
                >
                  { loan.bank_account[1] }
                </Text>
              </FlexColumn>
            </FlexRow>
            <FlexRow>
              <FlexColumn>
                <Text theme={theme}>Meses</Text>
                <Text 
                  theme={theme}
                  size={16}
                  weight={400}
                >
                  { loan.months }
                </Text>
              </FlexColumn>
              <FlexColumn>
                <Text theme={theme}>Fecha de culminación</Text>
                <Text 
                  theme={theme}
                  size={16}
                  weight={400}
                >
                  { capitalize(finish_date.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })) }
                </Text>
              </FlexColumn>
              <FlexColumn>
                <Text theme={theme}>Tipo de pago</Text>
                <Text 
                  theme={theme}
                  size={16}
                  weight={400}
                >
                  { capitalize(loan.pay_type) }
                </Text>
              </FlexColumn>
            </FlexRow>
            <FlexRow
              justify="center"
              gap={2}
            >
              <Button
                color="primary"
                Icon={FaEdit}
                onClick={toggleUpdate}
              >
                Editar
              </Button>
              <Button
                color="danger"
                Icon={RiDeleteBin6Fill}
                onClick={toggleDelete}
              >
                Eliminar
              </Button>
            </FlexRow>
          </Info>
          <Info 
            theme={theme}
            width={450}
          >
            <FlexRow gap={1}>
              <FlexColumn style={{width: "100%"}}>
                <Text theme={theme}>Contrato</Text>
                <Form onSubmit={handleSubmit}>
                  {
                    !loan.aval_document || isFileOpen.doc
                    ? <Input
                        id="contrato"
                        name="contrato"
                        type="file"
                        bsSize="sm"
                        accept="application/pdf"
                      />
                    : <Button
                        Icon={FaFilePdf}
                        color="primary"
                        type="button"
                      >
                        <a
                          href={loan.aval_document}
                          target="_blank"
                        >
                          Visualizar PDF
                        </a>
                      </Button>
                  }
                  <FlexRow 
                    gap={0.5}
                    width="fit-content" 
                    justify="center" 
                    wrap="no-wrap"
                  >
                    <Button
                      size="sm"
                      color="primary"
                      Icon={!loan.aval_document || isFileOpen.doc ? MdOutlineFileUpload : FaEdit}
                      type={!loan.aval_document || isFileOpen.doc ? "submit" : "button"}
                      onClick={() => setIsFileOpen((prev) => ({...prev, doc: true}))}
                    >
                      {
                        !loan.aval_document || isFileOpen.doc
                        ? isFileUploading.doc
                          ? <>
                              <Spinner size="sm" />
                              {" "}
                              Subiendo...
                            </>
                          : "Subir"
                        : "Editar"
                      }
                    </Button>
                    {
                      loan.aval_document && isFileOpen.doc && 
                      <Button
                        size="sm"
                        color="danger"
                        Icon={RiDeleteBin6Fill}
                        type="button"
                        onClick={() => setIsFileOpen((prev) => ({...prev, doc: false}))}
                      >
                        Cancelar
                      </Button>
                    }
                  </FlexRow>
                </Form>
              </FlexColumn>
            </FlexRow>
            <FlexRow>
              <FlexColumn style={{width: "100%"}}>
                <Text theme={theme}>Voucher</Text>
                <Form onSubmit={handleSubmit}>
                  {
                    !loan.voucher || isFileOpen.img
                    ? <Input
                        id="voucher"
                        name="voucher"
                        type="file"
                        bsSize="sm"
                        accept="image/png, image/jpg, image/jpeg"
                      />
                    : <a
                        href={loan.voucher}
                        target="_blank"
                      >
                        <Image 
                          src={loan.voucher}
                          alt="voucher"
                        />
                      </a>
                  }
                  <FlexRow
                     gap={0.5}
                     width="fit-content" 
                     justify="center" 
                     wrap="no-wrap"
                  >
                    <Button
                      size="sm"
                      color="primary"
                      Icon={!loan.voucher || isFileOpen.img ? MdOutlineFileUpload : FaEdit}
                      type={!loan.voucher || isFileOpen.img ? "submit" : "button"}
                      onClick={() => setIsFileOpen((prev) => ({...prev, img: true}))}
                    >
                      {
                        !loan.voucher || isFileOpen.img
                        ? isFileUploading.img
                          ? <>
                              <Spinner size="sm" />
                              {" "}
                              Subiendo...
                            </>
                          : "Subir"
                        : "Editar"
                      }
                    </Button>
                    {
                      loan.voucher && isFileOpen.img && 
                      <Button
                        size="sm"
                        color="danger"
                        Icon={RiDeleteBin6Fill}
                        type="button"
                        onClick={() => setIsFileOpen((prev) => ({...prev, img: false}))}
                      >
                        Cancelar
                      </Button>
                    }
                  </FlexRow>
                </Form>
              </FlexColumn>
            </FlexRow>
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
          </Info>
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
                Eliminar pŕestamo
              </Text>
            </ModalHeader>
            <ModalBody>
              <Text 
                theme={theme}
                size={17}
                color={COLORS.light.gray.bold}
              >
                ¿Estas segura de eliminar el pŕestamo?
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={toggleDelete}
              >
                Cancelar
              </Button>
              {" "}
              <Button
                color="danger"
                onClick={handleDelete}
                Icon={RiDeleteBin6Fill}
              >
                Eliminar
              </Button>
            </ModalFooter>
          </Modal>
          <Formik
            initialValues={initialValues}
            onSubmit={handleUpdate}
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
                isOpen={loanModal.isOpen}
                title="Editar préstamo"
                toggle={() => toggleUpdate(resetForm)}
                isValid={isValid}
                handleSubmit={handleSubmit}
                isToUpdate
              >
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
                <InputLabel 
                  id="account"
                  label="Cuenta"
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
              </ModalForm>
            )}
          </Formik>
        </FlexRow>
        <Pays />
      </>
  );
}

export default LoanDetail;
