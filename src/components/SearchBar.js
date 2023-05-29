import { useState } from "react";
import TextField from "@mui/material/TextField";

function SearchBar({ onSearchTermChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchTermChange(event.target.value);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={handleChange}
    />
  );
}

export default SearchBar;
