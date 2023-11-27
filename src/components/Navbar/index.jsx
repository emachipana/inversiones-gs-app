import { useState } from "react";
import { Alert, Badge, Container, FlexRow, Name, NotiItem, Notifications, Text } from "./styles";
import { RiExchangeDollarLine } from "react-icons/ri";
import { IoNotifications, IoClose } from "react-icons/io5";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { COLORS } from "../../styles";
import { useNavigate } from "react-router-dom";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";

function Navbar({ isOpen, setIsOpen }) {
  const [dropDownOpen, setDropDownOpen] = useState({
    noti: false,
    prof: false
  });
  const navigate = useNavigate();

  const toggle = (type) => {
    setDropDownOpen(prev => ({
      noti: type === "noti" ? !prev.noti : false,
      prof: type === "prof" ? !prev.prof : false
    }));
  }

  // fort testing
  const notifications = [
    {
      name: "Enmanuel Chipana Araujo",
      next_pay_date: "2023-11-24T15:37:24.544Z",
      next_pay_amount: 250
    },
    {
      name: "Nicer Nimer Jauregui Gerardini",
      next_pay_date: "2023-11-24T15:37:24.544Z",
      next_pay_amount: 250
    },
    {
      name: "Enmanuel Chipana Araujo",
      next_pay_date: "2023-11-24T15:37:24.544Z",
      next_pay_amount: 250
    },
    {
      name: "Enmanuel Chipana Araujo",
      next_pay_date: "2023-11-25T15:37:24.544Z",
      next_pay_amount: 250
    },
    {
      name: "Enmanuel Chipana Araujo",
      next_pay_date: "2023-11-25T15:37:24.544Z",
      next_pay_amount: 250
    },
    {
      name: "Enmanuel Chipana Araujo",
      next_pay_date: "2023-11-25T15:37:24.544Z",
      next_pay_amount: 250
    },
    {
      name: "Enmanuel Chipana Araujo",
      next_pay_date: "2023-11-25T15:37:24.544Z",
      next_pay_amount: 250
    }
  ];

  return (
    <Container>
      <FlexRow gap={1}>
        {
          isOpen
          ? <IoClose className="handle" />
          : <HiOutlineBars3BottomLeft className="handle" onClick={() => setIsOpen(!isOpen)} />
        }
        <FlexRow isLogo onClick={() => navigate("/")}>
          <RiExchangeDollarLine 
            size={32}
            style={{ marginTop: "-4px" }}
          />
          <Name>Inversiones GS</Name>
        </FlexRow>
      </FlexRow>
      <FlexRow gap={3}>
        <Dropdown
          isOpen={dropDownOpen.noti}
          toggle={() => toggle("noti")}
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
            style={{ marginTop: "18px", width: "230px", maxHeight: "350px", overflow: "auto"}}
          >
            <Notifications>
              <Text isTitle>Pagos pendientes</Text>
              {
                notifications.length <= 0
                ? "Sin nada por ahora!"
                : notifications.map((noti, index) => {
                    const date = new Date();
                    const isToday = date.getDate() === new Date(noti.next_pay_date).getDate();

                    return (
                      <NotiItem key={index} isToday={isToday}>
                        <Text size={15}> { noti.name } </Text>
                        <FlexRow justify="space-between">
                          <Badge
                            isToday={isToday}
                          >
                            {
                              isToday
                              ? "Hoy"
                              : "Mañana"
                            }
                          </Badge>
                          <Text size={15} color={COLORS.primary}>S/. {noti.next_pay_amount}</Text>
                        </FlexRow>
                      </NotiItem>
                    );
                  })
              }
            </Notifications>
          </DropdownMenu>
        </Dropdown>
      </FlexRow>
    </Container>
  );
}

export default Navbar;
