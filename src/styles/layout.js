import styled from "@emotion/styled";
import { COLORS } from "./colors";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 9.65vh 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  @media screen and (max-width: 800px) {
    display: block;
  }
`;

export const Section = styled.section`
  min-height: 90.35vh;
  width: 100%;
  padding: 1.5rem 1.5rem 0 1.5rem;
  background-color: ${({ theme }) => COLORS[theme].secondary};
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 1rem;
  position: relative;

  @media screen and (max-width: 800px) {
    justify-content: start;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => COLORS[theme].gray.bold};
`;
