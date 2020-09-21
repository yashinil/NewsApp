import { SET_CATEGORY, 
  SET_QUERY, 
  SET_NEWS_SOURCE, 
  DISPLAY_BOOKMARK, 
  DISPLAY_DATA,
  DISPLAY_ERROR,
  SET_LOADING_STATE,
  CALL_DETAIL_CARD,
  ADD_TO_BOOKMARK,
  REMOVE_FROM_BOOKMARK,
  SET_MODAL_STATE
 } from './actions';

const initialState = {
  category: "home",
  query: "",
  source: "guardian",
  bookmark: false,
  listOfBookmarks: [],
  data: "",
  error: "",
  isLoaded: false,
  bigCard: [],
  bookmarkToRemove: "",
  isModalOpen: ""
}

export const displayDetails = ( state = initialState, action ) => {
  const { type, payload } = action;
  switch ( type ){
    case SET_CATEGORY: {
      return Object.assign({}, state, {category: payload});
    }
    case SET_QUERY: {
      return Object.assign({}, state, {query: payload});
    }
    case SET_NEWS_SOURCE: {
      return Object.assign({}, state, {source: payload});
    }
    case DISPLAY_BOOKMARK: {
      return Object.assign({}, state, {bookmark: payload});
    }
    case DISPLAY_DATA: {
      return Object.assign({}, state, {data: payload});
    }
    case DISPLAY_ERROR: {
      return Object.assign({}, state, {error: payload});
    }
    case SET_LOADING_STATE: {
      return Object.assign({}, state, {isLoaded: payload});
    }
    case CALL_DETAIL_CARD: {
      return Object.assign({}, state, {bigCard: payload});
    }
    case ADD_TO_BOOKMARK: {
      return Object.assign({}, state, {
        listOfBookmarks: [
          ...state.listOfBookmarks,
          payload
        ] 
      });
    }
    case REMOVE_FROM_BOOKMARK: {
      let result=[];
      for(let i=0;i < state.listOfBookmarks.length; i++){
        if(state.listOfBookmarks[i].bigcardUrl !== payload){
          result.push(state.listOfBookmarks[i]);
        }
      }
      return Object.assign({}, state, {listOfBookmarks: result});
    }
    case SET_MODAL_STATE:{
      return Object.assign({}, state, {isModalOpen: payload});
    }
    default: 
      return state;
  }
}
