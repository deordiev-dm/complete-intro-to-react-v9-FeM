/* 
  Snapshot testing checks if a component's output (like its HTML) stays the same over time. 
  The first time you run the test, it saves the output as a "snapshot." 
  Later, it compares the current output to that snapshot. 
  If they match, the test passes. If they don't, the test fails, showing something changed. 
  If the change is correct, you can update the snapshot to reflect the new output. 
  It's useful for catching unexpected changes in your UI.
*/

import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";

test("snapshot with nothing in cart", () => {
  const { asFragment } = render(<Cart cart={[]} />);
  expect(asFragment()).toMatchSnapshot();
});

/* 
  `toMatchSnapshot` saves the output of a component or function in a separate snapshot file.
  When the test runs again, it compares the current output with the saved snapshot to check if anything changed.
  If it matches, the test passes; if not, it fails.

  `toMatchInlineSnapshot` works similarly but stores the snapshot directly in the test file instead of a separate file.
  This makes it easier to see and update small snapshots directly in the code.
*/
