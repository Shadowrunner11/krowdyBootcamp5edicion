import { db } from './config/conexion.dexie';
import { 
  deleteAndCreateTab, 
  inyectScrapCandidates, 
  inyectScript 
} from './utils/chrome';


// eslint-disable-next-line no-undef
chrome.action.onClicked.addListener((tab)=>{
  console.log('click');  
  // inyectScrapCandidates(tab.id);
  inyectScript('scripts/scrapper.js', tab.id);
});


// eslint-disable-next-line no-undef
chrome.runtime.onConnect.addListener((port)=>{
  const secureChannels = ['secureChannelScrap', 'secureChannelScrapProfile'];
  if(!secureChannels.includes(port.name))
    throw new Error('Not secure Channel');

  port.onMessage.addListener(async (
    {URLsCandidates, profile},
    {sender:{tab: {id: tabId, url: tabUrl}}}
  ) => {
    switch (port.name){
    case secureChannels[0]:{
      const urlParams = new URLSearchParams(
        tabUrl.match(/\?.+/)[0].replace('?','')
      );

      const page = urlParams.has('page') ? Number(urlParams.get('page'))+1 : 2;
      urlParams.set('page', page);

      if(Number(urlParams.get('page')) <= 3){

        db.urlsCandidate.add({
          urls : URLsCandidates
        });
        
        const newTabId = await deleteAndCreateTab(
          tabId, 
          tabUrl.replace(/\?.+/,'?'+urlParams.toString())
        );

        inyectScrapCandidates(newTabId);
      }else{
        const newTabId = await deleteAndCreateTab(tabId, URLsCandidates[0]);
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
    default:
      break;
    }
  });    
});

/* chrome.webNavigation.onCompleted.addListener((a)=>{
  console.log(a.tabId)
}, {hostPrefix: 'https://www.linkedin.com/in/'}) */