import { searchSelectors } from '../config/scrapperSelectors';
import AxiosService from '../service/axiosService';
import { $$, $ } from '../utils/selectors';
import { waitForScroll, waitForSelector } from '../utils/waitFor';

// eslint-disable-next-line no-unused-vars
async function init (){
  await waitForSelector(searchSelectors.paginateResultsContainer);

  await waitForScroll(100,100);

  const URLsCandidates = $$(searchSelectors.paginateResultsContainer)
    .map(element=>$('.app-aware-link', element).href);
  

  // eslint-disable-next-line no-undef
  const port = chrome.runtime.connect({name: 'secureChannelScrap'});

  port.postMessage({URLsCandidates});
}

// eslint-disable-next-line no-unused-vars
async function initV2(keywords = 'fullstack', startPaginate = 0){
  let pagination = startPaginate;
  const urlsCandidates = [];

  do{
    const { included } = await AxiosService.getPaginate10Results(keywords, pagination);
  
  
    urlsCandidates.concat(included?.filter(e=> e?.trackingUrn).map(e =>{
      const raw = e?.navigationContext?.url;
      const [profileVar] = raw.match(/urn.+/);
      return {
        raw,
        profileVar: profileVar.replace('miniP','p').replace('Afs','Afsd')
      }; 
    }));

    pagination+=10;

  // TO-DO: encontrar el total o el max de paginacion en la res de la query
  }while(pagination<50);


  // eslint-disable-next-line no-undef
  const port = chrome.runtime.connect({name: 'secureChannelScrap'});

  port.postMessage({urlsCandidates});
  return urlsCandidates;
}

// init();

initV2();