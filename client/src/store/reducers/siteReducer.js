import { GET_SITE_INFO, UPDATE_SITE_INFO } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_SITE_INFO:
      return {
        ...state,
        featured_products: action.payload.featured,
        siteInfo: action.payload.siteInfo,
      };
    case UPDATE_SITE_INFO:
      return { ...state, siteInfo: action.payload.siteInfo };
    default:
      return state;
  }
}
