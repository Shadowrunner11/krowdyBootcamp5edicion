import { urls as configUrls } from '../config/scrapper.config';
import { $ } from '../utils/selectors';

$('#search-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const  { baseUrl } = configUrls;
  const keyword = $('#to-search', e.target).value;
  const url = baseUrl+'search/results/people/?keywords='+ keyword;

  // eslint-disable-next-line no-undef
  const { id } = await chrome.tabs.create({ url });

  const options = {
    target: { tabId: id },
    files : ['scripts/scrapCandidates.js']
  };

  // eslint-disable-next-line no-undef
  chrome.scripting.executeScript(options);
});