import { useState } from "react";
import { Alert, Badge, Container, FlexRow, Name, NotiItem, Notifications, Text } from "./styles";
import { RiExchangeDollarLine } from "react-icons/ri";
import { IoNotifications, IoClose } from "react-icons/io5";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { COLORS } from "../../styles";
import { useNavigate } from "react-router-dom";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { useTheme } from "../../context/theme";
import { MdLightMode, MdDarkMode } from "react-icons/md";

function Navbar({ isOpen, setIsOpen }) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, changeTheme } = useTheme();

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
            style={{ marginTop: "18px", width: "230px", maxHeight: "350px", overflow: "auto", backgroundColor: COLORS[theme].white}}
          >
            <Notifications>
              <Text isTitle theme={theme}>Pagos pendientes</Text>
              {
                notifications.length <= 0
                ? "Sin nada por ahora!"
                : notifications.map((noti, index) => {
                    const date = new Date();
                    const isToday = date.getDate() === new Date(noti.next_pay_date).getDate();

                    return (
                      <NotiItem key={index} isToday={isToday} theme={theme}>
                        <Text theme={theme} size={15}> { noti.name } </Text>
                        <FlexRow justify="space-between" theme={theme}>
                          <Badge
                            isToday={isToday}
                          >
                            {
                              isToday
                              ? "Hoy"
                              : "Mañana"
                            }
                          </Badge>
                          <Text theme={theme} size={15} color={COLORS[theme].primary}>S/. {noti.next_pay_amount}</Text>
                        </FlexRow>
                      </NotiItem>
                    );
                  })
              }
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
