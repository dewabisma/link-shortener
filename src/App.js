import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addAllShortenedUrl,
  selectShortenedUrl,
} from "./redux/shortenedLink/shortenedLinkSlice";

import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import UrlBox from "./components/UrlBox/UrlBox";
import Table from "./components/Table/Table";

function App() {
  const dispatch = useDispatch();

  const { status } = useSelector((state) => selectShortenedUrl(state));

  React.useEffect(() => {
    if (status === "idle") {
      const historyData = JSON.parse(window.localStorage.getItem("history"));
      if (historyData) dispatch(addAllShortenedUrl(historyData));
    }
  }, [status, dispatch]);

  return (
    <Container>
      <Header />
      <UrlBox />
      <Table />
    </Container>
  );
}

export default App;
