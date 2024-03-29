import { css } from "@emotion/react";
import { FONT } from "./font";

export const RESET = css`
  @import url('https://fonts.googleapis.com/css2?family=REM:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  * {
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  p {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${FONT.primary};
    font-size: 1rem;
  }

  // styling scrollbar

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: #808080;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #B3B3B3;
  }
`;
