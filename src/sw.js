import { validate } from 'schm';
import { db } from './config/conexion.dexie';
import { SecureChannelsEnum as secureChannels } from './constants';
import FetchService from './service/fetchService';
import {
  deleteAndCreateTab,
  inyectScrapCandidates,
  inyectScript
} from './utils/chrome';
import { addUrlParams, getUrlParams } from './utils/urls';


// eslint-disable-next-line no-undef
chrome.action.onClicked.addListener((tab)=> {
  inyectScrapCandidates(tab.id);
  // inyectScript('scripts/scrapper.js', tab.id);
});

// eslint-disable-next-line no-undef
chrome.runtime.onConnect.addListener((port)=> {
  if(!Object.values(secureChannels).includes(port.name))
    throw new Error('Not secure Channel');

  port.onMessage.addListener(_portOnmessageHandler);
});

/* chrome.webNavigation.onCompleted.addListener((a)=>{
  console.log(a.tabId)
}, {hostPrefix: 'https://www.linkedin.com/in/'}) */

async function saveUrlsCandidates (urlsCandidates) {
  if(!urlsCandidates.length) throw new Error('Not enough data');

  const urlsCandidatesFiltered = await Promise.all(urlsCandidates
    .filter(async (urlsCandidate) => {
      try {
        await validate(urlsCandidate);
        return true;
      } catch (error) {
        return false;
      }
    })
  );
  // Si falla el servicio remoto, guardar localmente en indexDB
  FetchService.createUrlProfiles(urlsCandidatesFiltered).catch(async err => {
    // eslint-disable-next-line no-console
    console.log(
      '🚀 ~ file: sw.js ~ line 26 ~ FetchService.createUrlProfiles ~ err', err
    );

    db.urlsCandidate.add({
      urls: urlsCandidates
    });
  });
}

function setNextPageParam(tabUrl) {
  const urlParams = getUrlParams(tabUrl);

  const actualPage = Number(urlParams.get('page') ?? 1);
  const nextPage = actualPage + 1;

  urlParams.set('page', nextPage);

  return [nextPage, addUrlParams(tabUrl,urlParams)];
}

async function scrapProfiles(tabUrl, tabId, urlsCandidates) {
  const [nextPage, nextUrl] = setNextPageParam(tabUrl);

  if(nextPage <= 3) {
    saveUrlsCandidates(urlsCandidates);
    const newTabId = await deleteAndCreateTab(tabId,nextUrl);
    inyectScrapCandidates(newTabId);
  } else {
    const newTabId = await deleteAndCreateTab(tabId, urlsCandidates[0]);
    inyectScript('scripts/scrapper.js', newTabId);
  }
}

const _portOnmessageHandler = async (msg, port) => {
  const { urlsCandidates, profile } = msg;

  const {
    name,
    sender: {
      tab: {
        id: tabId,
        url: tabUrl
      }
    }
  } = port;

  switch (name) {
  case secureChannels.scrapProfiles:
    scrapProfiles(tabUrl, tabId, urlsCandidates);
    break;
  case secureChannels.scrapv1:{
    db.profiles.add(profile);
    const [urlsRaw] = await db.urlsCandidate.toArray();
    const newTabId = await deleteAndCreateTab(tabId, urlsRaw.urls[2]);

    inyectScript('scripts/scrapper.js', newTabId);

    break;
  }
  case secureChannels.scrapProfilesV2:
    saveUrlsCandidates(urlsCandidates);
    break;
  default:
    break;
  }
};