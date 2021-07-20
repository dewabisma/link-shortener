import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

test("Render UI Completely", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const header = screen.getByText("Shooooort");
  expect(header).toBeInTheDocument();

  const table = screen.getByText("Previously shortened by you");
  expect(table).toBeInTheDocument();
});
