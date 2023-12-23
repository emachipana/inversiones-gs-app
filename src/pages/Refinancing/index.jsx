import { ClipLoader } from "react-spinners";
import { useData } from "../../context/data";
import { useTheme } from "../../context/theme";
import { COLORS, Title } from "../../styles";
import { Card, FlexColumn, FlexRow, Name, Section, Text } from "../Loans/styles";
import capitalize from "../../helper/capitalize";
import { FaWhatsapp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Refinancing() {
  const { theme } = useTheme();
  const { loans, isLoading } = useData();
  const navigate = useNavigate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let over_data = loans.regular?.map((loan) => ({...loan, finish_date: new Date(loan.finish_date)}));
  over_data = over_data.filter((loan) => !loan.isPaid);
  over_data = over_data.filter((loan) => loan.finish_date < today);
  
  return (
    <>
      <Title theme={theme}>Aptos para refinanciamiento</Title>
      <Section
        isLoading={isLoading}
        align="start"
      >
        {
          isLoading
          ? <ClipLoader
              color={COLORS[theme].primary}
              size={60}
            />
          : over_data.map((loan, index) => (
            <Card
              theme={theme}
              key={index}
              onClick={() => navigate(`/refinanciamiento/${loan.id}`)}
            >
              <Name
                theme={theme}
              >
                <Text
                  size={17}
                  theme={theme}
                >
                  {`${capitalize(loan.name)} ${capitalize(loan.last_name)}`}
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
                    {parseFloat(loan.recovered.toFixed(2))} / {parseFloat(loan.receive_amount.toFixed(2))}
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
    </>
  )
}

export default Refinancing;
