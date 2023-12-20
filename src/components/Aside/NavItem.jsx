import { useLocation, useNavigate } from "react-router-dom";
import { FlexRow, NavContainer } from "./styles";
import { IoIosArrowForward } from "react-icons/io";
import { useAuth } from "../../context/auth";
import { useTheme } from "../../context/theme";
import { useData } from "../../context/data";

function NavItem({ Icon, children, to, isToLogout, setIsOpen, active }) {
  const { pathname} = useLocation();
  const { logout } = useAuth();
  const { theme } = useTheme();
  const { setLoans, backup, isLoading } = useData();
  const navigate = useNavigate();

  const handleClick = () => {
    if(isLoading) return;
    navigate(to);
    setIsOpen(false);
    setLoans(backup.loans);

    if(isToLogout) logout();
  }

  return (
    <NavContainer 
      isActive={active || (!isToLogout && pathname === to)}
      onClick={handleClick}
      theme={theme}
    >
      <FlexRow>
        <Icon />
        { children }
      </FlexRow>
      { !isToLogout && <IoIosArrowForward /> }
    </NavContainer>
  );
}

export default NavItem;
