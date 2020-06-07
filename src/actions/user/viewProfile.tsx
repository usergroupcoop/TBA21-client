import { API } from 'aws-amplify';
import {
  FETCH_PROFILE,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_ERROR_NO_SUCH_PROFILE,
  FETCH_PROFILE_ITEMS_LOADING,
  FETCH_PROFILE_ITEMS_SUCCEED,
  FETCH_PROFILE_ITEMS_ERROR,
  FETCH_PROFILE_COLLECTIONS_SUCCEED
} from '../../reducers/user/viewProfile';
import { LOADINGOVERLAY } from '../loadingOverlay';
import { getItems } from '../../REST/items';
import { removeTopology } from '../../components/utils/removeTopology';
import { addFilesToData } from 'actions/home';
import { Item } from 'types/Item';
import { getCollections } from 'REST/collections';
import { getItemsAndCollectionsForCollection } from 'components/utils/DetailPreview';
import { Collection } from 'types/Collection';
import { HomepageData } from '../../reducers/home';
/**
 *
 * API call to fetch profile information based on the profileID and dispatch it through to Redux
 *
 * @param profileId {string}
 */
export const fetchProfile = (profileId: string) => async (dispatch, getState) => {
  const prevState = getState();
  dispatch({ type: LOADINGOVERLAY, on: true }); // Turn on the loading overlay

  // Detect if we have the same profileID and return the previous state.
  // We do this here to stop another API call and you can easily get the prevState in the Action.
  if (prevState.viewItem.profile && profileId === prevState.viewItem.profile.profileId) {
    dispatch({ type: LOADINGOVERLAY, on: false }); // Turn off the loading overlay
    return prevState.viewItem;
  } else {

    try {
      const response = await API.get('tba21', 'profiles', {
        queryStringParameters: {
          id: profileId
        }
      });

      if (!!response.profile && response.profile.length && response.profile[0]) {
        const profile = response.profile[0];

        dispatch({
           type: FETCH_PROFILE,
           profile: profile
         });
      } else {
        dispatch({
           type: FETCH_PROFILE_ERROR_NO_SUCH_PROFILE,
           profile: {}
         });
      }
    } catch (e) {
      dispatch({
         type: FETCH_PROFILE_ERROR
       });
    } finally {
      dispatch({ type: LOADINGOVERLAY, on: false }); // Turn off the loading overlay
    }
  }
};

export const fetchProfileItems = (queries) => async (dispatch, getState) => {
  dispatch({type: FETCH_PROFILE_ITEMS_LOADING})
  queries = {
    ...queries,
    // uuid: '7e32b7c6-c6d3-4e70-a101-12af2df21a19'
    uuid: '468d8382-54c0-4107-a622-104d8a1134ae'
  }
  try {
    let res = await getItems(queries)
    let data = removeTopology(res, "item") as Item[]
    data = await addFilesToData(data)
    dispatch({
      type: FETCH_PROFILE_ITEMS_SUCCEED,
      data,
    })
    let ff = await getCollections(queries)
    ff = removeTopology(ff, "collection") as Collection[]
    ff = [...await getItemsAndCollectionsForCollection(ff)]
    // handle get the correct collection s3_key
    ff = ff.map(d => ({
      ...d,
      s3_key: d.items.length ? d.items[0].s3_key : null
    })) as HomepageData[]

    let collData = await addFilesToData(ff)
    dispatch({
      type: FETCH_PROFILE_COLLECTIONS_SUCCEED,
      data: collData,
    })
  } catch {
    dispatch({
      type: FETCH_PROFILE_ITEMS_ERROR,
    })
  }
}

export const fetchProfileCollection = queries => async (dispatch, getState) => {

}
