import axios from 'axios';
import { ListEnumSearch, ProfileCardEnum } from '../constants';
import { getCookie } from '../utils/cookie';

class AxiosService{
  axiosInstance  = axios;
  token = getCookie('JSESSIONID', document.cookie);

  async getLinkedinJson(url){
    const {data} = await this.axiosInstance.get(url,
      {headers:{
        accept: 'application/vnd.linkedin.normalized+json+2.1',
        'csrf-token': this.token,
        'x-li-lang': 'es_ES',
        // 'x-li-page-instance': 'urn:li:page:d_flagship3_profile_view_base;Wfk75tVOTUOxS0ZOuy6B/Q==',
        // 'x-li-deco-include-micro-schema': true,
        'x-restli-protocol-version': '2.0.0',
      // 'x-li-page-instance': 'urn:li:page:d_flagship3_profile_view_base;Wfk75t'
      }});
    
    console.log(data);
    return data;
  }

  async getPaginate10Results(keywords = 'fullstack', startPaginate = 0, list = ListEnumSearch.PEOPLE, includeFilter = false){
    const url  = `https://www.linkedin.com/voyager/api/search/dash/clusters?decorationId=com.linkedin.voyager.dash.deco.search.SearchClusterCollection-157&origin=SWITCH_SEARCH_VERTICAL&q=all&query=(keywords:${keywords},flagshipSearchIntent:SEARCH_SRP,queryParameters:(position:List(0),resultType:List(${list}),searchId:List(00af5496-3e03-4913-9849-c47708dff823)),includeFiltersInResponse:${includeFilter})&start=${startPaginate}`;
    return this.getLinkedinJson(url);
  }


  async getProfileInfo(profileUrn, card = ProfileCardEnum.second){
    const url = `https://www.linkedin.com/voyager/api/graphql?includeWebMetadata=true&variables=(profileUrn:${profileUrn},locale:(language:es,country:ES))&&queryId=voyagerIdentityDashProfileCards.${card}`;
    return this.getLinkedinJson(url);
  }

}

export default new AxiosService();