import { expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import createMocker from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "../usePizzaOfTheDay";

const fetchMocker = createMocker(vi);
fetchMocker.enableMocks();

const testPizza = {
  id: "calabrese",
  name: "The Calabrese Pizza",
  category: "Supreme",
  description: "test description",
  image: "/public/pizzas/calabrese.webp",
  sizes: { S: 12.25, M: 16.25, L: 20.25 },
};

/* 
  Since hooks like usePizzaOfTheDay can only be used inside React components,
  this code defines a temporary TestComponent that calls the hook and stores its result in the 'pizza' variable.
  The TestComponent is rendered to trigger the hook, but it returns null because we don't care about rendering output.
  After rendering, the hook's return value (the "pizza of the day")
  is stored in 'pizza' and returned from the getPizzaOfTheDay function.

  function getPizzaOfTheDay() {
    let pizza;

    function TestComponent() {
      pizza = usePizzaOfTheDay();
      return null;
    }

    render(<TestComponent />);

    return pizza;
  }

  test("gives null when first called", async () => {
    fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
    const pizza = getPizzaOfTheDay();
    expect(pizza).toBeNull();
  }); 
*/

/* Allows you to render a hook within a test React component without having to create that component yourself. */
test("gives null when first called", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());
  expect(result.current).toBeNull();
});

test("to call the API and give back the pizza of the day", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());

  // waitFor => run this function continuously until it no longer throws an error
  await waitFor(() => {
    expect(result.current).toEqual(testPizza);
  });
  expect(fetchMocker).toBeCalledWith("/api/pizza-of-the-day");
});
