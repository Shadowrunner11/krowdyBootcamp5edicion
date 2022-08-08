export const profileSelectors = {
  name               : 'h1',
  experiencesElements: '#experience ~ .pvs-list__outer-container > ul > li',
  contactInfo        : '#top-card-text-details-contact-info',
  educationElements  : '#education ~ .pvs-list__outer-container > ul > li',

};

export const searchSelectors = {
  paginateResultsContainer: '.reusable-search__entity-result-list > li'
};

export const urls = {
  baseUrl       : 'https://www.linkedin.com/',
  api           : 'voyager/api/',
  urlContactInfo: contactInfoName =>
    `identity/profiles${contactInfoName.slice(2,-2)}/profileContactInfo`
};