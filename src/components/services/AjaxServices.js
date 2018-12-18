/* eslint-disable */

import ApiReqService from "./ApiReqService";

export default class AjaxServices {

  static get endpoint() {
    return ApiReqService;
  }
  static getApiResponseValue( apiResponse ) {
    if ( apiResponse == null || apiResponse.responseJSON == null ) {
      return 'Internal Error';
    }

    return apiResponse.responseJSON.value.toString();
  }
}
