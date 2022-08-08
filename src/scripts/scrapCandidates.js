import { searchSelectors } from '../config/scrapper.config';
import AxiosService from '../service/axiosService';
import { filterOutNill } from '../utils/keys';
import { $$, $ } from '../utils/selectors';
import { waitForScroll, waitForSelector } from '../utils/waitFor';

// eslint-disable-next-line no-unused-vars
async function init () {
  await waitForSelector(searchSelectors.paginateResultsContainer);

  await waitForScroll(100,100);

  const URLsCandidates = $$(searchSelectors.paginateResultsContainer)
    .map(element=>$('.app-aware-link', element).href);


  // eslint-disable-next-line no-undef
  const port = chrome.runtime.connect({ name: 'secureChannelScrap' });

  port.postMessage({ URLsCandidates });
}

// eslint-disable-next-line no-unused-vars
async function initV2(keywords = 'fullstack', startPaginate = 0) {
  let pagination = startPaginate;
  let urlsCandidates = [];

  do{
    const { included } = await AxiosService
      .getPaginate10Results(keywords, pagination);

    const nextCandidates = getNextCandidates(included);

    urlsCandidates = [...urlsCandidates, ...nextCandidates ];

    pagination+=10;

  // TO-DO: encontrar el total o el max de paginacion en la res de la query
  }while(pagination<50);

  // eslint-disable-next-line no-undef
  const port = chrome.runtime.connect({ name: 'secureChannelScrapV2' });
  port.postMessage({ urlsCandidates });

  return urlsCandidates;
}

function getNextCandidates(included) {
  filterOutNill(included, includedElement =>{
    if(includedElement?.trackingUrn) {
      const raw = includedElement?.navigationContext?.url;
      const [profileVar] = raw.match(/urn.+/) ?? [];
      return {
        raw,
        profileVar: profileVar
          .replace('miniP','p')
          .replace('Afs','Afsd')
      };
    }

    return null;
  });
}
// init();

initV2();