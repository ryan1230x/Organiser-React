import * as constant from "./constants";
import axios from "axios";

const BASE_URL = "http://localhost/2020-organiser/api/snippet/";

export const getAllSnippetsForUser =  (username) => dispatch => {
  axios
    .get(`${BASE_URL}?username=${username}`)
    .then((res) =>
      dispatch({
        type: constant.GET_ALL_SNIPPETS_FOR_USER,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
}

export const addSnippetForUser = (snippet) => dispatch => {
  const config = {
    header: {
      "Content-Type":"application/json"
    }
  };
  axios
    .post(BASE_URL, snippet, config)
    .then((res) => 
      dispatch({
        type: constant.ADD_SNIPPET_FOR_USER,
        payload: res.data.data
      })
    )
    .catch((error) => console.error(error));
}

export const deleteSnippet = (snippetId) => dispatch => {
  const config = {
    header: {
      "Content-Type":"application/json"
    }
  };  
  axios
    .delete(`${BASE_URL}?id=${snippetId}`, config)
    .then((res) =>
      dispatch({
        type: constant.DELETE_SNIPPET,
        payload: snippetId
      })
    )
    .catch((error) => console.error(error));
};