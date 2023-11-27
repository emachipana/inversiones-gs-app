import styled from "@emotion/styled";
import { COLORS } from "../../styles";
import { css } from "@emotion/react";

export const Container = styled.div`
  width: 100%;
  height: 9.65vh;
  padding: 0.6rem 3rem;
  background-color: ${COLORS.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: 1 / 1 / 2 / 3;
  z-index: 50;

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
  color: white;
  cursor: ${({ isLogo }) => isLogo ? "pointer" : ""};
`;

export const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
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
  gap: 2px;
  border-left: 6px solid ${COLORS.primary};
  padding: 2px 6px 4px 6px;
  cursor: pointer;
  transition: .3s ease-in;

  &:hover {
    background-color: rgba(80, 70, 229, .1);
  }
`;

export const Text = styled.h3`
  font-size: ${({ size }) => size || 17}px;
  color: ${({ isTitle, color }) => color || (isTitle ? COLORS.primary : COLORS.gray.bold)};
  white-space: nowrap;
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
