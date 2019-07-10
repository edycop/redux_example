import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/courses/";

export function getCourses() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveCourse(course) {
  return fetch(baseUrl + (course.id || ""), {
    method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(course)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCourse(courseId) {
  return (
    fetch(baseUrl + courseId, { method: "DELETE" })
      // return fetch(baseUrl + 1000, { method: "DELETE" }) // test to delete a course withi id = 1000
      .then(handleResponse)
      .catch(handleError)
  );
}
