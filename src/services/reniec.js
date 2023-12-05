import { RENIEC_BASE_URI, RENIEC_TOKEN } from "../config"

export const getInfo = async (dni) => {
  const response = await fetch(`${RENIEC_BASE_URI}/${dni}?token=${RENIEC_TOKEN}`);

  return await response.json();
}
