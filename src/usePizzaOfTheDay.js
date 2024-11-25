import { useState, useEffect } from "react";

export const usePizzaOfTheDay = () => {
  const [PizzaOfTheDay, setPizzaOfTheDay] = useState(null);

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      const res = await fetch("/api/pizza-of-the-day");
      const json = await res.json();
      setPizzaOfTheDay(json);
    }

    fetchPizzaOfTheDay();
  }, []);

  return PizzaOfTheDay;
};
