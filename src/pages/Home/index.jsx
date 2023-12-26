import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/auth";
import { useData } from "../../context/data";
import { useTheme } from "../../context/theme";
import { COLORS, Title } from "../../styles";
import { Card, FlexRow, Section, Text } from "./styles";
import { Table } from "reactstrap";
import capitalize from "../../helper/capitalize";

function Home() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { loans, isLoading, payDays } = useData();
  const navigate = useNavigate();

  // loans
  const paid = loans.regular?.filter((loan) => loan.isPaid).length;
  const pending = loans.regular?.filter((loan) => !loan.isPaid).length;

  // pandero
  const pandero = loans.pandero && Object.values(loans.pandero?.reduce((a, loan) => {
    const id = loan.pandero_id;
    if(!a[id]) a[id] = [];
    a[id].push(loan);
    return a;
  }, {}));

  const pandero_data = pandero?.map((group) => {
    const isDelivered = group.filter((loan) => loan.isDelivered);
    if (isDelivered.length === group.length) {
      return "finished";
    }else {
      return "pending";
    }
  });

  const data = {
    pending: pandero_data?.filter((data) => data === "pending").length,
    finished: pandero_data?.filter((data) => data === "finished").length
  };

  // overdue loan
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let over_data = loans.regular?.map((loan) => ({...loan, finish_date: new Date(loan.finish_date)}));
  over_data = over_data.filter((loan) => !loan.isPaid);
  over_data = over_data.filter((loan) => loan.finish_date < today).length;

  // clients
  let pending_clients = loans.regular?.filter((loan) => !loan.isPaid);
  pending_clients = pending_clients.map((loan) => {
    let pays = payDays.filter((pay) => pay.loan[0] === loan.id);
    pays = pays.filter((pay) => !pay.isPaid);
    pays = pays.map((pay) => ({...pay, dateToPay: new Date(pay.dateToPay)}));
    pays = pays.sort((a, b) => a.dateToPay - b.dateToPay);

    return {
      id: loan.id,
      name: `${loan.name} ${loan.last_name}`,
      phone: loan.phone,
      recovered: loan.recovered,
      next_pay_date: pays[0]?.dateToPay,
			next_pay_amount: pays[0]?.amount,
			receive_amount: loan.receive_amount
    };
  });
  return (
    isLoading
    ? <Loader />
    : <>
        <Title theme={theme}>Inicio</Title>
        <FlexRow>
          <Card
            onClick={() => navigate("/perfil")}
          >
            <Text>Balance</Text>
            <Text
              size={16}
              weight={500}
            >
              <b>Capital:</b> S/. {user.capital}
            </Text>
            <Text
              size={16}
              weight={500}
            >
              <b>Recuperado:</b> S/. {parseFloat(user.recovered.toFixed(1))}
            </Text>
          </Card>
          <Card
            onClick={() => navigate("/prestamos")}
            color="yellow"
          >
            <Text>Préstamos</Text>
            <Text
              size={16}
              weight={500}
            >
              <b>Pendientes:</b> {pending}
            </Text>
            <Text
              size={16}
              weight={500}
            >
              <b>Pagados:</b> {paid}
            </Text>
          </Card>
          <Card
            onClick={() => navigate("/pandero")}
            color="red"
          >
            <Text>Pandero</Text>
            <Text
              size={16}
              weight={500}
            >
              <b>Jugando:</b> {data.pending}
            </Text>
            <Text
              size={16}
              weight={500}
            >
              <b>Finalizado:</b> {data.finished}
            </Text>
          </Card>
          <Card
            onClick={() => navigate("/refinanciamiento")}
            color="green"
          >
            <Text>Refinanciamiento</Text>
            <Text
              size={16}
              weight={500}
            >
              <b>Aptos:</b> {over_data}
            </Text>
          </Card>
        </FlexRow>
        <Section>
          <Title 
            theme={theme}
            style={{alignSelf: "center"}}
          >
            Clientes
          </Title>
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
                    weight={600}
                    size={17}
                    color={COLORS[theme].primary}
                  >
                    N°
                  </Text>
                </th>
                <th>
                  <Text
                    weight={600}
                    size={17}
                    color={COLORS[theme].primary}
                  >
                    Nombres
                  </Text>
                </th>
                <th>
                  <Text
                    weight={600}
                    size={17}
                    color={COLORS[theme].primary}
                  >
                    Teléfono
                  </Text>
                </th>
                <th>
                  <Text
                    weight={600}
                    size={17}
                    color={COLORS[theme].primary}
                  >
                    Recuperado
                  </Text>
                </th>
                <th>
                  <Text
                    weight={600}
                    size={17}
                    color={COLORS[theme].primary}
                  >
                    Próximo pago
                  </Text>
                </th>
                <th>
                  <Text
                    weight={600}
                    size={17}
                    color={COLORS[theme].primary}
                  >
                    Monto
                  </Text>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                pending_clients.map((client, index) => (
                  <tr
                    key={index}
                    onClick={() => navigate(`/prestamos/${client.id}`)}
                    style={{cursor: "pointer"}}
                  >
                    <td>
                      <Text
                        weight={500}
                        size={16}
                        color={COLORS[theme].gray.bold}
                      >
                        {index + 1}
                      </Text>
                    </td>
                    <td>
                      <Text
                        weight={500}
                        size={16}
                        color={COLORS[theme].gray.bold}
                        style={{minWidth: "170px"}}
                      >
                        {capitalize(client.name)}
                      </Text>
                    </td>
                    <td>
                      <Text
                        weight={500}
                        size={16}
                        color={COLORS[theme].gray.bold}
                        style={{minWidth: "110px"}}
                      >
                        +51 {client.phone}
                      </Text>
                    </td>
                    <td>
                      <Text
                        weight={500}
                        size={16}
                        color={COLORS[theme].gray.bold}
                        style={{minWidth: "110px"}}
                      >
                        S/. {`${parseFloat(client.recovered?.toFixed(1))} / ${parseFloat(client.receive_amount?.toFixed(1))}`}
                      </Text>
                    </td>
                    <td>
                      <Text
                        weight={500}
                        size={16}
                        color={COLORS[theme].gray.bold}
                        style={{minWidth: "190px"}}
                      >
                        {capitalize(client.next_pay_date?.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}
                      </Text>
                    </td>
                    <td>
                      <Text
                        weight={500}
                        size={16}
                        color={COLORS[theme].gray.bold}
                        style={{minWidth: "80px"}}
                      >
                        S/. {parseFloat(client.next_pay_amount?.toFixed(1))}
                      </Text>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Section>
      </>
  );
}

export default Home;
