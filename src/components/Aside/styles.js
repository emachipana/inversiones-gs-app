import styled from "@emotion/styled";
import { COLORS } from "../../styles";

export const Container = styled.aside`
  height: 90.35vh;
  width: 300px;
  background-color: ${({ theme }) => COLORS[theme].white};
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, .2);
  z-index: 49;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  transition: .3s ease-in;
  position: sticky;
  top: 9.65vh;

  @media screen and (max-width: 800px){
    top: 0;
    position: fixed;
    width: 270px;
    padding: 2rem 0.8rem;
    height: 100vh;
    left: ${({ isOpen }) => isOpen ? 0 : "-270px"};
    z-index: 52;
  }
`;

export const NavContainer = styled.div`
  width: 100%;
  padding: 0.6rem 1rem;
  display: flex;
  border-radius: 1rem;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ isActive, theme }) => isActive ? COLORS[theme].primary : COLORS[theme].white};
  color: ${({ isActive, theme }) => isActive ? COLORS[theme].white : COLORS[theme].gray.bold};
  transition: .3s ease-in;
  cursor: pointer;
  font-size: 17px;

  &:hover {
    color: ${({ theme }) => COLORS[theme].white};
    background-color: ${({ theme }) => COLORS[theme].primary};
  }
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const BackDrop = styled.div`
  position: fixed;
  z-index: 51;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  cursor: pointer;
`;
