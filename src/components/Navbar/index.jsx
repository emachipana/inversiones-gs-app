import { useEffect, useState } from "react";
import { Alert, Badge, Container, FlexRow, Name, NotiItem, Notifications, Text } from "./styles";
import { RiExchangeDollarLine } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { COLORS } from "../../styles";
import { useNavigate } from "react-router-dom";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { useTheme } from "../../context/theme";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useData } from "../../context/data";
import capitalize from "../../helper/capitalize";

function Navbar({ isOpen, setIsOpen }) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, changeTheme } = useTheme();
  const { notifications, loans, payDays, setNotifications, backup } = useData();

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    let dataNoti = payDays.filter((pay) => !pay.isPaid);
    dataNoti = dataNoti.map((pay) => ({...pay, dateToPay: new Date(pay.dateToPay)}));
    dataNoti = dataNoti.filter((pay) => {
      return (
        pay.dateToPay.getDate() === today.getDate() && pay.dateToPay.getMonth() === today.getMonth() && pay.dateToPay.getFullYear() === today.getFullYear() ||
        pay.dateToPay.getDate() === tomorrow.getDate() && pay.dateToPay.getMonth() === tomorrow.getMonth() && pay.dateToPay.getFullYear() === tomorrow.getFullYear()  
      )
    });
    dataNoti = dataNoti.map((pay) => {
      let loan = backup.loans.pandero?.find((loan) => loan.id === pay.loan[0]);
      loan = loan ? loan : backup.loans.regular?.find((loan) => loan.id === pay.loan[0]);
      const date = new Date(pay.dateToPay);
      const isToday = today.getDate() === date.getDate();

      const isPandero = loan?.isPandero || false;
      if(isPandero) {
        let group = backup.loans.pandero.filter((value) => value.pandero_id === loan.pandero_id).sort((a, b) => a.pandero_position - b.pandero_position);
        let pays = payDays.filter((pay) => pay.loan[0] === loan.id);
        pays = pays.map((pay) => ({...pay, dateToPay: new Date(pay.dateToPay)})).sort((a, b) => a.dateToPay - b.dateToPay);
        group = group.map((value, index) => ({...value, pandero_date: pays[index]?.dateToPay, pay_id: pays[index]?.id}));
        const next_pay = group.find((value) => value.pay_id === pay.id);
        if(next_pay.isDelivered) return null;

        return {
          id: loan?.pandero_id,
          name: `${next_pay?.name} ${next_pay?.last_name}`,
          next_pay_date: next_pay?.pandero_date,
          next_pay_amount: group.length * pay.amount,
          isPandero: true,
          isToday
        };
      }

      return {
        id: loan?.id,
        name: `${loan?.name} ${loan?.last_name}`,
        next_pay_date: pay.dateToPay,
        next_pay_amount: pay.amount,
        isPandero: false,
        isToday
      };
    }).filter((value) => value !== null).sort((a, b) => a.next_pay_date - b.next_pay_date).filter((value) => value.id !== undefined);

    setNotifications(dataNoti);

  }, [loans, payDays, backup]);

  return (
    <Container theme={theme}>
      <FlexRow gap={1} theme={theme}>
        <HiOutlineBars3BottomLeft
          className="handle"
          onClick={() => setIsOpen(!isOpen)}
        />
        <FlexRow theme={theme} isLogo onClick={() => navigate("/")}>
          <RiExchangeDollarLine className="icon"/>
          <Name>Inversiones GS</Name>
        </FlexRow>
      </FlexRow>
      <FlexRow gap={2} theme={theme}>
        <Dropdown
          isOpen={dropDownOpen}
          toggle={() => setDropDownOpen(!dropDownOpen)}
          direction="down"
        >
          <DropdownToggle
            tag="span"
            style={{position: "relative", padding: "2px 0"}}
          > 
            { notifications.length > 0 && <Alert /> }
            <IoNotifications
              size={26}
              style={{ cursor: "pointer" }}
            />
          </DropdownToggle>
          <DropdownMenu
            end
            style={{ marginTop: "18px", width: "280px", maxHeight: "350px", overflow: "auto", backgroundColor: COLORS[theme].white}}
          >
            <Notifications>
              <Text 
                isTitle 
                weight={600}
                theme={theme}
                size={18}
              >
                Pagos pendientes
              </Text>
              {
                notifications.length <= 0
                ? <Text
                    theme={theme}
                    size={16}
                    weight={500}
                  >
                    Sin nada por ahora!
                  </Text>
                : notifications.map((noti, index) => (
                  <NotiItem 
                    key={index}
                    theme={theme}
                    onClick={() => navigate(`${noti.isPandero ? "pandero" : "prestamos"}/${noti.id}`)}
                  >
                    <Text
                      theme={theme}
                      size={17.5}
                      weight={500}
                      isTitle
                    >
                      {noti.isPandero ? "Pandero" : "Préstamo"}
                    </Text> 
                    <Text 
                      theme={theme} 
                      size={15}
                    >
                      { 
                        noti.isPandero
                        ? <>
                            <b>Beneficiario: </b>{capitalize(noti.name)}
                          </>
                        : capitalize(noti.name)
                      } 
                    </Text>
                    <FlexRow justify="space-between" theme={theme}>
                      <Badge
                        isToday={noti.isToday}
                      >
                        {
                          noti.isToday
                          ? "Hoy"
                          : "Mañana"
                        }
                      </Badge>
                      <Text theme={theme} size={15} color={COLORS[theme].primary}>S/. {noti.next_pay_amount}</Text>
                    </FlexRow>
                  </NotiItem>
              ))}
            </Notifications>
          </DropdownMenu>
        </Dropdown>
        {
          theme === "light"
          ? <MdLightMode 
              size={28}
              style={{ cursor: "pointer" }}
              onClick={changeTheme}
            />
          : <MdDarkMode 
              size={28}
              style={{ cursor: "pointer" }}
              onClick={changeTheme}
            />
        }
      </FlexRow>
    </Container>
  );
}

export default Navbar;
