import axios from 'axios';
import { urls as configUrls } from '../config/scrapper.config';
import { ListEnumSearch, ProfileCardEnum } from '../constants';
import { getCookie } from '../utils/cookie';

const { baseUrl, api } = configUrls;
const baseUrlAxios = baseUrl + api;
class AxiosService {
  axiosInstance  = axios;
  token = getCookie('JSESSIONID', document.cookie);

  async getLinkedinJson(url) {
    try {
      const acceptTypeLinkedin = 'application/vnd.linkedin.normalized+json+2.1';
      const headers = {
        accept                     : acceptTypeLinkedin,
        'csrf-token'               : this.token,
        'x-li-lang'                : 'es_ES',
        // 'x-li-page-instance': ,
        // 'x-li-deco-include-micro-schema': true,
        'x-restli-protocol-version': '2.0.0',
        // 'x-li-page-instance': '
      };
      const { data } = await this.axiosInstance.get(url,
        { headers });

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('🚀 axiosService.js ~ getLinkedinJson ~ error', error);
      throw error;
    }
  }

  async getPaginate10Results(
    keywords = 'fullstack',
    startPaginate = 0,
    list = ListEnumSearch.PEOPLE,
    includeFilter = false,
    searchId = '00af5496-3e03-4913-9849-c47708dff823'
  ) {
    const url  = `${baseUrlAxios}search/dash/clusters?` +
      'decorationId=' +
      'com.linkedin.voyager.dash.deco.search.SearchClusterCollection-157'+
      '&origin=SWITCH_SEARCH_VERTICAL'+
      '&q=all&query=(' +
      `keywords:${keywords},` +
      'flagshipSearchIntent:SEARCH_SRP,'+
      'queryParameters:(position:List(0),'+
      `resultType:List(${list}),`+
      `searchId:List(${searchId})),`+
      `includeFiltersInResponse:${includeFilter})&start=${startPaginate}`;

    return this.getLinkedinJson(url);
  }


  async getProfileInfo(profileUrn, card = ProfileCardEnum.second) {
    const url = `${baseUrlAxios}graphql?` +
    'includeWebMetadata=true&' +
    'variables=('+
    `profileUrn:${profileUrn},`+
    'locale:(language:es,country:ES))&&'+
    `queryId=voyagerIdentityDashProfileCards.${card}`;

    return this.getLinkedinJson(url);
  }

}

export default new AxiosService();