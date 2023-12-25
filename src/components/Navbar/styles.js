import styled from "@emotion/styled";
import { COLORS } from "../../styles";
import { css } from "@emotion/react";

export const Container = styled.div`
  width: 100%;
  height: 9.65vh;
  padding: 0.6rem 3rem;
  background-color: ${({ theme }) => COLORS[theme].primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: 1 / 1 / 2 / 3;
  z-index: 50;
  position: sticky;
  top: 0;

  @media screen and (max-width: 800px) {
    padding: 0.6rem 1rem;
  }

  .handle {
    display: none;
    font-size: 1.6rem;
    cursor: pointer;

    @media screen and (max-width: 800px) {
      display: block;
    }
  }
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify || "center"};
  gap: ${({ gap }) => gap || 0.5}rem;
  color: ${({ theme }) => COLORS[theme].white};
  cursor: ${({ isLogo }) => isLogo ? "pointer" : ""};

  .icon {
    font-size: 2rem;
    margin-top: 4px;

    @media screen and (max-width: 450px) {
      font-size: 1.5rem;
      margin: 0;
    }
  }
`;

export const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 450px) {
    font-size: 1.3rem;
  }
`;

export const Profile = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

export const Alert = styled.div`
  position: absolute;
  top: 0;
  right: 3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: red;
`;

export const Notifications = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

export const NotiItem = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  border-left: 6px solid ${({ theme }) => COLORS[theme].primary};
  padding: 0 6px;
  cursor: pointer;
  transition: .3s ease-in;

  &:hover {
    background-color: rgba(80, 70, 229, .1);
  }
`;

export const Text = styled.h3`
  font-size: ${({ size }) => size || 17}px;
  font-weight: ${({ weight }) => weight || 400};
  color: ${({ isTitle, color, theme }) => color || (isTitle ? COLORS[theme].primary : COLORS[theme].gray.bold)};
`;

export const Badge = styled.div`
  padding: 2px 6px;
  color: white;
  border-radius: 6px;
  background-color: ${({ isToday }) => isToday ? "#FF9209" : "#9FBB73"};
  font-weight: 600;
  font-size: 13px;
`;

export const NavItemStyles = css`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.8rem;
  font-weight: 500;
  font-size: 17px;
`;
