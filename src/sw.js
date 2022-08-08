import { db } from './config/conexion.dexie';
import FetchService from './service/fetchService';
import {
  deleteAndCreateTab,
  inyectScrapCandidates,
  inyectScript
} from './utils/chrome';


// eslint-disable-next-line no-undef
chrome.action.onClicked.addListener((tab)=> {
  inyectScrapCandidates(tab.id);
  // inyectScript('scripts/scrapper.js', tab.id);
});

function saveUrlsCandidates (urlsCandidates) {
  if(!urlsCandidates.length) throw new Error('Not enough data');
  // Si falla el servicio remoto, guardar localmente en indexDB
  FetchService.createUrlProfiles(urlsCandidates).catch(async err => {
    // eslint-disable-next-line no-console
    console.log(
      '🚀 ~ file: sw.js ~ line 26 ~ FetchService.createUrlProfiles ~ err', err
    );

    db.urlsCandidate.add({
      urls: urlsCandidates
    });
  });
}

// eslint-disable-next-line no-undef
chrome.runtime.onConnect.addListener((port)=> {
  const secureChannels = [
    'secureChannelScrap',
    'secureChannelScrapProfile',
    'secureChannelScrapV2'
  ];

  if(!secureChannels.includes(port.name))
    throw new Error('Not secure Channel');

  port.onMessage.addListener(async (
    { urlsCandidates, profile },
    { sender: { tab: { id: tabId, url: tabUrl } } }
  ) => {
    switch (port.name) {
    case secureChannels[0]:{
      const urlParams = new URLSearchParams(
        tabUrl.match(/\?.+/)[0].replace('?','')
      );

      const page = urlParams.has('page') ? Number(urlParams.get('page'))+1 : 2;
      urlParams.set('page', page);

      if(page <= 3) {

        saveUrlsCandidates(urlsCandidates);
        const newTabId = await deleteAndCreateTab(
          tabId,
          tabUrl.replace(/\?.+/,'?'+urlParams.toString())
        );

        inyectScrapCandidates(newTabId);
      } else {
        const newTabId = await deleteAndCreateTab(tabId, urlsCandidates[0]);
        inyectScript('scripts/scrapper.js', newTabId);
      }

      break;
    }
    case secureChannels[1]:{
      db.profiles.add(profile);
      const [urlsRaw] = await db.urlsCandidate.toArray();
      // eslint-disable-next-line no-undef
      const newTabId = await deleteAndCreateTab(tabId, urlsRaw.urls[2]);

      inyectScript('scripts/scrapper.js', newTabId);

      break;
    }
    case(secureChannels[2]):
      saveUrlsCandidates(urlsCandidates);
      break;
    default:
      break;
    }
  });
});

/* chrome.webNavigation.onCompleted.addListener((a)=>{
  console.log(a.tabId)
}, {hostPrefix: 'https://www.linkedin.com/in/'}) */