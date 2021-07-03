import { groupBy, keyBy } from "lodash";
import { SearchStoryParams } from "REST/story";
import {
  FETCH_AUTHORS_SUCCESS,
  FETCH_STORIES_INCREMENTAL_SUCCESS,
  FETCH_STORIES_INITIAL_SUCCESS,
} from "../../actions/story/storyList";
import {
  WP_REST_API_Tags,
  WP_REST_API_Posts,
  WP_REST_API_Tag,
  WP_REST_API_Term,
  WP_REST_API_User,
} from "wp-types";
import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_TAGS_SUCCESS,
} from "../../actions/story/storyList";
import { FETCH_STORIES_LOADING, FETCH_STORIES_LOADING_INITIAL, FETCH_STORIES_ERROR } from '../../actions/story/storyList';

type EnchancedWPRestAPIUser = WP_REST_API_User & {full_name: string}

export interface StoryListState {
  status: typeof FETCH_STORIES_LOADING | typeof FETCH_STORIES_INCREMENTAL_SUCCESS | typeof FETCH_STORIES_INITIAL_SUCCESS | typeof FETCH_STORIES_ERROR;
  stories: WP_REST_API_Posts;
  totalStoriesInDatabase: number;
  query: SearchStoryParams | null;
  parentToChildCategory: (WP_REST_API_Term & {
    categories: WP_REST_API_Term[];
  })[];
  categoryById: { string: WP_REST_API_Term } | {};
  tags: WP_REST_API_Tags;
  tagById: { string: WP_REST_API_Tag } | {};
  authors: EnchancedWPRestAPIUser[];
  authorById: { string: EnchancedWPRestAPIUser } | {};
  hasMore: boolean;
}

const initialState: StoryListState = {
  status: FETCH_STORIES_LOADING,
  totalStoriesInDatabase: 0,
  stories: [],
  query: null,
  parentToChildCategory: [],
  categoryById: {},
  tags: [],
  tagById: {},
  authors: [],
  authorById: {},
  hasMore: true,
};

export default (
  state: StoryListState = initialState,
  action
): StoryListState => {
  if (state === undefined) {
    state = initialState;
  }
  switch (action.type) {
    case FETCH_STORIES_LOADING_INITIAL:
      return {
        ...state,
        stories: [],
        status: FETCH_STORIES_LOADING,
        hasMore: true,
      }
    case FETCH_STORIES_LOADING:
      return {
        ...state,
        status: FETCH_STORIES_LOADING,
      };

    case FETCH_STORIES_INITIAL_SUCCESS:
      return {
        ...state,
        status: FETCH_STORIES_INITIAL_SUCCESS,
        stories: action.payload.stories,
        totalStoriesInDatabase: action.payload.totalStoriesInDatabase,
        hasMore: action.payload.hasMore,
      };

    case FETCH_STORIES_INCREMENTAL_SUCCESS:
      return {
        ...state,
        status: FETCH_STORIES_INCREMENTAL_SUCCESS,
        stories: [...state.stories, ...action.payload.stories],
        totalStoriesInDatabase: action.payload.totalStoriesInDatabase,
        hasMore: action.payload.hasMore,
      };

      case FETCH_STORIES_ERROR:
      return {
        ...state,
        hasMore: false,
        status: FETCH_STORIES_ERROR,
      };

    case FETCH_CATEGORIES_SUCCESS:
      let { categories } = action.payload;
      let categoriesByParentId = groupBy(
        categories,
        (category) => category.parent
      );
      let parentCategories = categoriesByParentId[0];
      let parentToChildCategory = parentCategories.map((parentCategory) => ({
        ...parentCategory,
        categories: categoriesByParentId[parentCategory.id] || [],
      }));
      let categoryById = keyBy(categories, (category) => category.id);
      return {
        ...state,
        parentToChildCategory,
        categoryById,
      };

    case FETCH_TAGS_SUCCESS:
      let { tags } = action.payload;
      return {
        ...state,
        tags,
        tagById: keyBy(tags, (tag) => tag.id),
      };

    case FETCH_AUTHORS_SUCCESS:
      let { authors } = action.payload;
      return {
        ...state,
        authors,
        authorById: keyBy(authors, (author) => author.id),
      };
    default:
      return state;
  }
};
