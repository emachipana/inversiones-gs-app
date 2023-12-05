import { useState } from "react";
import { useTheme } from "../../context/theme";
import { Container, Input } from "./styles";
import { IoSearchSharp } from "react-icons/io5";
import { useData } from "../../context/data";

function Search() {
  const { theme } = useTheme();
  const [value, setValue] = useState("");
  const { searchLoan } = useData();

  const handleChange = (item) => {
    setValue(item.target.value);
    searchLoan(item.target.value);
  }

  return (
    <Container theme={theme}>
      <IoSearchSharp size={25} />
      <Input 
        id="search"
        name="search"
        theme={theme}
        placeholder="Buscar..."
        value={value}
        onChange={handleChange}
      />
    </Container>
  )
}

export default Search;
