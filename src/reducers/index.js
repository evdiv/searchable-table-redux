import {ADD_COMMENT, DELETE_COMMENT, SORT_COMMENTS, FETCH_COMMENTS} from "../constants";

const comment = (action) => {

  return {
    id: Math.random(),
    name: action.name,
    email: action.email,
    body: action.body
  }
}


const removeById = (state =[], id) => {
  const comments = state.filter(comment => comment.id !== id);
  return comments;
}


const sortByField = (state =[], field, order) => {
  const comments = state.slice();

  comments.sort((a, b) => {

    if(a[field] < b[field]) {
      return (order == 'asc') ? -1 : 1;
    }
    if(a[field] > b[field]) {
      return (order == 'asc') ? 1 : -1;
    }
    return 0;
  });

  return comments;
}

const comments = (state = [], action) => {
  let comments = null;
  switch (action.type) {

    case FETCH_COMMENTS:
      comments = action.comments;
      return comments;

    case ADD_COMMENT:
      comments = [ comment(action), ...state];
      return comments;


    case DELETE_COMMENT:
      comments = removeById(state, action.id);
      return comments;


    case SORT_COMMENTS:
      comments = sortByField(state, action.field, action.order);
      return comments;


    default:
      return state;
  }
}

export default comments;
