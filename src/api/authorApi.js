import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authors/";

export function getAuthors() {
  return fetch(baseUrl) // GET HTTP verb
    .then(handleResponse) // asyn promise
    .catch(handleError);
}
