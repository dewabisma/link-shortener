import * as React from "react";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import UrlBox from "./components/UrlBox/UrlBox";
import Table from "./components/Table/Table";

function App() {
  return (
    <Container>
      <Header />
      <UrlBox />
      <Table />
    </Container>
  );
}

export default App;
