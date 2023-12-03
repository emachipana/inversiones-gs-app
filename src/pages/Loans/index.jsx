import { ClipLoader } from "react-spinners";
import Button from "../../components/Button";
import Search from "../../components/Search";
import { useData } from "../../context/data";
import { useTheme } from "../../context/theme";
import { COLORS, Title } from "../../styles";
import { Card, Container, FlexColumn, FlexRow, Name, Section, Text } from "./styles";
import { FaSquarePlus } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import capitalize from "../../helper/capitalize";
import { useNavigate } from "react-router-dom";

function Loans() {
  const { theme } = useTheme();
  const { loans, isLoading } = useData();
  const navigate = useNavigate();

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
            : loans.regular.map((loan, index) => (
                <Card
                    theme={theme}
                    key={index}
                    onClick={() => navigate(`/prestamos/${loan.id}`)}
                  >
                    <Name
                      theme={theme}
                    >
                      <Text
                        size={17}
                        theme={theme}
                      >
                        {`${loan.name} ${loan.last_name}`}
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
                          {`${loan.recovered}/${loan.receive_amount}`}
                        </Text>
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
    </>
  )
}

export default Loans;
