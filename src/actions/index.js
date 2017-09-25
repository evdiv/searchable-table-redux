import {ADD_COMMENT, DELETE_COMMENT, SORT_COMMENTS, FETCH_COMMENTS} from '../constants';

export const addComment = (comment) => {
  const action = {
    type: ADD_COMMENT,
    name: comment.name,
    email: comment.email,
    body: comment.body
  }
  return action;
}


export const deleteComment = (id) => {
  const action = {
    type: DELETE_COMMENT,
    id
  }
  return action;
}


export const sortComments = (field, order) => {
  const action = {
    type: SORT_COMMENTS,
    field,
    order
  }
  return action;
}


export const fetchComments = (comments) => {
  const action = {
    type: FETCH_COMMENTS,
    comments
  }
  return action;
}
