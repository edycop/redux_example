import React from "react";
import { mount } from "enzyme";
import { authors, newCourse, courses } from "../../../tools/mockData";
// UPDATE: instead import the default "connect export" we use the named export
// import ManageCoursePage from "./ManageCoursePage";
import { ManageCoursePage } from "./ManageCoursePage";

// factory function
function render(args) {
  const defaultProps = {
    authors: authors,
    courses,
    // Passed from React Router in real app, so just stubbing in for test.
    // Could also choose to use MemoryRouter as shown in Header.test.js,
    // or even wrap with React Router, depending on whether I
    // need to test React Router related behavior.
    history: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {}
  };

  const props = { ...defaultProps, ...args };

  return mount(<ManageCoursePage {...props} />);
}

it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit"); // simulate a click over button
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is required.");
});
