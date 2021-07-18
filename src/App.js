import * as React from "react";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import SearchBox from "./components/SearchBox/SearchBox";
import Table from "./components/Table/Table";

function App() {
  return (
    <Container>
      <Header />
      <SearchBox />
      <Table />
    </Container>
  );
}

export default App;
