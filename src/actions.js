export const SET_CATEGORY = 'SET_CATEGORY';
export const setCategory = category => ({
  type: SET_CATEGORY,
  payload: { category },
});

export const SET_QUERY = 'SET_QUERY';
export const setQuery = query => ({
  type: SET_QUERY,
  payload: { query },
});

export const SET_NEWS_SOURCE = 'SET_NEWS_SOURCE';
export const setNewsSource = source => ({
  type: SET_NEWS_SOURCE,
  payload: { source },
});

export const DISPLAY_BOOKMARK = 'DISPLAY_BOOKMARK';
export const displayBookmark = bookmark => ({
  type: DISPLAY_BOOKMARK,
  payload: { bookmark },
}); 

export const DISPLAY_DATA = 'DISPLAY_DATA';
export const displayData = data => ({
  type: DISPLAY_DATA,
  payload: { data },
}); 

export const DISPLAY_ERROR = 'DISPLAY_ERROR';
export const displayError = error => ({
  type: DISPLAY_ERROR,
  payload: { error },
}); 

export const SET_LOADING_STATE = 'SET_LOADING_STATE';
export const setLoadingState = isLoaded => ({
  type: SET_LOADING_STATE,
  payload: { isLoaded },
}); 

export const CALL_DETAIL_CARD = 'CALL_DETAIL_CARD';
export const callDetailCard = bigCard => ({
  type: CALL_DETAIL_CARD,
  payload: { bigCard },
}); 

export const ADD_TO_BOOKMARK = 'ADD_TO_BOOKMARK';
export const addToBookmark = listOfBookmarks => ({
  type: ADD_TO_BOOKMARK,
  payload: { listOfBookmarks },
}); 

export const REMOVE_FROM_BOOKMARK = 'REMOVE_FROM_BOOKMARK';
export const removeFromBookmark = bookmarkToRemove => ({
  type: REMOVE_FROM_BOOKMARK,
  payload: { bookmarkToRemove },
}); 

export const SET_MODAL_STATE = 'SET_MODAL_STATE';
export const setModalState = isModalOpen => ({
  type: SET_MODAL_STATE,
  payload: { isModalOpen },
}); 