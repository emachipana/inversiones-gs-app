import styled from "@emotion/styled";

export const FlexRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 1rem 0 3rem 0;

  @media screen and (max-width: 1320px) {
    gap: 2rem;
    justify-content: center;
  }
`;

export const Card = styled.div`
  width: 240px;
  height: 140px;
  padding: 1rem 0.8rem;
  border-radius: 1rem;
  background-image: linear-gradient(to right top, ${({ color }) => color === "yellow" ? "#bc9d23, #cbae39, #dabf4d, #e9d061, #f8e174" : (color === "red" ? "#ee6f97, #e9628b, #e4547e, #de4572, #d83465" : (color === "green" ? "#82daac, #75d1a0, #68c995, #5bc089, #4eb87d" : "#827bec, #756de5, #675edd, #5950d6, #4a41ce"))});
  cursor: pointer;
  transition: .2s ease-in-out;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, .2);
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 0.5rem;
  overflow: hidden;

  &:hover {
    transform: scale(1.03);
  }

  @media screen and (max-width: 550px) {
    width: 300px;
  }
`;

export const Text = styled.p`
  font-size: ${({ size }) => size || 24}px;
  font-weight: ${({ weight }) => weight || 700};
  color: ${({ color }) => color || "white"};
`;

export const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 43vh;
  justify-content: start;
  gap: 1rem;
`;
