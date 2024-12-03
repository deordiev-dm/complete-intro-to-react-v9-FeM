import { render, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "vitest";
import Pizza from "../Pizza";

/* 
  Screen is stateful and we need to clean after ourselves every time
  After each test, run cleanup function which unmounts React trees that were mounted with render.
  Why? testing-library/react doesn't know when each test ends. It not the same thing as vitest.
  Optionally it's possible to call cleanup() in the end of each test.
*/
afterEach(cleanup);

/* 
  test() defines a test case with a given name and test function.
  write descriptive test name!
*/
test("alt text renders on Pizza image", () => {
  const name = "My favorite pizza";

  /* 
    Lorem Picsum is a website that generates random images of different sizes and styles for web design. You can use it to add dummy photos to your layout, or to get specific images by ID, seed, or URL. 
  */
  const src = "https://picsum.photos/200";

  /* 
    The render() function in React Testing Library is used to render a React component into a virtual DOM (Document Object Model) so that you can interact with it and test its behavior, structure, and accessibility. It simulates the behavior of a React component within a testing environment, without actually rendering it in the browser.  
  */
  const screen = render(
    <Pizza name={name} description="super cool pizza" image={src} />,
  );

  const img = screen.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});

/* 
  The render() function returns an object containing various utility methods to query the DOM and interact with the 
  rendered component. This object is commonly referred to as screen (although you can name it anything) and provides 
  several methods, such as:

    getByRole(): Finds an element by its ARIA role (e.g., img for images).
    getByText(): Finds an element by its visible text content.
    getByLabelText(): Finds an element associated with a label (useful for form inputs).
    getByPlaceholderText(): Finds an element by its placeholder text (e.g., <input placeholder="Name" />).
    queryByRole(): Like getByRole() but returns null if the element isn't found, instead of throwing an error.
*/

test("to have default image if none is provided", () => {
  const screen = render(<Pizza name="pizza" description="super cool pizza" />);
  const img = screen.getByRole("img");
  expect(img.src).not.toBe("");
});
