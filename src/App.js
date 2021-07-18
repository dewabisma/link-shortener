import React from "react";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import SearchBox from "./components/SearchBox/SearchBox";

function App() {
  return (
    <Container>
      <Header />
      <SearchBox />
    </Container>
  );
}

export default App;
