/* eslint-disable */
import NavigationService from './NavigationService';

export default class ApiReqService {

    static baseUrl() {
        return `${NavigationService.baseUrl()}/api`;
    }

    static encodeQueryData(data) {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

}
