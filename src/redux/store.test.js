import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as courseActions from "./actions/courseActions";

it("Should handle creating course", () => {
  // arrange
  // WE CREATE A STORE
  const store = createStore(rootReducer, initialState);
  // const course = {
  //   title: "Cleann Code"
  // };
  const newCourses = [
    {
      title: "Clean Code"
    },
    {
      title: "Clean arquitecture"
    }
  ];
  // console.log(store.getState());

  // act
  // WE GET createCourseSuccess ACTION
  // AND DISPATCH IT (reducer)
  // const action = courseActions.createCourseSuccess(course);
  const action = courseActions.createCourseSuccess(newCourses);
  // console.log(action);
  store.dispatch(action);

  //assert
  // WE GET THE COURSE FROM THE STORE
  console.log(store.getState());
  const createdCourse = store.getState().courses;
  expect(createdCourse[0]["0"]).toEqual(newCourses[0]);
  expect(createdCourse[0]["1"]).toEqual(newCourses[1]);
});
