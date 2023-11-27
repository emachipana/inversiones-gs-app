import { useLocation, useNavigate } from "react-router-dom";
import { FlexRow, NavContainer } from "./styles";
import { IoIosArrowForward } from "react-icons/io";
import { useAuth } from "../../context/auth";

function NavItem({ Icon, children, to, isToLogout, setIsOpen }) {
  const { pathname} = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
    setIsOpen(isOpen => !isOpen);

    if(isToLogout) logout();
  }

  return (
    <NavContainer 
      isActive={!isToLogout && pathname === to}
      onClick={handleClick}
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
