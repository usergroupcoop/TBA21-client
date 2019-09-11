import { API } from 'aws-amplify';
import { getCDNObject } from '../components/utils/s3File';

// Defining our Actions for the reducers.
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const SEARCH_RESULTS = 'SEARCH_RESULTS';
export const SEARCH_LOADING = 'SEARCH_LOADING';

export interface CriteriaOption {
  label: string;
  value: string;
  field: string;
}

export const changeView = (view: 'grid' | 'list') => dispatch => {
  dispatch({
     type: CHANGE_VIEW,
     view: view
   });
};

export const search = (criteria: CriteriaOption[], focusArts: boolean = false, focusAction: boolean = false, focusScitech: boolean = false) => async dispatch => {
  if (criteria && criteria.length) {
    const
      results: any = [],  // tslint:disable-line: no-any
      state = {
        type: SEARCH_RESULTS,
        loading: false
      };

    dispatch({
       type: SEARCH_LOADING,
       loading: true
     });

    try {
      const response = await API.post('tba21', 'pages/search', {
        body: {
          criteria: criteria.map(e => ({'field': e.field, 'value': e.value})),
          limit: 50,
          focus_arts: focusArts,
          focus_action: focusAction,
          focus_scitech: focusScitech
        }
      });

      for (let i = 0; i < response.results.length ; i++) {
        const result = response.results[i];

        if (result.s3_key) {
          if (Array.isArray(result.s3_key) && result.s3_key.length > 0) {
            if (result.s3_key[0]) {
              result.file = await getCDNObject(result.s3_key[0]);
            }
          } else {
            result.file = await getCDNObject(result.s3_key);
          }

          results.push(result);
        } else if (result.full_name) { // Profile
          results.push(result);
        }
      }
    } catch (e) {
      return;
    } finally {
      Object.assign(state, { results });
      dispatch(state);
    }
  }
};
