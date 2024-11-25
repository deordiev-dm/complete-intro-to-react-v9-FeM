import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import Order from "./Order";
import PizzaOfTheDay from "./PizzaOfTheDay";

const App = () => {
  return (
    <div>
      <h1 className="logo">Padre Gino's - Order Now</h1>
      <Order />
      <PizzaOfTheDay />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
