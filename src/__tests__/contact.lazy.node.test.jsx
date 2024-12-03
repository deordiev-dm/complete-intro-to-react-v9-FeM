import { expect, test, vi } from "vitest";
import createMocker from "vitest-fetch-mock";
import { render } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy";

const queryClient = new QueryClient();

/* 
  vi is the name of the spy library inside of the vitest

  createFetchMock is a utility often used in testing environments to mock the behavior of the native fetch API. 
  It allows developers to simulate different responses and behaviors for network requests, making it easier to test 
  how an application handles various API responses without making actual network calls.
  
  It monkey patches fetch to be testable.
  We can use it to see what fetch was called with, whether it did call the right API, etc.
*/

const fetchMocker = createMocker(vi);
fetchMocker.enableMocks();

test("can submit contact form", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify({ status: "ok" }));
  const screen = render(
    <QueryClientProvider client={queryClient}>
      {/* take only the component, without TanStack specifics */}
      <Route.options.component></Route.options.component>
    </QueryClientProvider>,
  );

  // Those are like handles on our input
  const nameInput = screen.getByPlaceholderText("Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const msgTextArea = screen.getByPlaceholderText("Message");

  const testData = {
    name: "Joe",
    email: "joe@example.com",
    message: "test message",
  };

  nameInput.value = testData.name;
  emailInput.value = testData.email;
  msgTextArea.value = testData.message;

  const btn = screen.getByRole("button");
  btn.click(); // will submit the form

  // The h3 should appear after the form is submitted, which is why we use await.
  const h3 = await screen.findByRole("heading", { level: 3 });

  // We use toContain instead of toBe because toBe checks for an exact match,
  // whereas toContain checks if the string contains the specified substring.
  // For example, if the <h3> element's innerText is "Form Submitted!",
  // toBe("Submitted") would fail, but toContain("Submitted") will pass.
  expect(h3.innerText).toContain("Submitted");

  // Verifies that one request was made to "/api/contact" with the correct POST method, headers, and body.
  const requests = fetchMocker.requests();
  expect(requests.length === 1);
  expect(requests[0].url).toBe("/api/contact");
  expect(fetchMocker).toHaveBeenCalledWith("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(testData),
  });
});
