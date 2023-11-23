import styled from "@emotion/styled";
import { COLORS } from "../../styles";

export const Container = styled.div`
  width: 80%;
  max-height: 80vh;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: absolute;
  margin: auto;
  background-color: ${COLORS.primary};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media screen and (max-width: 1490px) {
    width: 90%;
  }

  @media screen and (max-width: 630px) {
    width: 95%;
  }
`;

export const Section = styled.section`
  width: 40%;
  height: 85%;
  background-color: white;
  border-top-right-radius: ${({ isImage }) => isImage ? "1rem" : 0};
  border-top-left-radius: ${({ isImage }) => isImage ? 0 : "1rem"};
  border-bottom-right-radius: ${({ isImage }) => isImage ? "1rem" : 0};
  border-bottom-left-radius: ${({ isImage }) => isImage ? 0 : "1rem"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: ${({ isImage }) => isImage ? 0 : "3rem"};
  overflow: hidden;

  @media screen and (max-width: 1240px) {
    width: 45%;
  }

  @media screen and (max-width: 1100px) {
    width: ${({ isImage }) => isImage ? "30%" : "50%"};
  }

  @media screen and (max-width: 900px) {
    display: ${({ isImage }) => isImage ? "none" : ""};
    border-radius: 1rem;
    width: 80%;
  }

  @media screen and (max-width: 610px) {
    width: 95%;
    padding: 1rem;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Title = styled.h1`
  font-size: ${({ size }) => size || 2}rem;
  font-weight: ${({ size }) => size < 1 ? 500 : 700};
  text-align: center;
  color: ${COLORS.primary};
`;

export const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  gap: 1.5rem;

  @media screen and (max-width: 1000px) {
    width: 100%;
  }

  @media screen and (max-width: 900px) {
    width: 80%;
  }

  @media screen and (max-width: 640px) {
    width: 100%;
  }
`;
