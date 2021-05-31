import { getStories } from "REST/story";

export const FETCH_STORIES_LOADING = "FETCH_STORIES_LOADING";
export const FETCH_STORIES_ERROR = "FETCH_STORIES_ERROR";
export const FETCH_STORIES_SUCCESS = "FETCH_STORIES_SUCCESS";

export const fetchStories = (slug: string) => async (dispatch, getState) => {
  dispatch({ type: FETCH_STORIES_LOADING });
  try {
    let stories = await getStories();
    dispatch({
      type: FETCH_STORIES_SUCCESS,
      payload: {
        stories
      },
    });
  } catch {
    dispatch({
      type: FETCH_STORIES_ERROR,
    });
  }
};
